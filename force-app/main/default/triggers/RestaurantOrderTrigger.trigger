trigger RestaurantOrderTrigger on Order (before insert, before update) {

    for (Order ord : Trigger.new) {

        if (Trigger.isUpdate) {

            Order oldOrd = Trigger.oldMap.get(ord.Id);

            if (oldOrd.Status == 'Ready' &&
                ord.Status == 'Pending') {

                ord.addError(
                    'Ready order cannot be changed back to Pending.'
                );
            }

            if (oldOrd.Status == 'Delivered' &&
                ord.Status != 'Delivered') {

                ord.addError(
                    'Delivered order status cannot be changed.'
                );
            }
        }
    }
}