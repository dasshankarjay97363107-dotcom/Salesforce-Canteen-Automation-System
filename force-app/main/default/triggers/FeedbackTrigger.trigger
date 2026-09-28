trigger FeedbackTrigger on Feedback__c (after insert) {

    if (Trigger.isAfter && Trigger.isInsert) {

        FeedbackLoyaltyService.createLoyaltyPoints(Trigger.new);

    }
}