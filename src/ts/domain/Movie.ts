import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly year: number,
        readonly country: string,
        readonly slogan: string,
        readonly genre: string[],
        private _time: number,
    ) {}

    get time(): string {
        const hours = Math.floor(this._time / 60);
        const minutes = (this._time % 60).toString().padStart(2, '0');

        return `${this._time} мин. / ${hours}:${minutes}`;
    }
    set time(value: number) {
        this._time = value;
    }
}