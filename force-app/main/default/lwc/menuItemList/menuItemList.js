import { LightningElement, wire } from 'lwc';
import getMenuItems from '@salesforce/apex/MenuItemController.getMenuItems';

export default class MenuItemList extends LightningElement {

    menuItems;

    @wire(getMenuItems)
    wiredMenuItems({ data, error }) {
        if (data) {
            this.menuItems = data;
        } else if (error) {
            console.error('Error loading menu items:', error);
        }
    }

    handleAddToCart(event) {
        const itemId = event.currentTarget.dataset.id;

        const selectedItem = this.menuItems.find(
            item => item.Id === itemId
        );

        const cartEvent = new CustomEvent('addtocart', {
            detail: {
                id: selectedItem.Id,
                name: selectedItem.Name,
                price: selectedItem.Price__c,
                quantity: 1
            }
        });

        this.dispatchEvent(cartEvent);
    }
}