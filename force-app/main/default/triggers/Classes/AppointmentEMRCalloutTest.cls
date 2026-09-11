@isTest
private class AppointmentEMRCalloutTest {

    @isTest
    static void testSendAppointmentToEMR() {

        Patient__c patient = new Patient__c(
            Name = 'Test Patient',
            Email__c = 'test@example.com'
        );
        insert patient;

        Appointment__c appointment = new Appointment__c(
            Patient__c = patient.Id,
            Appointment_Date__c = Date.today().addDays(1),
            Start_Time__c = Time.newInstance(10, 0, 0, 0),
            End_Time__c = Time.newInstance(10, 30, 0, 0),
            Status__c = 'Booked'
        );
        insert appointment;

        Test.setMock(
            HttpCalloutMock.class,
            new EMRCalloutMock()
        );

        Test.startTest();

        AppointmentEMRCallout.sendAppointmentToEMR(appointment.Id);

        Test.stopTest();
    }

    private class EMRCalloutMock implements HttpCalloutMock {

        public HttpResponse respond(HttpRequest request) {

            HttpResponse response = new HttpResponse();
            response.setStatusCode(200);
            response.setBody('{"status":"success"}');

            return response;
        }
    }
}