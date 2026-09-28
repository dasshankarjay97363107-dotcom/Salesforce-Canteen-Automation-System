import { LightningElement } from 'lwc';
import getDoctors from '@salesforce/apex/DoctorAvailabilityController.getDoctors';

export default class DoctorAvailabilityGrid extends LightningElement {

    searchDoctor = '';
    specialty = '';

    availabilityData = [];
    showNoData = false;

    columns = [
        {
            label: 'Doctor',
            fieldName: 'doctorName'
        },
        {
            label: 'Specialty',
            fieldName: 'specialty'
        }
    ];

    handleDoctorSearch(event) {
        this.searchDoctor = event.target.value;
    }

    handleSpecialtyChange(event) {
        this.specialty = event.target.value;
    }

    handleSearch() {

        getDoctors({
            searchDoctor: this.searchDoctor,
            specialty: this.specialty
        })
        .then(result => {

            this.availabilityData = result.map(doctor => {
                return {
                    id: doctor.Id,
                    doctorName: doctor.Name,
                    specialty: doctor.Specialty__c
                };
            });

            this.showNoData = this.availabilityData.length === 0;
        })
        .catch(error => {

            console.error('Error:', error);

            this.availabilityData = [];
            this.showNoData = true;
        });
    }
}