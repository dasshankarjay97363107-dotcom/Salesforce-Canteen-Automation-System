import { LightningElement, wire } from 'lwc';

import getAccounts
    from '@salesforce/apex/AccountSelectorController.getAccounts';

import {
    publish,
    MessageContext
} from 'lightning/messageService';

import ACCOUNT_SELECTION_CHANNEL
    from '@salesforce/messageChannel/AccountSelection__c';


export default class AccountSelector extends LightningElement {

    accounts = [];

    selectedAccountId;

    error;


    @wire(MessageContext)
    messageContext;


    @wire(getAccounts)
    wiredAccounts({ data, error }) {

        if (data) {

            this.accounts = data;

            this.error = undefined;

        } else if (error) {

            this.error = error;

            this.accounts = [];
        }
    }


    get accountOptions() {

        return this.accounts.map(account => {

            return {
                label: account.Name,
                value: account.Id
            };

        });
    }


    handleAccountChange(event) {

        this.selectedAccountId = event.detail.value;


        const message = {

            accountId: this.selectedAccountId

        };


        publish(
            this.messageContext,
            ACCOUNT_SELECTION_CHANNEL,
            message
        );
    }
}