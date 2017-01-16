
'use strict';


var app;
(function () {

    app = angular.module("TFApp", ['ng','ngResource','ngMaterial', 'ngMessages' ]).run(function ($rootScope) {

        $rootScope.IsLogin = false;
        $rootScope.parentObj = {};
        $rootScope.parentObj.afterLogin = false;
        $rootScope.parentObj.beforeLogin = true;

        $rootScope.users = [];
      
        
        $rootScope.testRobotTypes = [];
        $rootScope.showMap = true;
        $rootScope.showTestModel = false;
        $rootScope.token = null;
        $rootScope.ValidationCommonThread = [];
        $rootScope.expressionAuthCode = ""  ;
        $rootScope.UserID = "";

        $rootScope.ValidationExpressions = {
            expressionbuilderObj: $rootScope.ValidationCommonThread,
            expressionAuthentication: $rootScope.expressionAuthCode 
            
        };

        $rootScope.testTypes = [];

        $rootScope.testConnectionTypes = [];

    
        $rootScope.testConnectionsAll = [];

        $rootScope.testTableSources = [];

        $rootScope.testMicronTypes = [];


        $rootScope.testColumnsSources = [];
        $rootScope.testOperands = [];
        

        $rootScope.testConnectionObj = {
            TestConnectionTypeID: "",
            TestConnectionName: "",
            TestConnectionString: "",
            CreatedBy: ""
        };

        

    });
    app.config(function ($httpProvider,  $resourceProvider) {
        $httpProvider.defaults.headers.common['Authorization'] = 'Token AIzaSyC-zA3jAtEGij5SZNYypmWNo4UvilDeiXQ'
        $resourceProvider.defaults.stripTrailingSlashes = false;


    });

    app.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                    
                });
            }
        };
    });



}

        )();


