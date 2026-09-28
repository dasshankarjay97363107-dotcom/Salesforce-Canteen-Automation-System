public with sharing class AccountContactsController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId) {

        return [
            SELECT Id, Name, Email, Phone
            FROM Contact
            WHERE AccountId = :accountId
            ORDER BY Name
        ];
    }
}