    var app = angular.module('devices', []);
    var clientPath = "";
    var simpleServicePath = "http://localhost:8080/simpleservice/webapi/";
    var simpleServiceDevicePath = "http://localhost:8080/simpleservice/webapi/clients/";
    var simpleClientPath = "http://localhost:8081/LWM2MClient/webapi/clients/";


    app.controller('devicecontroller', function($scope) {
            var init = function(){
                var count = 0;
                /*
                    $.ajax({
        url: simpleClientPath + "count",
        type: "GET",
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        //	crossDomain : true,
        async : false,
        success: function(response) {
                        count = response.count;
            console.log(response);   
        },
        error: function(jqxhr, status, errorMsg) {
            alert('Failed! ' + errorMsg);
        }
        });
        */
        count = 5;
                $scope.items = [1,2,3,4,5];
            $scope.showBootstrap = [];
    $scope.showRegister = [];
    $scope.showDeregister = [];
    $scope.showUpdate = [];
        $scope.showUpdateInfo = [] ;
        $scope.updateInfo = [];

    for (var i = 0; i < count; i++) {
        $scope.showBootstrap.push(true);
        $scope.showRegister.push(true);
        $scope.showDeregister.push(false);
        $scope.showUpdate.push(false);
        $scope.showUpdateInfo.push(false);
        $scope.updateInfo.push("");
    }
/*
    for(var i=0;i<count;i++)
    {
        if isbootstrapped(deviceId)
        {
            hide bootstrap
         if isRegistered(deviceId)
            show update,updateInfo,dregister
         else
            show register,updateInfo + hide deregister
        }
        else
            show bootstrap , hide others
    }
        */
};
                   
    var isRegistered = function(deviceId)
    {
        var isReg = false;
        var registration_info = "";
                         $.ajax({
                    //url: simpleServicePath  +"register/"+String(deviceId),
                    url : "http://localhost:8080/simpleservice/webapi/register/" + String(deviceId),
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async : false,
                jsonpCallback: 'jsonpCallback',
                success: function(response) {
                    console.log("Deleted Successfully");
                    if(response.registration_info !== "null")
                        {
                            isReg = true;
                        }  
                },
                error: function(jqxhr, status, errorMsg) {
                    console.log("Did not insert");
                    alert('Failed! ' + errorMsg);
                },
                complete: function(response){
                    success2 = 1;
                    console.log(response);
                }
            });
            return isReg;
    }

    init();
    /*
    items = [1, 2];
    $scope.items = items;
    $scope.showBootstrap = [];
    $scope.showRegister = [];
    $scope.showDeregister = [];
    $scope.showUpdate = [];
        $scope.showUpdateInfo = [] ;
        $scope.updateInfo = [];
    var i;
    for (i = 0; i < items.length; i++) {
        $scope.showBootstrap.push(true);
        $scope.showRegister.push(true);
        $scope.showDeregister.push(false);
        $scope.showUpdate.push(false);
        $scope.showUpdateInfo.push(false);
        $scope.updateInfo.push("");
    }
    */
    var bootstrapInfo = "";
    var success = 0;
    $scope.bootstrap = function(deviceId) {
    //alert(items[0]);

    $.ajax({
        url: simpleServiceDevicePath + String(deviceId),
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: 'jsonpCallback',
        //async : false,
        success: function(response) {
            bootstrapInfo = response;
            console.log(response);
            $.ajax({
                url: simpleClientPath + String(deviceId),
                type: "POST",
                data: JSON.stringify(
                    bootstrapInfo),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async : false,
                success: function(response) {
                    console.log(response);
                    success = 1;
                    console.log($scope.showBootstrap[deviceId - 1]);
                },
                error: function(jqxhr, status, errorMsg) {
                    alert('Failed! ' + errorMsg);
                }
            });
        },
        error: function(jqxhr, status, errorMsg) {
            alert('Failed! ' + errorMsg);
        }
    });

    if (success === 1) {
        $scope.showBootstrap[deviceId - 1] = false;
        $scope.showRegister[deviceId - 1] = true;
        $scope.showUpdate[deviceId-1] = false;
        $scope.showUpdateInfo[deviceId-1] = true;
        $scope.showDeregister[deviceId-1] = false;
    }
    }

    $scope.register = function(deviceId,updateInfo) {
    var success2 = 0;
    var success1 = 0;
    var bootstrap_info = "";
    var client_id = "";
    var device_id = "";
    $.ajax({
        url: simpleClientPath + String(deviceId),
        type: "GET",
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        //	crossDomain : true,
        async : false,
        success: function(response) {
            console.log(response);
            success1 = 1;
            bootstrap_info = response.bootstrap_info;
            client_id = response.client_id;
            device_id = response.device_id;
        },
        error: function(jqxhr, status, errorMsg) {
            alert('Failed! ' + errorMsg);
        }
    });
    console.log("client_id : "+client_id);
    console.log("device_id : " +device_id);
    console.log("bootstrap_info" + bootstrap_info);
        registration_info = updateInfo;        
    console.log(registration_info);
    console.log("success1 : " + success1);
    if(success1 === 1)
        {
                $.ajax({
                    //url: simpleServicePath  +"register/"+String(deviceId),
                    url : "http://localhost:8080/simpleservice/webapi/register",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async : false,
                data : JSON.stringify({"client_id":client_id, "device_id":device_id, "bootstrap_info":bootstrap_info, "registration_info" :registration_info}),
                jsonpCallback: 'jsonpCallback',
                success: function(response) {
                    console.log("Inserted Successfully");
                    success2 = 1;
                },
                error: function(jqxhr, status, errorMsg) {
                    console.log("Did not insert");
                    alert('Failed! ' + errorMsg);
                },
                complete: function(response){
                    success2 = 1;
                    console.log(response);
                }
            });
        }
        console.log("success2 : "+success2);
    if (success2 === 1) {
        console.log("success");
        $scope.showRegister[deviceId - 1] = false;
        $scope.showDeregister[deviceId - 1] = true;
        $scope.showUpdate[deviceId-1] = true;
        $scope.showUpdateInfo[device_id-1] = true;
    }
    } 

    $scope.deregister = function(deviceId) {
                        $.ajax({
                    //url: simpleServicePath  +"register/"+String(deviceId),
                    url : "http://localhost:8080/simpleservice/webapi/register/" + String(deviceId),
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async : false,
                jsonpCallback: 'jsonpCallback',
                success: function(response) {
                    console.log("Deleted Successfully");

                },
                error: function(jqxhr, status, errorMsg) {
                    console.log("Did not insert");
                    alert('Failed! ' + errorMsg);
                },
                complete: function(response){
                    success2 = 1;
                    console.log(response);
                }
            });
    $scope.showDeregister[deviceId - 1] = false;
    $scope.showUpdate[deviceId-1] = false;
        $scope.showRegister[deviceId-1] = true;
        $scope.showBootstrap[deviceId - 1] = false; 
        $scope.showUpdateInfo[deviceId-1] = true;
    }

    $scope.update = function(device_id,updateInfo)
    {   
        console.log("updateInfo : "+updateInfo);

               $.ajax({
                    //url: simpleServicePath  +"register/"+String(deviceId),
                url : "http://localhost:8080/simpleservice/webapi/register/" +String(deviceId),
                type: "PUT",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async : false,
                jsonpCallback: 'jsonpCallback',
                data : JSON.stringify({"updateInfo" : updateInfo}),
                success: function(response) {
                    console.log("Deleted Successfully");

                },
                error: function(jqxhr, status, errorMsg) {
                    console.log("Did not insert");
                    alert('Failed! ' + errorMsg);
                }
            });  
        $scope.showUpdateInfo[device_id-1] = "";
    /*
    $scope.showDeregister[deviceId - 1] = false;
    $scope.showUpdate[deviceId-1] = false;
        $scope.showRegister[deviceId-1] = true;
        $scope.showBootstrap[deviceId - 1] = false; 
        */
    }

    });
