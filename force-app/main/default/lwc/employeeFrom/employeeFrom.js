import { LightningElement, track } from 'lwc';

export default class EmployeeFrom extends LightningElement {
    @track employee = {
        name: '',
        salary: 0,
        email: '',
        phone: '',
    };
    handleNameChange(event){
        this.employee.name = event.traget.value;

    }
    handleSalaryChange(event){
        this.employee.salary = event.target.value;
    }
}
