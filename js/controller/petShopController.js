app.controller('PetShopController', function($scope, $http, $route, $cookies, $location) {
	//获取品类列表
	simplePostData({
		"$http": $http,
		"url": HOST_URL + "/categories",
		"$cookies": $cookies,
		"method": "GET",
		"callbackFunction": function(response) {
			$scope.categories = response.data;
		}
	});
	//加载列表，搜索框，分页
	var parameters = {
		pageNum: "1",
		searchName: "",
		category: "",
	};
	$scope.loadList = function(pageNum, searchName, category) {

		$scope.showPage = true;
		$scope.showNull = false;
		if(searchName !== undefined) {
			parameters.searchName = searchName;
		}
		if(pageNum !== undefined) {
			parameters.pageNum = pageNum;
		}
		if(category !== undefined) {
			if(category === -1) {
				parameters.category = "";
			} else {
				parameters.category = category;
			}

		}
		simplePostData({
			"$http": $http,
			"url": HOST_URL + "/commodities/search",
			"params": "?categoryId=" + parameters.category + "&q=" + parameters.searchName + "&pageNum=" + parameters.pageNum + "&pageSize=" + 9,
			"$cookies": $cookies,
			"method": "GET",
			"callbackFunction": function(response) {
//				console.log(response.data);
				$scope.commodities = response.data;
				$scope.pageParams = getPageParams(response.pageNum, response.pages);
				var auth = $.cookie('customId') + ';' + nonce + ';' + generateSign($.cookie('customId'), nonce, $.cookie("customToken"));

				if($scope.commodities !== null && $scope.commodities !== undefined) {
					$scope.commodities.map((commodity) => {
						commodity.commodityImageUrl = HOST_URL + "/images/get/commodities/" + commodity.id + "?authorization=" + auth;
					});
					$scope.showPage = true;
					$scope.showNull = false;
				} else {
					$scope.showPage = false;
					$scope.showNull = true;
				}

			}
		});
	}
	$scope.loadList();
	//点击购买
	$scope.purchase = (commodity) => {
		console.log(commodity);
		$location.url("/commodityInfo#/"+commodity.id);
	}
});