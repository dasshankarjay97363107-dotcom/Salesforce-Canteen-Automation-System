import { LightningElement } from 'lwc';

export default class AutoFocusInput extends LightningElement {

    isFocused = false;

    renderedCallback() {

        if (this.isFocused) {
            return;
        }

        const inputElement =
            this.template.querySelector(
                '[data-id="nameInput"]'
            );

        if (inputElement) {

            inputElement.focus();

            this.isFocused = true;
        }
    }
}