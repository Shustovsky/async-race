import { Api } from '../../api';
import { Car, CarResponse } from '../../interfaces';
import { store } from '../../store';
import { carBrand, carModal } from '../../brandsAndModals';

export class Garage {
    api: Api;

    constructor() {
        this.api = new Api();
    }

    public createGarage(): void {
        const header = document.querySelector('header');
        const main = this.createMainElement();
        header?.after(main);
    }

    private createMainElement(): HTMLElement {
        const main = document.createElement('main');
        const container = this.createContainerElement();
        main.append(container);
        return main;
    }

    private createContainerElement(): HTMLDivElement {
        const container = document.createElement('div');
        container.className = 'container';
        const garageWrapper = this.createGarageWrapper();
        container.append(garageWrapper);
        return container;
    }

    private createGarageWrapper(): HTMLDivElement {
        const garageWrapper = document.createElement('div');
        garageWrapper.className = 'garage_wrapper';
        const garageFormsWrapper = this.createGarageFormsWrapper();
        const garageControlWrapper = this.createGarageControl();
        garageWrapper.append(garageFormsWrapper, garageControlWrapper);
        return garageWrapper;
    }

    private createGarageFormsWrapper(): HTMLDivElement {
        const garageForms = document.createElement('div');
        garageForms.className = 'garage__forms';
        const createForm = this.createGarageForm('create', this.api.createCar);
        const editForm = this.createGarageForm('update', (car: Car) => this.updateCar(car));
        garageForms.prepend(createForm);
        garageForms.append(editForm);
        return garageForms;
    }

    private createGarageForm(name: string, callback: (obj: Car) => Promise<Car>): HTMLFormElement {
        const form = document.createElement('form');
        form.className = `garage_form_${name}`;
        const inputName = document.createElement('input');
        inputName.id = `input-name_${name}`;
        inputName.className = 'input-name';
        inputName.type = 'text';
        const inputColor = document.createElement('input');
        inputColor.id = `input-color_${name}`;
        inputColor.className = 'input-color';
        inputColor.type = 'color';
        const btn = document.createElement('button');
        btn.id = `btn-${name}`;
        btn.textContent = name;
        btn.addEventListener('click', async () => {
            await callback({ name: inputName.value, color: inputColor.value });
            await this.api.getCars(store.page);
        });

        form.prepend(inputName);
        form.append(inputColor);
        form.append(btn);

        return form;
    }

    private async updateCar(car: Car): Promise<Car> {
        const updtBtn = document.getElementById('btn-update');
        const id = Number(updtBtn?.getAttribute('item-update-id'));
        console.log(id);
        console.log(car);
        const data = await this.api.updateCar(id, car);
        return data;
    }

    private createGarageControl(): HTMLDivElement {
        const garageControl = document.createElement('div');
        garageControl.className = 'garage__control';
        const raceBtn = this.createRaceBtn();
        const removeBtn = this.createResetBtn();
        const generateBtn = this.createGenerateBtn();

        garageControl.append(raceBtn, removeBtn, generateBtn);
        this.renderCars();

        return garageControl;
    }

    private createRaceBtn(): HTMLButtonElement {
        const btn = this.createBtn('race');
        btn.addEventListener('click', (e) => {
            store.winner = [];
            (<HTMLButtonElement>e.target).disabled = true;
            (<HTMLButtonElement>document.getElementById('reset')).disabled = false;
            //TODO start
        });
        return btn;
    }

    private createResetBtn(): HTMLButtonElement {
        const btn = this.createBtn('reset');
        btn.disabled = true;
        btn.addEventListener('click', (e) => {
            (<HTMLButtonElement>e.target).disabled = true;
            (<HTMLButtonElement>document.getElementById('race')).disabled = false;
            //TODO stop
        });
        return btn;
    }

    private createGenerateBtn(): HTMLButtonElement {
        const btn = this.createBtn('generate');
        btn.addEventListener('click', async () => {
            const cars = this.generateCars();
            cars.forEach(async (car) => {
                await this.api.createCar(car);
            });
            await this.api.getCars(store.page);
            return this.renderCars();
        });

        return btn;
    }

    private generateCars(numb = 100): Car[] {
        const cars = new Array(numb).fill(undefined);
        cars.forEach((item, index) => {
            cars[index] = { name: this.generateName(), color: this.generateColor() };
        });
        return cars;
    }

