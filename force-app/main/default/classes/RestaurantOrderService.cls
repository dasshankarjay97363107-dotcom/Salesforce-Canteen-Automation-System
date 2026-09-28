public class RestaurantOrderService {

    public static void calculateOrderTotal(List<Order_Item__c> orderItems) {

        for (Order_Item__c item : orderItems) {

            if (item.Quantity__c == null || item.Quantity__c <= 0) {
                item.addError('Quantity must be greater than 0.');
            }

            if (item.Unit_Price__c == null || item.Unit_Price__c < 0) {
                item.addError('Unit Price cannot be negative.');
            }
        }
    }
}