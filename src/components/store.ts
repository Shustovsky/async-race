import { Car, WinnerCar } from './interfaces';

type storeType = {
    cars: Car[];
    carsCount: number;
    carsOnPage: Car[];
    page: number;
    sortBy: 'win' | 'time';
    sorDirection: 'az' | 'za';
    winner: WinnerCar[];
    winnersCount: number;
    winnersPage: number;
};

export const store: storeType = {
    cars: [],
    carsCount: 0,
    carsOnPage: [],
    page: 1,
    sortBy: 'time',
    sorDirection: 'az',
    winner: [],
    winnersCount: 0,
    winnersPage: 1,
};
