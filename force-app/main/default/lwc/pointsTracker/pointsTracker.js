import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import TOTAL_POINTS_FIELD from '@salesforce/schema/Customer__c.Total_Points__c';

export default class PointsTracker extends LightningElement {

    customerId;
    totalPoints = 0;

    handleCustomerChange(event) {
        this.customerId = event.detail.recordId;
    }

    @wire(getRecord, {
        recordId: '$customerId',
        fields: [TOTAL_POINTS_FIELD]
    })
    customerRecord({ data, error }) {

        if (data) {
            this.totalPoints = getFieldValue(
                data,
                TOTAL_POINTS_FIELD
            ) || 0;
        }

        if (error) {
            this.totalPoints = 0;
            console.error(error);
        }
    }
}