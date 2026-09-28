import { LightningElement } from 'lwc';

export default class YoutubeParent extends LightningElement {

    subscriptionMessage = '';

    handleSubscribe(event) {

        this.subscriptionMessage =
            `${event.detail.message} Channel: ${event.detail.channelName}`;
    }
}