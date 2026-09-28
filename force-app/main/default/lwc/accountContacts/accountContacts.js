import { LightningElement, api } from 'lwc';

import getContacts
    from '@salesforce/apex/AccountContactsController.getContacts';

const COLUMNS = [
    {
        label: 'Contact Name',
        fieldName: 'Name'
    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email'
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    }
];

export default class AccountContacts extends LightningElement {

    @api recordId;

    contacts = [];
    columns = COLUMNS;

    error;
    isLoading = false;
    showContacts = false;

    handleGetContacts() {

        this.isLoading = true;
        this.error = undefined;

        getContacts({
            accountId: this.recordId
        })
            .then(result => {

                this.contacts = result;
                this.showContacts = true;

            })
            .catch(error => {

                this.error = error;
                this.contacts = [];
                this.showContacts = false;

                console.error(error);

            })
            .finally(() => {

                this.isLoading = false;

            });
    }
}