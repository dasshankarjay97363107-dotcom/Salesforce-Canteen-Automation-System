trigger AppointmentTrigger on Appointment__c (before insert, before update) {

    Set<Id> doctorIds = new Set<Id>();
    Set<Date> appointmentDates = new Set<Date>();

    for (Appointment__c app : Trigger.new) {
        if (app.Doctor__c != null && app.Appointment_Date__c != null) {
            doctorIds.add(app.Doctor__c);
            appointmentDates.add(app.Appointment_Date__c);
        }
    }

    if (doctorIds.isEmpty() || appointmentDates.isEmpty()) {
        return;
    }

    List<Appointment__c> existingAppointments = [
        SELECT Id, Doctor__c, Appointment_Date__c,
               Start_Time__c, End_Time__c
        FROM Appointment__c
        WHERE Doctor__c IN :doctorIds
        AND Appointment_Date__c IN :appointmentDates
    ];

    for (Appointment__c newApp : Trigger.new) {

        if (newApp.Doctor__c == null ||
            newApp.Appointment_Date__c == null ||
            newApp.Start_Time__c == null ||
            newApp.End_Time__c == null) {
            continue;
        }

        for (Appointment__c existingApp : existingAppointments) {

            if (existingApp.Id == newApp.Id) {
                continue;
            }

            if (existingApp.Doctor__c == newApp.Doctor__c &&
                existingApp.Appointment_Date__c == newApp.Appointment_Date__c &&
                newApp.Start_Time__c < existingApp.End_Time__c &&
                newApp.End_Time__c > existingApp.Start_Time__c) {

                newApp.addError(
                    'Double booking is not allowed. ' +
                    'This doctor already has an appointment during this time.'
                );
            }
        }
    }
}