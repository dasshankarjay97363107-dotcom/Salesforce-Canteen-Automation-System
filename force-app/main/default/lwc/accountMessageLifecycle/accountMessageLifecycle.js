import { LightningElement, wire } from 'lwc';

import {
    subscribe,
    unsubscribe,
    MessageContext
} from 'lightning/messageService';

import ACCOUNT_SELECTION_CHANNEL
    from '@salesforce/messageChannel/AccountSelection__c';

export default class AccountMessageLifecycle extends LightningElement {

    subscription = null;

    selectedAccountId = '';

    messageStatus = 'Not subscribed';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {

        this.messageStatus = 'Subscribing...';

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

        this.messageStatus = 'Subscribed to Account Selection Channel';
    }

    handleMessage(message) {

        this.selectedAccountId = message.accountId;
    }

    disconnectedCallback() {

        if (this.subscription) {

            unsubscribe(this.subscription);

            this.subscription = null;

            this.messageStatus = 'Unsubscribed';
        }
    }
}