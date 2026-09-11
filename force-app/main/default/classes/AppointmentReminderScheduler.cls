global class AppointmentReminderScheduler implements Schedulable {

    global void execute(SchedulableContext sc) {

        Date tomorrow = Date.today().addDays(1);

        List<Appointment__c> appointments = [
            SELECT Id,
                   Patient__c,
                   Appointment_Date__c,
                   Start_Time__c,
                   End_Time__c,
                   Status__c,
                   Patient__r.Email__c
            FROM Appointment__c
            WHERE Appointment_Date__c = :tomorrow
            AND Status__c = 'Booked'
        ];

        List<Messaging.SingleEmailMessage> emails =
            new List<Messaging.SingleEmailMessage>();

        for (Appointment__c app : appointments) {

            if (app.Patient__r != null &&
                app.Patient__r.Email__c != null) {

                Messaging.SingleEmailMessage mail =
                    new Messaging.SingleEmailMessage();

                mail.setToAddresses(
                    new String[] { app.Patient__r.Email__c }
                );

                mail.setSubject('Appointment Reminder');

                mail.setPlainTextBody(
                    'Reminder: You have an appointment scheduled for tomorrow.'
                );

                emails.add(mail);
            }
        }

        if (!emails.isEmpty()) {
            Messaging.sendEmail(emails);
        }
    }
}