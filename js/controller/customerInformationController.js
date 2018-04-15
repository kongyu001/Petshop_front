app.controller('CustomerInformationController', function($scope, $http, $cookies) {

	//用户信息展示
	$scope.getInfo=function(){
	simplePostData({
		"$http": $http,
		"url": HOST_URL + "/customs",
		"$cookies": $cookies,
		"method": "GET",
		"callbackFunction": function(response) {
   			var auth = $.cookie('customId') + ';' + nonce + ';' + generateSign($.cookie('customId'), nonce, $.cookie("customToken"));
			$scope.customs = response.data;
			$scope.customs.customImageUrl = HOST_URL + "/images/get/"+$scope.customs.customImageId+ "?authorization=" + auth;
		}
	});
	}
	$scope.getInfo();
	
	$scope.changePassword=function(data){
		$('#modifypasswordModal').modal('show');
		$scope.modifypassword={};
	}
	$scope.modifyPasswordClick = function(data) {
		console.log(data);
		if(data.oldPassword===""||data.oldPassword===undefined){
			toastr.info('必须输入原始密码！');
		}else if(data.password === undefined||data.password === ""){
			toastr.info('新密码不可以为空哦！');
		}else if(data.repeatedPassword === undefined||data.repeatedPassword === ""){
			toastr.info('重复密码不可以为空哦！');
		}else if(data.password != data.repeatedPassword) {
			toastr.info('两次输入的新密码不一样！');
		}else if(data.oldPassword==data.password){
			toastr.info('新密码和原始密码不可以一样哦！');
			$scope.modifypassword={};
		}
		else {
			simplePostData({
				"$http": $http,
				"url": HOST_URL + "/customs/modify-password",
				"$cookies": $cookies,
				"data": {
					"data": {
						oldPassword: getPwdEncryptStr(data.oldPassword),
						password: getPwdEncryptStr(data.password),
						repeatedPassword: getPwdEncryptStr(data.repeatedPassword)
					}
				},
				"method": "PUT",
				"callbackFunction": function(response) {
					$('#modifypasswordModal').modal('hide');
					$scope.modifypassword={};
					toastr.success('密码修改成功！5秒后重新跳转登录...');
					var t=setTimeout("window.location='/petshop/login.html#'",5000);
				}
			});
		}
	}
	$scope.charge = function() {
	 	$("#rechargeModal").modal('show');
	 	$scope.recharge=null;
	}
	//账户充值
	$scope.RechargeClick = function(rechargeNumber) {
		console.log(rechargeNumber);
		if(rechargeNumber === "" || rechargeNumber === undefined || rechargeNumber < 0) {
			toastr.info('您还没有填写正确的金额！');
		} else {
			simplePostData({
				"$http": $http,
				"url": HOST_URL + "/customs/recharge",
				"$cookies": $cookies,
				"data": {
					"data": {
						"rechargeNumber": rechargeNumber
					}
				},
				"method": "PUT",
				"callbackFunction": function(response) {
					$('#rechargeModal').modal('hide');
					toastr.success('充值成功！');
					$scope.getInfo();
				}
			});
		}
	}
})