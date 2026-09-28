public with sharing class AccountDataTableController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {

        return [
            SELECT Id, Name, Phone, Industry
            FROM Account
            ORDER BY Name
        ];
    }
}