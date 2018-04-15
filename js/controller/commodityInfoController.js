app.controller('CommodityInfoController', function($scope, $location, $http, $route, $cookies) {
	var id = $location.$$hash;
	var id = id.slice(1); //商品id
	var customId = $.cookie('customId');
	$scope.loadList = function() {
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/commodities/" + id,
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				var auth = $.cookie('customId') + ';' + nonce + ';' + generateSign($.cookie('customId'), nonce, $.cookie("customToken"));
				$scope.purchaseQuantity = 1;
				$scope.commodity = response.data;
				$scope.commodity.commodityImageUrl = HOST_URL + "/images/get/commodities/" + id + "?authorization=" + auth;
			}
		});
	}
	$scope.loadList();

	$scope.confirm = function(data) {
		var data = Number(data);
		if(data === "" || data === 0 || data === undefined) {
			toastr.error('必须要填写正确的数量哦！');
		} else {
			simplePostData({
				"$http": $http,
				"url": HOST_URL + "/purchase_records/pay/",
				"$cookies": $cookies,
				"method": "post",
				"data": {
					"data": {
						"commodityId": id,
						"purchaseQuantity": data
					}
				},
				"callbackFunction": function(response) {
					toastr.success('购买成功!');
					$scope.loadList();
					console.log(response.data);
					$('#confirmModal').modal('hide');
					$('#successModal').modal('show');
				},
				"errorCallbackFunction": function(response) {
					console.log(response.errorCode);
					if(response.errorCode === 70001) {
						$('#confirmModal').modal('hide');
						$('#failModal').modal('show');
					}else if(response.errorCode === 90003) {
						$('#confirmModal').modal('hide');
						$('#errorModal').modal('show');
					}
				}
			})
		}
	}

	//去充钱吧！
	$scope.rechargeOk = function() {
		$('#failModal').modal('hide');
		$location.url("/customer_information");
	}

	//购物成功，去看点别的吧！
	$scope.Ok = function() {
		$('#successModal').modal('hide');
		$location.url("/");
	}
});