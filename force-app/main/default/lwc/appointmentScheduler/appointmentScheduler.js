import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import APPOINTMENT_OBJECT from '@salesforce/schema/Appointment__c';
import PATIENT_FIELD from '@salesforce/schema/Appointment__c.Patient__c';
import DOCTOR_FIELD from '@salesforce/schema/Appointment__c.Doctor__c';
import DATE_FIELD from '@salesforce/schema/Appointment__c.Appointment_Date__c';
import START_TIME_FIELD from '@salesforce/schema/Appointment__c.Start_Time__c';
import END_TIME_FIELD from '@salesforce/schema/Appointment__c.End_Time__c';

export default class AppointmentScheduler extends LightningElement {

    patientId;
    doctorId;
    appointmentDate;
    startTime;
    endTime;

    handlePatientChange(event) {
        this.patientId = event.detail.recordId;
    }

    handleDoctorChange(event) {
        this.doctorId = event.detail.recordId;
    }

    handleDateChange(event) {
        this.appointmentDate = event.target.value;
    }

    handleStartTimeChange(event) {
        this.startTime = event.target.value;
    }

    handleEndTimeChange(event) {
        this.endTime = event.target.value;
    }

    handleBookAppointment() {

        if (
            !this.patientId ||
            !this.doctorId ||
            !this.appointmentDate ||
            !this.startTime ||
            !this.endTime
        ) {
            this.showToast(
                'Error',
                'Please fill all appointment details.',
                'error'
            );
            return;
        }

        const fields = {};

        fields[PATIENT_FIELD.fieldApiName] = this.patientId;
        fields[DOCTOR_FIELD.fieldApiName] = this.doctorId;
        fields[DATE_FIELD.fieldApiName] = this.appointmentDate;
        fields[START_TIME_FIELD.fieldApiName] = this.startTime;
        fields[END_TIME_FIELD.fieldApiName] = this.endTime;

        const recordInput = {
            apiName: APPOINTMENT_OBJECT.objectApiName,
            fields: fields
        };

        createRecord(recordInput)
            .then(() => {

                this.showToast(
                    'Success',
                    'Appointment booked successfully!',
                    'success'
                );

                this.clearForm();
            })
            .catch(error => {

                this.showToast(
                    'Error',
                    error.body?.message || 'Unable to book appointment.',
                    'error'
                );
            });
    }

    clearForm() {
        this.patientId = null;
        this.doctorId = null;
        this.appointmentDate = null;
        this.startTime = null;
        this.endTime = null;
    }

    showToast(title, message, variant) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}