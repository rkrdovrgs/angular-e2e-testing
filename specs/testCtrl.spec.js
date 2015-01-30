/**
 * Created by ricardov on 1/27/2015.
 */
describe('Sample App', function () {

    browser.get('http://localhost:44544/index.html');

    it('should greet the named user', function () {
        element(by.model('firstName')).sendKeys('World');
        var greeting = element(by.binding('firstName'));
        expect(greeting.getText()).toEqual('Hello World!');
    });


    it('should display active users only [remote source]', function () {
        var activeUsersSelector = by.repeater('u in users');
        var activeUsersCount = element.all(activeUsersSelector).count();
        expect(activeUsersCount).toEqual(2);

        expect(element(activeUsersSelector.row(0)).getText()).toEqual('Ricardo');
        expect(element(activeUsersSelector.row(1)).getText()).toEqual('Luis');

    });

    it('should display active users only [fake source]', function () {

        browser.addMockModule('httpBackendMock', function () {
            angular.module('httpBackendMock', ['app', 'ngMockE2E'])
                .run(function ($httpBackend) {
                    $httpBackend.whenGET('/api/users.json').respond([
                        {
                            firstName: 'Fake1',
                            isActive: true
                        },
                        {
                            firstName: 'Fake2',
                            isActive: false
                        },
                        {
                            firstName: 'Fake3',
                            isActive: true
                        }
                    ]);
                });
        });

        browser.get('http://localhost:44544/index.html');

        var activeUsersSelector = by.repeater('u in users');
        var activeUsersCount = element.all(activeUsersSelector).count();
        expect(activeUsersCount).toEqual(2);

        expect(element(activeUsersSelector.row(0)).getText()).toEqual('Fake1');
        expect(element(activeUsersSelector.row(1)).getText()).toEqual('Fake3');

    });


});