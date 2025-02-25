import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    getSumFull(): number {
        let sum: number = 0;
        this.items.forEach(item => sum += item.price);
        return sum;
    }

    getSumDiscount(discountValue: number): number {
        const sum: number = this.getSumFull();
        return sum - (sum * discountValue / 100);
    }

    deleteItem(id: number): void {
        this.items.forEach((item) => {
            if (item.id === id) {
                const index = this.items.indexOf(item);
                this.items.splice(index, 1);
            }
        });
    }
}