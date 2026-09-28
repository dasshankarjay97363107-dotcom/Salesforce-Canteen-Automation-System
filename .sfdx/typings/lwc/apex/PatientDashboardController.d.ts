declare module "@salesforce/apex/PatientDashboardController.getPatientAppointments" {
  export default function getPatientAppointments(param: {patientName: any}): Promise<any>;
}
declare module "@salesforce/apex/PatientDashboardController.updateAppointment" {
  export default function updateAppointment(param: {appointmentId: any, newDate: any, newStartTime: any, newEndTime: any}): Promise<any>;
}
declare module "@salesforce/apex/PatientDashboardController.cancelAppointment" {
  export default function cancelAppointment(param: {appointmentId: any}): Promise<any>;
}