    private generateName(): string {
        const brand = carBrand[Math.floor(Math.random() * carBrand.length)];
        const model = carModal[Math.floor(Math.random() * carModal.length)];
        return `${brand} ${model}`;
    }

    private generateColor(): string {
        return '#' + Math.random().toString(16).substr(-6);
    }

    private createBtn(name: string): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.className = 'garage__control_btn';
        btn.id = name;
        btn.textContent = name;
        return btn;
    }

    private async renderCars(): Promise<void> {
        const cars = await this.api.getCars(store.page, 7);
        const garageWrapper = document.querySelector('.garage_wrapper');
        const garageMainOld = document.querySelector('.garage__main');
        if (garageMainOld) garageMainOld.remove();
        const garageMain = this.createGarageMain();
        garageMain.append(this.createTitle(cars));
        garageMain.append(this.createPageNumb());
        garageWrapper?.append(garageMain);
        this.addCars(cars);
        garageMain.append(this.createPagination());
    }

    private createGarageMain(): HTMLDivElement {
        const garageMain = document.createElement('div');
        garageMain.className = 'garage__main';
        garageMain.innerHTML = '';
        return garageMain;
    }

    private createTitle(cars: CarResponse): HTMLDivElement {
        const title = document.createElement('h1');
        title.textContent = `Garage (${cars.count})`;
        return title;
    }

    private createPageNumb(): HTMLDivElement {
        const title = document.createElement('h2');
        title.textContent = `Page #${store.page}`;
        return title;
    }

    private addCars(cars: CarResponse) {
        const garageMain = <HTMLDivElement>document.querySelector('.garage__main');

        cars.items.forEach((item) => {
            const car = this.createCar(item);
            garageMain.append(car);
        });
    }

    private createCar(car: Car): HTMLDivElement {
        const item = document.createElement('div');
        item.className = 'item';
        item.setAttribute('item-id', `${car.id}`);
        item.append(this.createControlBtnWrapper(car));
        item.append(this.createRoadWrapper(car));
        item.append(this.createCarTrack(car));
        return item;
    }

    private createControlBtnWrapper(car: Car): HTMLDivElement {
        const controlWrapper = document.createElement('div');
        controlWrapper.className = 'item__control';
        controlWrapper.append(this.createControlSelectBtn(car), this.createControlRemoveBtn(car), this.createName(car));

        return controlWrapper;
    }

    private createControlSelectBtn(car: Car): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.className = 'btn select-btn';
        btn.innerHTML = 'Select';
        btn.addEventListener('click', () => {
            const updateBtn = document.getElementById('btn-update');
            updateBtn?.setAttribute('item-update-id', `${car.id}`);

            const color = <HTMLInputElement>document.getElementById('input-color_update');
            const name = <HTMLInputElement>document.getElementById('input-name_update');
            color.value = car.color;
            name.value = car.name;
        });
        return btn;
    }

    private createControlRemoveBtn(car: Car): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.className = 'btn remove-btn';
        btn.innerHTML = 'Remove';
        btn.addEventListener('click', async () => {
            await this.api.deleteCar(car.id || 0);
            this.renderCars();
        });
        return btn;
    }

    private createName(car: Car): HTMLHeadElement {
        const header = document.createElement('span');
        header.textContent = car.name;

        return header;
    }

    private createRoadWrapper(car: Car): HTMLDivElement {
        const controlEngineWrapper = this.createControlEngineWrapper();
        controlEngineWrapper.append(this.createStartButton(car));
        controlEngineWrapper.append(this.createStopButton(car));
        return controlEngineWrapper;
    }

    private createControlEngineWrapper(): HTMLDivElement {
        const controlEngineWrapper = document.createElement('div');
        controlEngineWrapper.className = 'item__control-engine';
        return controlEngineWrapper;
    }

    private createStartButton(car: Car): HTMLButtonElement {
        const startBtn = document.createElement('button');
        startBtn.className = 'item__control-engine_start';
        startBtn.id = `start-car-${car.id}`;
        startBtn.innerHTML = 'A';
        startBtn.addEventListener('click', () => {
            const stopBtn = <HTMLButtonElement>document.getElementById(`stop-car-${car.id}`);
            startBtn.disabled = true;
            stopBtn.disabled = false;
            this.startController(car.id || 0);
        });
        return startBtn;
    }

    private startController(id: number) {
        //TODO
    }

    private createStopButton(car: Car): HTMLButtonElement {
        const stopBtn = document.createElement('button');
        stopBtn.className = 'item__control-engine_start';
        stopBtn.id = `stop-car-${car.id}`;
        stopBtn.innerHTML = 'B';
        stopBtn.addEventListener('click', () => {
            const startBtn = <HTMLButtonElement>document.getElementById(`start-car-${car.id}`);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            this.stopController(car.id || 0);
        });
        return stopBtn;
    }

    private stopController(id: number) {
        //TODO
    }

    private createCarTrack(car: Car) {
        const track = document.createElement('div');
        track.className = 'car-track';
        track.append(this.createCarBody(car));
        track.append(this.createFlag());

        return track;
    }

    private createCarBody(car: Car): HTMLDivElement {
        const carBody = document.createElement('div');
        carBody.classList.add('car-body');
        carBody.setAttribute('data-car-id', `${car.id}`);
        const carImage = this.renderCarImage(car.color);
        carBody.innerHTML = carImage;
        carBody.addEventListener('transitionend', async () => {
            //TODO await handleWinners(carBody, car.id);
        });
        return carBody;
    }

    private renderCarImage(color: string): string {
        return `
       <?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="1280.000000pt" height="667.000000pt" viewBox="0 0 1280.000000 667.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,667.000000) scale(0.100000,-0.100000)"
fill="${color}" stroke="none">
<path d="M5385 5078 c-88 -4 -209 -12 -270 -18 -60 -5 -200 -17 -310 -25 -110
-9 -218 -20 -240 -25 -39 -8 -260 -43 -380 -60 -146 -21 -343 -71 -403 -104
-72 -40 -198 -88 -302 -116 -63 -17 -149 -41 -190 -55 -41 -13 -133 -40 -205
-60 -128 -36 -492 -152 -570 -182 -22 -9 -80 -26 -130 -39 -49 -12 -117 -32
-149 -43 -33 -12 -80 -21 -106 -21 -55 0 -161 -18 -175 -30 -6 -5 -17 -5 -25
0 -8 6 -40 10 -71 10 -62 0 -74 8 -78 56 -2 29 32 118 49 129 5 3 79 1 166 -4
155 -10 159 -9 181 11 33 31 28 64 -17 125 -53 70 -69 79 -174 98 -49 9 -101
21 -115 27 -14 5 -73 16 -131 24 -58 8 -123 16 -145 19 -59 9 -105 -22 -105
-70 0 -19 -1 -35 -2 -35 -2 -1 -39 -8 -83 -16 -44 -9 -107 -19 -140 -23 -33
-4 -69 -12 -80 -18 -16 -9 -26 -8 -50 7 -67 41 -238 81 -449 104 -106 11 -109
11 -139 -11 -17 -13 -34 -28 -38 -35 -13 -20 29 -66 132 -145 55 -42 99 -83
99 -92 0 -9 -5 -45 -10 -81 -26 -168 -31 -221 -31 -304 0 -95 6 -110 82 -211
16 -22 32 -56 35 -75 4 -31 -2 -44 -48 -104 -29 -37 -64 -83 -78 -102 -14 -18
-52 -66 -86 -106 -142 -170 -153 -203 -134 -376 6 -56 9 -106 7 -110 -2 -4 2
-45 9 -92 16 -102 18 -244 4 -270 -11 -20 26 -148 58 -202 28 -48 122 -80 342
-117 30 -5 87 -18 125 -29 39 -11 88 -23 110 -26 37 -6 84 -14 210 -37 76 -14
249 -38 358 -50 113 -13 122 -9 122 49 l0 37 45 0 c42 0 46 -2 66 -41 51 -96
144 -209 236 -284 136 -112 206 -148 361 -187 92 -23 113 -25 221 -19 66 4
138 11 160 15 23 5 68 15 101 21 165 32 268 84 388 199 l48 46 162 0 c89 0
207 6 262 13 76 10 248 12 710 9 563 -3 851 -10 1645 -37 162 -6 593 -15 958
-21 630 -10 664 -10 690 7 20 13 54 19 134 22 59 3 119 1 134 -2 17 -5 66 -46
119 -99 140 -143 203 -179 413 -233 141 -37 278 -41 432 -15 69 11 147 28 174
36 84 26 178 85 262 167 l80 78 89 -4 c77 -3 90 -7 96 -23 5 -15 20 -22 61
-26 29 -4 326 -7 660 -7 482 0 639 3 760 16 207 21 368 49 422 72 46 21 86 54
86 73 0 6 -25 34 -56 63 -52 48 -55 53 -45 79 10 25 8 31 -11 48 -13 10 -28
18 -34 19 -6 0 -18 8 -28 18 -14 16 -15 32 -10 106 7 82 9 88 33 97 14 6 44
26 67 45 23 19 46 34 51 34 12 0 4 291 -10 318 -8 17 -18 22 -34 19 -16 -3
-24 2 -29 15 -3 10 -36 51 -72 91 -37 41 -74 87 -83 104 -13 24 -25 31 -58 36
-23 3 -61 19 -88 39 -52 36 -106 63 -258 128 -55 24 -136 60 -180 81 -44 20
-107 47 -140 60 -33 12 -69 28 -80 35 -11 8 -29 14 -40 14 -11 0 -33 7 -50 16
-42 22 -246 89 -378 124 -62 16 -170 45 -242 65 -71 19 -141 35 -155 35 -14 0
-54 9 -90 21 -77 24 -373 89 -410 90 -8 0 -35 7 -60 15 -94 29 -320 84 -470
114 -58 11 -136 28 -175 38 -45 10 -119 17 -209 18 l-139 1 -34 37 c-43 47
-81 49 -105 6 -29 -50 -51 -41 -303 130 -55 37 -120 77 -144 89 -24 13 -65 38
-91 56 -26 18 -69 45 -96 60 -27 14 -71 40 -99 57 -27 17 -72 43 -100 58 -65
36 -192 110 -280 164 -38 23 -90 54 -115 68 -49 27 -132 77 -192 115 -21 13
-41 23 -44 23 -4 0 -28 13 -54 29 -81 50 -251 102 -410 125 -308 46 -569 59
-855 44z m-3691 -530 c46 -24 48 -26 28 -37 -38 -20 -131 -5 -207 33 l-70 36
100 -3 c84 -3 108 -8 149 -29z m-334 9 c0 -7 -6 -36 -14 -63 -8 -27 -17 -80
-20 -119 -12 -125 -15 -134 -53 -150 -20 -8 -41 -15 -47 -15 -7 0 -23 37 -37
83 -20 67 -30 84 -52 95 -40 19 -33 32 18 32 35 0 49 5 70 28 15 15 24 35 21
45 -3 12 3 21 17 27 12 5 33 18 47 29 29 24 50 27 50 8z m134 -160 c36 -49 64
-93 60 -98 -3 -5 -17 -9 -32 -9 -15 0 -52 -7 -82 -15 -30 -8 -56 -15 -57 -15
-2 0 0 46 3 103 6 95 16 132 35 125 4 -2 37 -43 73 -91z m-652 25 c12 -16 34
-48 48 -71 14 -23 42 -67 62 -99 21 -31 38 -60 38 -63 0 -3 -34 -9 -77 -13
-42 -4 -90 -10 -106 -13 l-30 -6 6 109 c8 126 16 184 27 184 5 0 19 -13 32
-28z m836 -28 c28 -18 49 -61 36 -73 -5 -5 -28 -11 -51 -14 -39 -5 -43 -3 -66
32 -13 20 -30 47 -37 60 l-12 24 53 -7 c30 -4 64 -14 77 -22z m-660 -20 c69
-30 95 -70 91 -142 -5 -72 -15 -68 -101 39 -107 134 -105 153 10 103z"/>
</g>
</svg>

        `;
    }

    private createFlag(): HTMLDivElement {
        const flag = document.createElement('div');
        flag.className = 'flag';
        flag.innerHTML = '🏴';
        return flag;
    }

    private createPagination() {
        const paginationWrapper = document.createElement('div');
        paginationWrapper.className = 'garage__pagination';
        const btnPrev = document.createElement('button');
        btnPrev.id = 'pag-prev';
        btnPrev.textContent = 'Prev';
        const btnNext = document.createElement('button');
        btnNext.id = 'pag-next';
        btnNext.textContent = 'Next';

        btnPrev.addEventListener('click', async () => {
            if (store.page > 1) {
                store.page -= 1;
            }
            await this.api.getCars(store.page);
            this.renderCars();
        });

        btnNext.addEventListener('click', async () => {
            store.page += 1;
            await this.api.getCars(store.page);
            this.renderCars();
        });

        paginationWrapper.append(btnPrev, btnNext);
        return paginationWrapper;
    }
}
