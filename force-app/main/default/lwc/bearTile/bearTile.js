import { LightningElement, api } from 'lwc';

export default class BearTile extends LightningElement {
    @api bear;

    handleOpenRecordClick() {
        const viewEvent = new CustomEvent('bearview', {
            detail: this.bear.Id
        });

        this.dispatchEvent(viewEvent);
    }
}