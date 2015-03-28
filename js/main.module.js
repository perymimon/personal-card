/**
 * Created by pery on 14/08/14.
 */
angular.module('MainModule', ['ui.router','dataModule'])

    .config(function ( $compileProvider ) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);
        $compileProvider.imgSrcSanitizationWhitelist( /^\s*(https?|ftp|file|blob):|data:image\// );
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    })

    .config( function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('template',{
                url:'/template/:index',
                views:{
                    front:{
                        templateUrl:function($stateParams){
                            return 'views/'+ $stateParams.index +'/front.html';
                        }
                    },
                    back:{
                        templateUrl:function($stateParams){
                            return 'views/'+$stateParams.index+'/back.html';
                        }
                    }
                }
            })
          ;
        $urlRouterProvider.otherwise("/template/1");
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
    .factory('downloadDomAsImage',function($q){

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
            return $q(function (resolve, reject) {
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
                        resolve(objectURL);

                    }
                })
            })

        }
    })
    .directive('img', function () {
        return function($scope,element,attr){
            var imageType = /^image\//;
            element[0].addEventListener("drop", drop, false);
            element[0].addEventListener("dragover", dragover, false);

            function dragover(evt){
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a
            }

            function drop (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                var files = evt.dataTransfer.files;

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!imageType.test(file.type)) {
                        continue;
                    }
                    element[0].file = file;
                    element[0].src = URL.createObjectURL(file);
                    return;
                    //URL.revokeObjectURL(objectURL);
                }
                /*maybe drop is link of  img*/
                var elm  =angular.element(evt.dataTransfer.getData('text/html'));
                var src = elm[0].src || elm.find('img')[0].src;
                element[0].src = src;
            }
        }
    })
    .controller('mainCtrl', function ( $scope, person, personSchema, images, datGUI, downloadDomAsImage, $stateParams, $q,$document) {
        $scope.person = person;
        $scope.$stateParams = $stateParams;
        $scope.images = images;
        $scope.state = {};
        $scope.state.inProgress = false;
        datGUI(person, personSchema, function(value) {
            // Fires on every change, drag, keypress, etc.
            $scope.$digest();
        } );
        //datGUI(images, {}, function(value) {
        //    // Fires on every change, drag, keypress, etc.
        //    $scope.$digest();
        //});
        $scope.screenshot = function(){
            $scope.state.inProgress = true;

            var proms1 = downloadDomAsImage( document.getElementsByClassName('front'),'front' );
            var proms2 = downloadDomAsImage( document.getElementsByClassName('back'),'back' );

            $q.all([proms1, proms2]).then(function (data) {
                var urlImage1 = data[0];
                var urlImage2 = data[1];
                $scope.imageUrlFront = urlImage1;
                $scope.imageUrlBack = urlImage2;
                $scope.state.inProgress = false;
            })
        };
        //document.addEventListener("dragenter", function (evt) {
        //    evt.preventDefault();
        //}, false);
        //document.addEventListener("dragover", function (evt) {
        //    evt.preventDefault();
        //}, false);
        document.addEventListener("drop", function (evt) {
            evt.preventDefault();
        },false)


    });
