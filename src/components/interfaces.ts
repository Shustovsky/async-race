export interface Car {
    id?: number;
    name: string;
    color: string;
    isEngineStarted?: boolean;
}

export interface CarResponse {
    items: Car[];
    count: string | null;
}

export interface WinnerCar {
    id?: number;
    wins: number;
    time: number;
}
