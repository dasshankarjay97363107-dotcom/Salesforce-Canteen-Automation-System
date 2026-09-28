import { LightningElement, api } from 'lwc';

export default class RestaurantCart extends LightningElement {

    @api cartItems = [];

    get totalAmount() {
        return this.cartItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
    }

    increaseQuantity(event) {
        const itemId = event.currentTarget.dataset.id;

        this.cartItems = this.cartItems.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
    }

    decreaseQuantity(event) {
        const itemId = event.currentTarget.dataset.id;

        this.cartItems = this.cartItems.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
    }

    placeOrder() {
        alert('Order placed successfully!');
    }
}