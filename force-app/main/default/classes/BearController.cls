public with sharing class BearController {

    @AuraEnabled(cacheable=true)
    public static List<Bear__c> getAllBears() {
        return [
            SELECT Id, Name, Email__c
            FROM Bear__c
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Bear__c> searchBears(String searchTerm) {
        String searchKey = '%' + searchTerm + '%';

        return [
            SELECT Id, Name, Email__c
            FROM Bear__c
            WHERE Name LIKE :searchKey
            ORDER BY Name
        ];
    }
}