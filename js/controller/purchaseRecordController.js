app.controller('PurchaseRecordController', function($scope, $http, $cookies) {
	$scope.loadList = function(pageNum) {
		console.log(pageNum);
		if(pageNum === undefined) {
			pageNum = 1;
		}
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/purchase_records",
			"params": "?pageNum=" + pageNum + "&pageSize=" +8,
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
				$scope.purchase_records = response.data;
				var auth = $.cookie('customId') + ';' + nonce + ';' + generateSign($.cookie('customId'), nonce, $.cookie("customToken"));
				//获取图片
				$scope.purchase_records.map(function(purchase_record) {
					purchase_record.commodityImageUrl = HOST_URL + "/images/get/commodities/" + purchase_record.commodityId + "?authorization=" + auth;
				})
				$scope.pageParams = getPageParams(response.pageNum, response.pages);
			}
		});
	}
	$scope.loadList();

	//日期筛选

	$scope.search_Time = function(start, end) {
		console.log(start, end)
		if(start != null) {
			var st = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate() + " 00:00:00";
		} else
			var st = null;
		if(end != null) {
			var ed = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate() + " 59:59:59";
		}
		else var ed = null;
		console.log(st, ed);
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/purchase_records/time",
			"$cookies": $cookies,
			"method": "POST",
			"data": {
				"data": {
					"start": st,
					"end": ed
				}
			},
			"callbackFunction": function(response) {
				$scope.purchase_records ={};
				var auth = $.cookie('customId') + ';' + nonce + ';' + generateSign($.cookie('customId'), nonce, $.cookie("customToken"));
				console.log(response.data);
				$scope.purchase_records = response.data;
				$scope.purchase_records.map(function(purchase_record) {
						purchase_record.commodityImageUrl = HOST_URL + "/images/get/commodities/" + purchase_record.commodityId + "?authorization=" + auth;
					})
				$scope.pageParams = getPageParams(response.pageNum, response.pages);
				toastr.success('查找成功！');
			},
			"errorCallbackFunction":function(){
				$scope.purchase_records ={};
			}
		});
	}
})