import { LightningElement } from 'lwc';

export default class RestaurantMenu extends LightningElement {

    cartItems = [];

    handleAddToCart(event) {

        const newItem = event.detail;

        const existingItem = this.cartItems.find(
            item => item.id === newItem.id
        );

        if (existingItem) {

            this.cartItems = this.cartItems.map(item => {

                if (item.id === newItem.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }

                return item;

            });

        } else {

            this.cartItems = [
                ...this.cartItems,
                newItem
            ];

        }
    }
}