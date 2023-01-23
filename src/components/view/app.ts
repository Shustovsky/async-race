import { Header } from './header/header';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class App {
    header: Header;
    garage: Garage;
    winners: Winners;

    constructor() {
        this.header = new Header();
        this.garage = new Garage();
        this.winners = new Winners();
    }

    public start(): void {
        this.header.createHeader();
        this.garage.createGarage();
        this.winners.createWinners();
    }
}
