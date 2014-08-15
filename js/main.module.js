/**
 * Created by pery on 14/08/14.
 */
angular.module('MainModule', ['ngRoute'])
    .config( function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/front', {
                templateUrl: 'views/front.html'
            })
            .when('/back',{
                templateUrl:'views/back.html'
            })
            .otherwise({
                redirectTo: '/front'
            });

//    // configure html5 to get links working on jsfiddle
//    $locationProvider.html5Mode(true);

    })
    .value('person', {
        name:'pery mimon',
        profession:'Web client developer',
        workingCompany:'a.mo.bee',
        pastCompany:'proGame',
        birthday:'21 September',
        city:'netanya',
        country:'israel',
        studied:'Bar-Ilan University',
        pastStudied:'Bar-Ilan Netanya',
        degree:'B.A.',
        fieldTitle:'Applied Mathematics',
        phone: '( +972 ) 054-3043-757',
        email: 'pery.mimon@gmail.com',
        accounts: 'fb.com/pery.mimon'

    })
    .factory('datGUI', function (  ) {

        return function (obj, callback){
            var gui = new dat.GUI();
            var controller;
            for( key in obj ){
                controller = gui.add(obj,key );
                controller.onChange( callback );
            }
            gui.remember(obj);
        }
    })
    .controller('mainCtrl', function ( $scope, person, datGUI ) {
        $scope.person = person;
        datGUI(person,function(value) {
            // Fires on every change, drag, keypress, etc.
            $scope.$digest();
        } );

    });
