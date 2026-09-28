public class FeedbackLoyaltyService {

    public static void createLoyaltyPoints(List<Feedback__c> feedbackList) {

        List<Loyalty_Point__c> loyaltyPoints = new List<Loyalty_Point__c>();

        for (Feedback__c fb : feedbackList) {

            Integer points = 0;

            if (fb.Rating__c == '5') {
                points = 20;
            }
            else if (fb.Rating__c == '4') {
                points = 15;
            }
            else if (fb.Rating__c == '3') {
                points = 10;
            }
            else if (fb.Rating__c == '2') {
                points = 5;
            }
            else if (fb.Rating__c == '1') {
                points = 5;
            }

            if (fb.Customer__c != null && points > 0) {

                loyaltyPoints.add(
                    new Loyalty_Point__c(
                        Customer__c = fb.Customer__c,
                        Feedback__c = fb.Id,
                        Points__c = points,
                        Transaction_Type__c = 'Feedback Reward',
                        Transaction_Date__c = Date.today()
                    )
                );
            }
        }

        if (!loyaltyPoints.isEmpty()) {
            insert loyaltyPoints;
        }
    }
}