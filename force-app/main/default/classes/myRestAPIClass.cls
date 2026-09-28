@RestResource(urlMapping='/Account/*')
global with sharing class myRestAPIClass {

    @HttpGet
    global static void getAccountDetails() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        String accountId = req.requestURI.substring(
            req.requestURI.lastIndexOf('/') + 1
        );

        Account acc = [
            SELECT Id, Name, Industry, Rating
            FROM Account
            WHERE Id = :accountId
            LIMIT 1
        ];

        res.responseBody = Blob.valueOf(JSON.serialize(acc));
        res.statusCode = 200;
    }


    @HttpPost
    global static String insertAccountDetails(
        String Name,
        String Rating,
        String AccountNumber
    ) {
        Account acc = new Account();

        acc.Name = Name;
        acc.Rating = Rating;
        acc.AccountNumber = AccountNumber;

        insert acc;

        return 'Account Name is: ' + acc.Name +
               ' and Account Id is: ' + acc.Id;
    }


    @HttpPut
    global static String updateAccountDetails(String AccountId) {

        Account getAccDetails = [
            SELECT Id, Name, Rating
            FROM Account
            WHERE Id = :AccountId
            LIMIT 1
        ];

        getAccDetails.Name = 'Account Sunday';
        getAccDetails.Rating = 'Hot';

        update getAccDetails;

        return 'Updated Details => Rating: ' +
               getAccDetails.Rating;
    }


    @HttpPatch
    global static String upsertAccountDetails(String AccountId) {

        Account getAccDetails = [
            SELECT Id, Name, Rating
            FROM Account
            WHERE Id = :AccountId
            LIMIT 1
        ];

        getAccDetails.Name = 'Account Wednesday';

        update getAccDetails;

        Account accNew = new Account();

        accNew.Name = getAccDetails.Name + ' Upcoming Account';
        accNew.AccountNumber = '987654321';

        insert accNew;

        return 'Updated Account Name is: ' +
               getAccDetails.Name +
               ' | Inserted Account Name is: ' +
               accNew.Name;
    }


    @HttpDelete
    global static String deleteAccountDetails() {

        RestRequest req = RestContext.request;

        String accountId = req.requestURI.substring(
            req.requestURI.lastIndexOf('/') + 1
        );

        Account acc = [
            SELECT Id, Name, Industry, Rating
            FROM Account
            WHERE Id = :accountId
            LIMIT 1
        ];

        delete acc;

        return 'Account Deleted Successfully';
    }
}