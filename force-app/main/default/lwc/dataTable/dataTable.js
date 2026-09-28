import { LightningElement } from 'lwc';

export default class DataTable extends LightningElement { 
    accounts= [
        { id: 1, name: 'Jay', industry: 'IT', phone: '8797363107'},
        { id: 2, name: 'Aman', industry: 'IT', phone: '9650456490'},
        { id: 3, name: 'Amit', industry: 'Finance', phone: '9876543210' }
    ];
    columns = [
        {label: 'Account Name', fieldName: 'name'},
        {label: 'Industry', fieldName: 'industry'},
        {label: 'Phone', fieldName: 'phone'}
    ];
}