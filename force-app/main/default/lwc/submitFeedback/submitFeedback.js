import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FEEDBACK_OBJECT from '@salesforce/schema/Feedback__c';

import CUSTOMER_FIELD from '@salesforce/schema/Feedback__c.Customer__c';
import PRODUCT_FIELD from '@salesforce/schema/Feedback__c.Product__c';
import STORE_FIELD from '@salesforce/schema/Feedback__c.Store__c';
import RATING_FIELD from '@salesforce/schema/Feedback__c.Rating__c';
import TYPE_FIELD from '@salesforce/schema/Feedback__c.Feedback_Type__c';
import COMMENTS_FIELD from '@salesforce/schema/Feedback__c.Comments__c';

export default class SubmitFeedback extends LightningElement {

    customerId;
    product = '';
    store = '';
    rating = '';
    feedbackType = '';
    comments = '';

    ratingOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' }
    ];

    feedbackTypeOptions = [
        { label: 'Product', value: 'Product' },
        { label: 'Service', value: 'Service' },
        { label: 'Staff', value: 'Staff' },
        { label: 'Store', value: 'Store' },
        { label: 'Delivery', value: 'Delivery' },
        { label: 'Other', value: 'Other' }
    ];

    handleCustomerChange(event) {
        this.customerId = event.detail.recordId;
    }

    handleProductChange(event) {
        this.product = event.target.value;
    }

    handleStoreChange(event) {
        this.store = event.target.value;
    }

    handleRatingChange(event) {
        this.rating = event.detail.value;
    }

    handleFeedbackTypeChange(event) {
        this.feedbackType = event.detail.value;
    }

    handleCommentsChange(event) {
        this.comments = event.target.value;
    }

    async handleSubmit() {

        const fields = {};

        fields[CUSTOMER_FIELD.fieldApiName] = this.customerId;
        fields[PRODUCT_FIELD.fieldApiName] = this.product;
        fields[STORE_FIELD.fieldApiName] = this.store;
        fields[RATING_FIELD.fieldApiName] = this.rating;
        fields[TYPE_FIELD.fieldApiName] = this.feedbackType;
        fields[COMMENTS_FIELD.fieldApiName] = this.comments;

        const recordInput = {
            apiName: FEEDBACK_OBJECT.objectApiName,
            fields
        };

        try {

            await createRecord(recordInput);

            this.showToast(
                'Success',
                'Feedback submitted successfully!',
                'success'
            );

            this.clearForm();

        } catch (error) {

            this.showToast(
                'Error',
                error.body?.message || 'Something went wrong.',
                'error'
            );
        }
    }

    clearForm() {
        this.customerId = null;
        this.product = '';
        this.store = '';
        this.rating = '';
        this.feedbackType = '';
        this.comments = '';
    }

    showToast(title, message, variant) {

        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}