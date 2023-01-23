import { Car, CarResponse } from './interfaces';

const baseUrl = 'http://localhost:3000';
const garage = baseUrl + '/garage';
const engine = baseUrl + '/engine';

export class Api {
    public async getCars(page: number, limit = 7): Promise<CarResponse> {
        const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
        return {
            items: await response.json(),
            count: response.headers.get('X-Total-Count'),
        };
    }

    public async getCar(id: number): Promise<Car> {
        return (await fetch(`${garage}/${id}`)).json();
    }

    public async deleteCar(id: number): Promise<Car> {
        return (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
    }

    public async createCar(body: object): Promise<Car> {
        return (
            await fetch(garage, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }

    public async updateCar(id: number, body: object): Promise<Car> {
        return (
            await fetch(`${garage}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }

    public async startEngine(id: number): Promise<Car> {
        return (await fetch(`${engine}?id=${id}&status=started`)).json();
    }

    public async stopEngine(id: number): Promise<Car> {
        return (await fetch(`${engine}?id=${id}&status=started`)).json();
    }

    public async drive(id: number) {
        const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
        return res.status !== 200 ? { success: false } : { ...(await res.json) };
    }
}
