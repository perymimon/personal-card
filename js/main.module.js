/**
 * Created by pery on 14/08/14.
 */
angular.module('MainModule', ['ngRoute','dataModule'])

    .config(function ( $compileProvider ) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
        $compileProvider.imgSrcSanitizationWhitelist( /^\s*(https?|ftp|file|blob):|data:image\// );
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    })

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
    .value('personSchema', {
        name:'text',
        working:{
            profession:'text',
            company:'text',
            pastCompany:'text'
        },
        birthday:'text',
        live:{
            city:'text',
            country:'text'
        },
        study:{
            studied:'text',
            pastStudied:'text',
            degree:'text',
            fieldTitle:'text'
        },
        contact:{
            phone: 'text',
            email: 'text',
            accounts: 'text'
        }
    })

    .factory('datGUI', function (  ) {

        return function (obj, schema, callback){
            var gui = new dat.GUI();
            var controller;
            var folder = null;
            for( key in obj ){
//                if( schema[])
                controller = gui.add(obj,key );
                controller.onChange( callback );
            }
            gui.remember(obj);
        }
    })
    .factory('downloadDomAsImage',function(){

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

        return function ( element, fileName  ) {
            html2canvas( element,{
                allowTaint:false,
                zoom:10,
//                height:500,
//                width:1200,
                letterRendering:true,
                useCORS:true,
                onrendered:function( canvas ){
                    var dataurl = canvas.toDataURL();
                    var blob = dataURItoBlob( dataurl );
                    var objectURL = URL.createObjectURL(  blob  );
                    var linkEl = document.createElement('a');
                    linkEl.href = objectURL;
                    linkEl.setAttribute('download',fileName);
                    linkEl.click();
                }
            })
        }
    })
    .controller('mainCtrl', function ( $scope, person, personSchema, images, datGUI, downloadDomAsImage) {
        $scope.person = person;
        datGUI(person, personSchema, function(value) {
            // Fires on every change, drag, keypress, etc.
            $scope.$digest();
        } );

        $scope.images = images;
        datGUI(images, {}, function(value) {
            // Fires on every change, drag, keypress, etc.
            $scope.$digest();
        } );
        $scope.screenshot = function(){
            downloadDomAsImage( document.getElementsByClassName('front'),'front' );
            downloadDomAsImage( document.getElementsByClassName('back'),'back' );

        }

    });
