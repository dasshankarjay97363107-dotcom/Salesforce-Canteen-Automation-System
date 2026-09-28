import { LightningElement, api } from 'lwc';

export default class YoutubeChild extends LightningElement {

    @api channelName;
    @api subscribers;

    handleSubscribe() {
        const event = new CustomEvent('subscribe', {
            detail: {
                channelName: this.channelName,
                message: 'User subscribed successfully!'
            }
        });

        this.dispatchEvent(event);
    }
}