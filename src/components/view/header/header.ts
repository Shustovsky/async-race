export class Header {
    public createHeader(): void {
        const header = this.createHeaderElement();
        const container = this.createContainerElement();
        const nav = this.createNavElement();
        const btnGarage = this.createButtonElement('To garage', 'btn-garage');
        const btnWinners = this.createButtonElement('To winners', 'btn-winners');

        nav.prepend(btnGarage);
        nav.append(btnWinners);
        container.prepend(nav);
        header.prepend(container);
        document.body.prepend(header);

        this.attachButtonListeners(btnGarage, btnWinners);
        this.attachButtonListeners(btnWinners, btnGarage);
    }

    private createHeaderElement(): HTMLElement {
        return document.createElement('header');
    }

    private createContainerElement(): HTMLDivElement {
        const container = document.createElement('div');
        container.className = 'container';
        return container;
    }

    private createNavElement(): HTMLElement {
        const nav = document.createElement('nav');
        nav.className = 'nav';
        return nav;
    }

    private createButtonElement(text: string, className: string): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = className;
        button.innerText = text;
        return button;
    }

    private attachButtonListeners(btn1: HTMLButtonElement, btn2: HTMLButtonElement) {
        btn1.addEventListener('click', () => {
            this.toggleElement('.garage_wrapper');
            this.toggleElement('.winners_wrapper');
            btn1.disabled = true;
            btn2.disabled = false;
        });
    }

    private toggleElement(el: string) {
        const element = document.querySelector(el);
        element?.classList.toggle('inactive');
    }
}
