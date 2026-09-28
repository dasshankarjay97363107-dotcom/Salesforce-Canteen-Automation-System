import { LightningElement, wire } from 'lwc';

import {
    subscribe,
    unsubscribe,
    MessageContext
} from 'lightning/messageService';

import ACCOUNT_SELECTION_CHANNEL
    from '@salesforce/messageChannel/AccountSelection__c';

export default class AccountMessageListener extends LightningElement {

    selectedAccountId = '';
    subscription = null;

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
            (message) => {
                this.handleMessage(message);
            }
        );
    }

    handleMessage(message) {

        this.selectedAccountId = message.accountId;

    }

    disconnectedCallback() {

        if (this.subscription) {

            unsubscribe(this.subscription);

            this.subscription = null;
        }
    }
}