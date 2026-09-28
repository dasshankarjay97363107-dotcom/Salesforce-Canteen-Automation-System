import { LightningElement } from 'lwc';

export default class ParentMethodDemo extends LightningElement {

    handleCallChild() {

        const childComponent =
            this.template.querySelector('c-child-method-demo');

        childComponent.showMessage();
    }
}