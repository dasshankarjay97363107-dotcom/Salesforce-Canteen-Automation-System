import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {
    fields = [FIRST_NAME, LAST_NAME, EMAIL];

    handleSuccess(event) {
        const contactId = event.detail.id;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Contact Created',
                message: 'Contact ID: ' + contactId,
                variant: 'success'
            })
        );
    }
}