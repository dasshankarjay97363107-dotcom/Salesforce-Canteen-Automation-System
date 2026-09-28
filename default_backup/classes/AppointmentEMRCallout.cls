public class AppointmentEMRCallout {

    @future(callout=true)
    public static void sendAppointmentToEMR(Id appointmentId) {

        Appointment__c appointment = [
            SELECT Id,
                   Name,
                   Patient__c,
                   Doctor__c,
                   Appointment_Date__c,
                   Start_Time__c,
                   End_Time__c,
                   Status__c
            FROM Appointment__c
            WHERE Id = :appointmentId
            LIMIT 1
        ];

        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://example.com/api/appointments');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');

        Map<String, Object> appointmentData = new Map<String, Object>{
            'appointmentId' => appointment.Id,
            'patientId' => appointment.Patient__c,
            'doctorId' => appointment.Doctor__c,
            'appointmentDate' => appointment.Appointment_Date__c,
            'startTime' => appointment.Start_Time__c,
            'endTime' => appointment.End_Time__c,
            'status' => appointment.Status__c
        };

        request.setBody(JSON.serialize(appointmentData));

        Http http = new Http();
        HttpResponse response = http.send(request);

        System.debug('EMR Response Status: ' + response.getStatusCode());
        System.debug('EMR Response Body: ' + response.getBody());
    }
}