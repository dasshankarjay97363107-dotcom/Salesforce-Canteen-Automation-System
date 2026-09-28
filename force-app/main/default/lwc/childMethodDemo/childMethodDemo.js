import { LightningElement } from 'lwc';

export default class ChildMethodDemo extends LightningElement {
    showMessage() {
        alert('Method called from Parent!');
    }
}