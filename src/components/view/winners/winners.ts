export class Winners {
    public createWinners(): void {
        const main = document.querySelector('main > .container');
        const winnersWrapper = document.createElement('div');
        winnersWrapper.className = 'winners_wrapper inactive';

        const title = document.createElement('h2');
        title.className = 'winners_title';
        title.innerHTML = 'Winners (0)';

        const page = document.createElement('h4');
        page.className = 'winners_page';
        page.innerHTML = 'Page #1';

        winnersWrapper.append(title, page, this.createTable());
        main?.append(winnersWrapper);
    }

    private createTable(): HTMLDivElement {
        const tableWrapper = this.createElement('table');
        const tableHead = this.createTableHead();

        tableWrapper.append(tableHead);
        return tableWrapper;
    }

    private createTableHead(): HTMLDivElement {
        const tableHead = this.createElement('table__head');
        const tableHeadNumber = this.createElement('table_head_number', '#');
        const tableHeadCar = this.createElement('table__head_car', 'Car');
        const tableHeadModel = this.createElement('table__head_model', 'Model');
        const tableHeadWins = this.createElement('table__head_wins', 'Wins');
        const tableHeadTime = this.createElement('table__head_time', 'Time');

        tableHead.append(tableHeadNumber, tableHeadCar, tableHeadModel, tableHeadWins, tableHeadTime);
        return tableHead;
    }

    private createElement(className: string, inner = ''): HTMLDivElement {
        const el = document.createElement('div');
        el.className = className;
        el.innerText = inner;

        return el;
    }
}
