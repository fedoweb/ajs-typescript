import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        const addItem = this._items.find(i => i.id === item.id);

        if (addItem && 'quantity' in addItem) {
            addItem.quantity += 1;
        } else if (!addItem) {
            this._items.push(item);
        }
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    getSumFull(): number {
        let sum: number = 0;

        this._items.forEach(item => {
            if ('quantity' in item) {
                sum += (item.price * item.quantity);
            } else {
                sum += item.price;
            }
            
        });
        return sum;
    }

    getSumDiscount(discountValue: number): number {
        const sum: number = this.getSumFull();
        return sum - (sum * discountValue / 100);
    }

    deleteItem(id: number): void {
        this._items = this._items.filter(item => item.id !== id);
    }


    reduceQuantity(id: number): void {
        const reduceItem = this._items.find(item => item.id === id);

        if (reduceItem && 'quantity' in reduceItem) {
            reduceItem.quantity > 1 ? reduceItem.quantity -= 1 : this.deleteItem(id);
        }        
    }

    clear(): void {
        this._items.forEach(item => {
            if ('quantity' in item) {
                item.quantity = 1;
            }
        this._items = [];
        });
    }
}