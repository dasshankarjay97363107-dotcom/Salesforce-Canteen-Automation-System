@isTest
private class ContactControllerTest {
    @isTest
    static void testGetContacts() {
        Contact con = new Contact(
            FirstName = 'Test',
            LastName = 'Contact',
            Email = 'test@example.com'
        );
        insert con;

        Test.startTest();
        List<Contact> contacts = ContactController.getContacts();
        Test.stopTest();

        System.assertEquals(1, contacts.size());
        System.assertEquals('Test', contacts[0].FirstName);
        System.assertEquals('Contact', contacts[0].LastName);
        System.assertEquals('test@example.com', contacts[0].Email);
    }
}