public with sharing class DoctorAvailabilityController {

    @AuraEnabled(cacheable=true)
    public static List<Doctor__c> getDoctors(String searchDoctor, String specialty) {

        String doctorSearch = '%' + searchDoctor + '%';
        String specialtySearch = '%' + specialty + '%';

        return [
            SELECT Id, Name, Specialty__c
            FROM Doctor__c
            WHERE Name LIKE :doctorSearch
            AND Specialty__c LIKE :specialtySearch
            ORDER BY Name
        ];
    }
}