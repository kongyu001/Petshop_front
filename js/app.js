var nonce = $.cookie('nonce');
var app =angular.module('PetShopApp',['ngRoute', 'ngCookies']);
    app.config(function($routeProvider){
        $routeProvider
        .when('/',{
        	templateUrl:"pages/petShop.html",
        	controller:"PetShopController"
        })
         .when('/purchase_record',{
        	templateUrl:"pages/purchaseRecord.html",
        	controller:"PurchaseRecordController"
        })
        .when('/customer_information',{
        	templateUrl:"pages/customerInformation.html",
        	controller:"CustomerInformationController"
        })
        .when('/commodityInfo',{
        	templateUrl:"pages/commodityInfo.html",
        	controller:"CommodityInfoController"
        })
        .otherwise({redirectTo:'/'});
    });