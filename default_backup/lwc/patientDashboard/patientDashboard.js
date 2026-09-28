import { LightningElement } from 'lwc';
import getPatientAppointments from '@salesforce/apex/PatientDashboardController.getPatientAppointments';
import updateAppointment from '@salesforce/apex/PatientDashboardController.updateAppointment';
import cancelAppointment from '@salesforce/apex/PatientDashboardController.cancelAppointment';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PatientDashboard extends LightningElement {

    searchPatient = '';
    appointments = [];
    showNoData = false;

    showRescheduleModal = false;

    selectedAppointmentId;

    newDate;
    newStartTime;
    newEndTime;

    columns = [
        {
            label: 'Doctor',
            fieldName: 'doctorName'
        },
        {
            label: 'Appointment Date',
            fieldName: 'appointmentDate'
        },
        {
            label: 'Start Time',
            fieldName: 'startTime'
        },
        {
            label: 'End Time',
            fieldName: 'endTime'
        },
        {
            label: 'Status',
            fieldName: 'status'
        },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    {
                        label: 'Reschedule',
                        name: 'reschedule'
                    },
                    {
                        label: 'Cancel',
                        name: 'cancel'
                    }
                ]
            }
        }
    ];

    handlePatientSearch(event) {
        this.searchPatient = event.target.value;
    }

    handleSearch() {

        if (!this.searchPatient) {
            this.appointments = [];
            this.showNoData = true;
            return;
        }

        getPatientAppointments({
            patientName: this.searchPatient
        })
        .then(result => {

            this.appointments = result.map(appointment => {

                return {
                    id: appointment.Id,
                    doctorName: appointment.Doctor__r
                        ? appointment.Doctor__r.Name
                        : '',
                    appointmentDate: appointment.Appointment_Date__c,
                    startTime: appointment.Start_Time__c,
                    endTime: appointment.End_Time__c,
                    status: appointment.Status__c
                };

            });

            this.showNoData = this.appointments.length === 0;
        })
        .catch(error => {

            console.error(error);

            this.appointments = [];
            this.showNoData = true;

            this.showToast(
                'Error',
                error.body?.message || 'Unable to load appointments.',
                'error'
            );
        });
    }

    handleRowAction(event) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'reschedule') {
            this.openRescheduleModal(row);
        }

        if (actionName === 'cancel') {
            this.handleCancel(row);
        }
    }

    openRescheduleModal(row) {

        this.selectedAppointmentId = row.id;

        this.newDate = row.appointmentDate;
        this.newStartTime = row.startTime;
        this.newEndTime = row.endTime;

        this.showRescheduleModal = true;
    }

    closeRescheduleModal() {

        this.showRescheduleModal = false;

        this.selectedAppointmentId = null;

        this.newDate = null;
        this.newStartTime = null;
        this.newEndTime = null;
    }

    handleNewDateChange(event) {
        this.newDate = event.target.value;
    }

    handleNewStartTimeChange(event) {
        this.newStartTime = event.target.value;
    }

    handleNewEndTimeChange(event) {
        this.newEndTime = event.target.value;
    }

    saveReschedule() {

        if (
            !this.newDate ||
            !this.newStartTime ||
            !this.newEndTime
        ) {

            this.showToast(
                'Error',
                'Please enter date and time.',
                'error'
            );

            return;
        }

        updateAppointment({
            appointmentId: this.selectedAppointmentId,
            newDate: this.newDate,
            newStartTime: this.newStartTime,
            newEndTime: this.newEndTime
        })
        .then(() => {

            this.showToast(
                'Success',
                'Appointment rescheduled successfully.',
                'success'
            );

            this.closeRescheduleModal();

            this.handleSearch();
        })
        .catch(error => {

            this.showToast(
                'Error',
                error.body?.message || 'Unable to reschedule appointment.',
                'error'
            );
        });
    }

    handleCancel(row) {

        cancelAppointment({
            appointmentId: row.id
        })
        .then(() => {

            this.showToast(
                'Success',
                'Appointment cancelled successfully.',
                'success'
            );

            this.handleSearch();
        })
        .catch(error => {

            this.showToast(
                'Error',
                error.body?.message || 'Unable to cancel appointment.',
                'error'
            );
        });
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