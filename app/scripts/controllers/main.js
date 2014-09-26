'use strict';
var testbedApp = angular.module('testbedsApp');
testbedApp.directive('loading', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$watch('loading', function (val) {
                if (val) {
                    element.show();
                } else {
                    element.hide();
                }
            });
        }
    };
});
testbedApp.factory('TestbedData', function ($resource) {
        var data;
        var profiles;
        var hostsResource = $resource('http://10.121.72.212/testbedmonitor/status_json.php?hosts', {}, {
            get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true}
        });
        var profileResource = $resource('http://10.121.72.212/testbedmonitor/status_json.php?all-profiles', {}, {
            get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true}
        });
        var vmResource = $resource('http://10.121.72.212/testbedmonitor/status_json.php', {}, {
            get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray:true}
        });
        return {
            getHosts: function () {
                if (data) {
                    //console.log('returning cached data');
                    return data;
                } else {
                    //console.log('getting hosts from server');
                    data = hostsResource.get();
                    return data;
                }
            },
            getProfiles: function () {
                if (profiles) {
                    //console.log('returning cached profiles');
                    return profiles;
                } else {
                    //console.log('getting profiles from server');
                    profiles = profileResource.get();
                    return profiles;
                }
            },
            getVmHosts: function(host){
                return vmResource.get(host);
            }
        };
    }
);
testbedApp.controller('NavbarCtrl', function ($scope, $location, TestbedData) {
    $scope.hosts = TestbedData.getHosts();
    $scope.isActive = function (route) {
        return '/testbeds/' + route === $location.path();
    };
});
testbedApp.controller('MainCtrl', function ($scope, $http, TestbedData) {
    $scope.loading = true;
    $scope.profiles = TestbedData.getProfiles();
    $http.jsonp('http://10.121.72.212/testbedmonitor/status_json.php?callback=JSON_CALLBACK&disk').success(function (data) {
        $scope.loading = false;
        $scope.disks = data;
    });
});
testbedApp.controller('TestbedListCtrl', function ($scope, $http, TestbedData) {
    $scope.hosts = TestbedData.getHosts();
});
testbedApp.controller('TestbedDetailCtrl', function ($scope, $routeParams, $http, TestbedData) {
    $scope.testbedId = $routeParams.testbedId;
    TestbedData.getHosts().$promise.then(function (result) {
        $scope.host = result.filter(function (host) {
            return host.hostname === $scope.testbedId;
        });
    });
    TestbedData.getProfiles().$promise.then(function (result) {
        $scope.profiles = result.filter(function (profile) {
            return profile.setup.MAIN.vmhost === $scope.testbedId;
        });
    });
    $scope.statusColor = function (status) {
        switch (status) {
            case 'running':
                return 'label-success';
            case 'blocked':
                return 'label-success';
            case 'paused' || 'shutdown' || 'dying':
                return 'label-warning';
            case 'down' || 'crushed':
                return 'label-danger';
            default:
                return 'label-default';
        }
    };
    $scope.parseIpAdress = function(ipString){
        var ipRegex = /(\d+)\.(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?(?::(\d+))?/ig;
        var ipParts = ipRegex.exec(ipString);
        if( ipParts && ipParts.length > 6 ){
            return 'http://'+ipParts[1]+'.'+ipParts[2]+'.'+192+'.'+(parseInt(ipParts[3])+10);
        }else{
            return '#';
        }
    };
    $scope.loadData = function(){
        $scope.loading = true;
        TestbedData.getVmHosts({ host: $routeParams.testbedId }).$promise.then(function(data){
            $scope.profiles.forEach(function (profil){
                for (var i in profil.setup){
                    if(profil.setup[i].servername){
                        data.some(function(testbed){
                            if (profil.setup[i].servername === testbed.hostname) {
                                if(profil.setup[i].__name__.lastIndexOf('ADM', 0) === 0){
                                    testbed.link = 'https://'+profil.setup[i].ipaddress+':8443/dbmcntdb/';
                                }else{
                                    testbed.ipaddress = profil.setup[i].ipaddress;
                                }
                                testbed.profile = profil.profile.split('/').reverse()[0];
                                testbed.owner = profil.setup.MAIN.owner;
                                return true;
                            }
                        });
                    }
                }
            },function(data){
                $scope.loading = false;
                $scope.host.status = 'down.';
                $scope.$apply();
                console.log('Request failed: '+data);
            });
            $scope.loading = false;
            $scope.testbeds = data;
        });
    };
    $scope.loadData();
    window.scope = $scope;
});