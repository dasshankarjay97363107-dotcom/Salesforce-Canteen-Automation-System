import { LightningElement } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class RewardsCatalog extends LightningElement {

    selectedReward = '';
    pointsRequired = 0;

    rewardOptions = [
        { label: '₹50 Discount - 100 Points', value: 'Discount 50' },
        { label: '₹100 Discount - 200 Points', value: 'Discount 100' },
        { label: 'Free Product - 300 Points', value: 'Free Product' },
        { label: 'Premium Reward - 500 Points', value: 'Premium Reward' }
    ];

    handleRewardChange(event) {

        this.selectedReward = event.detail.value;

        if (this.selectedReward === 'Discount 50') {
            this.pointsRequired = 100;
        }
        else if (this.selectedReward === 'Discount 100') {
            this.pointsRequired = 200;
        }
        else if (this.selectedReward === 'Free Product') {
            this.pointsRequired = 300;
        }
        else if (this.selectedReward === 'Premium Reward') {
            this.pointsRequired = 500;
        }
    }

    handleRedeem() {

        const flow = this.template.querySelector('lightning-flow');

        if (flow) {
            flow.startFlow('Redeem_Reward_Flow');
        }
    }
}