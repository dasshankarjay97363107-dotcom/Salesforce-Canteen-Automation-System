import { LightningElement, wire } from 'lwc';

import getContacts
    from '@salesforce/apex/ContactListController.getContacts';

import {
    subscribe,
    unsubscribe,
    MessageContext
} from 'lightning/messageService';

import ACCOUNT_SELECTION_CHANNEL
    from '@salesforce/messageChannel/AccountSelection__c';


export default class ContactList extends LightningElement {

    subscription = null;

    selectedAccountId;

    contacts = [];

    error;


    @wire(MessageContext)
    messageContext;


    connectedCallback() {

        this.subscribeToMessageChannel();

    }


    subscribeToMessageChannel() {

        if (this.subscription) {
            return;
        }


        this.subscription = subscribe(

            this.messageContext,

            ACCOUNT_SELECTION_CHANNEL,

            (message) => this.handleMessage(message)

        );
    }


    handleMessage(message) {

        this.selectedAccountId = message.accountId;

        this.loadContacts();

    }


    loadContacts() {

        if (!this.selectedAccountId) {
            return;
        }


        getContacts({

            accountId: this.selectedAccountId

        })
            .then(result => {

                this.contacts = result;

                this.error = undefined;

            })
            .catch(error => {

                this.error = error;

                this.contacts = [];

            });
    }


    disconnectedCallback() {

        if (this.subscription) {

            unsubscribe(this.subscription);

            this.subscription = null;
        }
    }
}