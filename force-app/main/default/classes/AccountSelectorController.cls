public with sharing class AccountSelectorController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {

        return [
            SELECT Id, Name
            FROM Account
            ORDER BY Name
            LIMIT 50
        ];
    }
}