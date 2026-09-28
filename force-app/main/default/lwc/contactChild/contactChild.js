import { LightningElement } from 'lwc';

export default class ContactChild extends LightningElement {

    contactName = 'Rahul Kumar';

    handleSelectContact() {

        const contactEvent = new CustomEvent('contactselect', {
            detail: this.contactName
        });

        this.dispatchEvent(contactEvent);
    }
}