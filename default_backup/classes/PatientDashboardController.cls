public with sharing class PatientDashboardController {

    // Fetch patient's appointments
    @AuraEnabled(cacheable=true)
    public static List<Appointment__c> getPatientAppointments(String patientName) {

        String searchName = '%' + patientName + '%';

        return [
            SELECT Id,
                   Name,
                   Appointment_Date__c,
                   Start_Time__c,
                   End_Time__c,
                   Status__c,
                   Patient__c,
                   Patient__r.Name,
                   Doctor__c,
                   Doctor__r.Name
            FROM Appointment__c
            WHERE Patient__r.Name LIKE :searchName
            ORDER BY Appointment_Date__c DESC
        ];
    }


    // Reschedule appointment
    @AuraEnabled
    public static void updateAppointment(
        Id appointmentId,
        Date newDate,
        Time newStartTime,
        Time newEndTime
    ) {

        Appointment__c appointmentRecord = [
            SELECT Id,
                   Appointment_Date__c,
                   Start_Time__c,
                   End_Time__c
            FROM Appointment__c
            WHERE Id = :appointmentId
            LIMIT 1
        ];

        appointmentRecord.Appointment_Date__c = newDate;
        appointmentRecord.Start_Time__c = newStartTime;
        appointmentRecord.End_Time__c = newEndTime;

        update appointmentRecord;
    }


    // Cancel appointment
    @AuraEnabled
    public static void cancelAppointment(Id appointmentId) {

        Appointment__c appointmentRecord = [
            SELECT Id, Status__c
            FROM Appointment__c
            WHERE Id = :appointmentId
            LIMIT 1
        ];

        appointmentRecord.Status__c = 'Cancelled';

        update appointmentRecord;
    }
}