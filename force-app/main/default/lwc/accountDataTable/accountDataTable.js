import { LightningElement, wire } from 'lwc';

import getAccounts
    from '@salesforce/apex/AccountDataTableController.getAccounts';

import { deleteRecord } from 'lightning/uiRecordApi';

import { refreshApex } from '@salesforce/apex';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const COLUMNS = [

    {
        label: 'Account Name',
        fieldName: 'Name'
    },

    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    },

    {
        label: 'Industry',
        fieldName: 'Industry'
    },

    {
        type: 'button',
        typeAttributes: {
            label: 'Delete',
            name: 'delete',
            variant: 'destructive'
        }
    }

];


export default class AccountDataTable extends LightningElement {

    columns = COLUMNS;

    accounts = [];

    wiredAccountsResult;

    error;


    @wire(getAccounts)
    wiredAccounts(result) {

        this.wiredAccountsResult = result;

        const { data, error } = result;

        if (data) {

            this.accounts = data;

            this.error = undefined;

        } else if (error) {

            this.error = error;

            this.accounts = [];

        }
    }


    async handleRowAction(event) {

        const actionName = event.detail.action.name;

        const row = event.detail.row;


        if (actionName === 'delete') {

            try {

                await deleteRecord(row.Id);


                this.showToast(
                    'Success',
                    'Account deleted successfully.',
                    'success'
                );


                await refreshApex(this.wiredAccountsResult);


            } catch (error) {

                console.error(error);

                this.showToast(
                    'Error',
                    'Unable to delete Account.',
                    'error'
                );
            }
        }
    }


    showToast(title, message, variant) {

        const event = new ShowToastEvent({

            title: title,

            message: message,

            variant: variant

        });

        this.dispatchEvent(event);
    }
}