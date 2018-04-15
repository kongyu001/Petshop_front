app.controller('IndexController', function ($scope, $http, $location, $cookies) {
    $scope.getNavItemClass = function (path) {
        var url = $location.url();
        if (url === "/") {
            url = "/";
        }
        if (url === "/product_detail") {
            url = "/product"
        }
        if (url === path) {
            //TODO: 加载页面时会频繁触发，为什么？
            return "active";
        }
        return "";
    };
    //判断是否已登录
    var customToken = $cookies.get("customToken");
    $scope.customName = $cookies.get("customName");

    if (customToken === undefined) {
        window.location.href = "login.html";
    }

    if (customToken !== null) {
        $scope.userHasLogin = true;
    } else {
        $scope.userHasLogin = false;
        window.location.href = "login.html";
    }

    //登出操作
    $scope.logout = function () {
        console.log('logout');
        simplePostData({
            "$http": $http,
            "url": HOST_URL + "/logout",
            "$cookies": $cookies,
            "method": "GET",
            "callbackFunction": function (response) {
                $cookies.remove("customToken");
                $cookies.remove("customId");
                nonce = undefined;
                window.location.href = "login.html";
            }
        });
    }
});