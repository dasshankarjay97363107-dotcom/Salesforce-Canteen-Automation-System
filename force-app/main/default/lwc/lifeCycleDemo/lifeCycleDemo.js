import { LightningElement } from 'lwc';

export default class LifecycleDemo extends LightningElement {

    message = 'Component is created';

    constructor() {
        super();
        console.log('1. constructor() called');
    }

    connectedCallback() {
        console.log('2. connectedCallback() called');
    }

    renderedCallback() {
        console.log('3. renderedCallback() called');
    }

    disconnectedCallback() {
        console.log('4. disconnectedCallback() called');
    }

    errorCallback(error, stack) {
        console.log('5. errorCallback() called');
        console.log(error);
        console.log(stack);
    }

    handleClick() {
        this.message = 'Message changed!';
    }
}