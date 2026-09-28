import { LightningElement } from 'lwc';

export default class TemplateDemo extends LightningElement {
    
    accounts = [
        { id: '1', name: 'ABC Company' },
        { id: '2', name: 'Acme' },
        { id: '3', name: 'Edge Communications' },
        { id: '4', name: 'Mondocorp' }
    ];
}