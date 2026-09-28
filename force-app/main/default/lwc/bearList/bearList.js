import { LightningElement, wire } from 'lwc';
import getAllBears from '@salesforce/apex/BearController.getAllBears';

export default class BearList extends LightningElement {
    bears;

    @wire(getAllBears)
    wiredBears({ data, error }) {
        if (data) {
            this.bears = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleBearView(event) {
        console.log('Bear Id:', event.detail);
    }
}