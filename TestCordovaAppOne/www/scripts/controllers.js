app.controller('googleController', function ($scope, $http, $rootScope, TestFramworkService) {

    
    $scope.updateScreen = function () {
        
        $rootScope.showMap = false;
        $rootScope.showTestModel = true;
    }


});

app.controller('LoginController', function ($scope, $http, $rootScope, TestFramworkService) {
  
    // its tokenization based so the service dependency injection applied
    // Offline Testing 


    $scope.selectedClassPropertyType = "";

    /*
    $scope.testParameters = [
       { TestParamTypeName: 'Character', Operation: 'Allowed only Characters', PrecesionAllowed: false, LengthAllowed: true },
       { TestParamTypeName: 'NVarchar', Operation: 'NVarchar as Alpha Numeric', PrecesionAllowed: false, LengthAllowed: true },
       { TestParamTypeName: 'Decimal', Operation: 'Decimal floating Values', PrecesionAllowed: true, LengthAllowed: false },
       { TestParamTypeName: 'Integer', Operation: 'Non Decimal Numbers', PrecesionAllowed: false, LengthAllowed: false }

    ];
    */

    $scope.testParameters = [];
    $scope.testClassPropTypes = [];
    var addTestParametersType = TestFramworkService.getTestParameters();


    addTestParametersType.then(function (d) {

        $scope.testParameters = d.data;
        $scope.testClassPropTypes = d.data;

    });

    // the above is just for test reasons 
    // the below is for any property defined for Class
    $scope.testClassPropTypes = [
       { TestClassPropTypeName: 'Character', Operation: 'Allowed only Characters', PrecesionAllowed: false, LengthAllowed: true },
       { TestClassPropTypeName: 'NVarchar', Operation: 'NVarchar as Alpha Numeric', PrecesionAllowed: false, LengthAllowed: true },
       { TestClassPropTypeName: 'Decimal', Operation: 'Decimal floating Values', PrecesionAllowed: true, LengthAllowed: false },
       { TestClassPropTypeName: 'Integer', Operation: 'Non Decimal Numbers', PrecesionAllowed: false, LengthAllowed: false }

    ];

    // Separation of Concern Model , A Model is away from any concern
    $scope.testProperties = [

        { testPropertyName: 'Dummy', testPropertyType: 'Dummy', Length: 0, PrecesionAllowed: false, ClassName: 'TestModel' }

    ];

    $scope.testClassName = "";
    $scope.testClasses = [];

    $scope.addProperty  = function(className)  
    {
        $scope.testProperties.push({
            testPropertyName: 'Dummy', testPropertyType: 'Dummy', Length: 0, PrecesionAllowed: false, ClassName: className
            
        });

        $scope.showPropertyWindow = true;

    }
      

    $scope.showLengthParam = true;
    $scope.showDecPlaces = false;
    $scope.showPropertyWindow = false;
    $scope.valueNeeded = true;
    $scope.showClassWindow = false;

    $scope.updateParamType = function(selectedParamType)
    {
        for (var i=0 ;  i < $scope.testParameters.length ; i++)
        {
            if ($scope.testParameters[i].TestScriptParameterTypeName == selectedParamType)
            {
                //public Nullable<bool> IsClass { get; set; }
                //public Nullable<bool> IsPrecisionAllowed { get; set; }

                if ($scope.testParameters[i].IsPrecisionAllowed == false) {
                    $scope.showDecPlaces = false;
                }
                else
                {
                    $scope.showDecPlaces = true;

                }

                if ($scope.testParameters[i].IsClass == false) {
                    $scope.showPropertyWindow = false;
                    $scope.showLengthParam = false;
                    $scope.showClassWindow = false;
                }
                else {

                    $scope.showPropertyWindow = false;
                    $scope.showClassWindow = true;
                    $scope.showLengthParam = false;
                    $scope.showDecPlaces = false;
                    $scope.valueNeeded = false;


                }
 
                break;

            }



        }




    }


    $scope.testConTypeInfo = "";
        $scope.testTypeName = "";
    var token = {
        AuthenticationToken: $rootScope.UserID
    };
      
    $scope.addTestType = function () {
        $scope.typeSaved = "";

        var testType = {

            TestTypeName: $scope.testTypeName
        };
        var addTestType = TestFramworkService.addTestTypes(testType);

        addTestType.then(function (d) {

            $scope.typeSaved = "Test Type Saved";

             tokenObj = {
                AuthenticationToken: $rootScope.UserID
            };
            var testtypes = TestFramworkService.getTestTypes(tokenObj);

            testtypes.then(function (d) {
                $rootScope.testTypes = d.data; 
            }, function (error) {
                console.log('Oops! Something went wrong while saving the data.');


            });

        });

    }

    $scope.addConnectionType = function () {

        var testConnectionType = {
            
            TestConnctionTypeName: $scope.testConTypeInfo ,
            CreatedBy : $rootScope.UserID  
        };

        var addConnType = TestFramworkService.addTestConnectionType(testConnectionType);


        addConnType.then(function (d) {

            $scope.typeSaved = "Test Connection Type Saved";

            tokenObj = {
                AuthenticationToken: $rootScope.UserID
            };


            var testcontypes = TestFramworkService.loadAllConnectionTypes(tokenObj);

            testcontypes.then(function (d) {
                $rootScope.testConnectionTypes = d.data;
            }, function (error) {
                console.log('Oops! Something went wrong while saving the data.');


            });

        });

    }


    $scope.login = function () {

       /* test the screen only */
        var userInfo = {
            UserName: $scope.txtUserID,
            Pwd: $scope.txtPwd
        };


     
        var userinformation = TestFramworkService.loginInfo(userInfo);
       
        userinformation.then(function (d) {

         
            $rootScope.UserID = d.data.UserID;

               var token = {
            AuthenticationToken: $rootScope.UserID
        };


            if ($rootScope.UserID != "") {
                     

               var testConnections = TestFramworkService.loadAllConnections(token);

               testConnections.then(function (d) {
                      $rootScope.testConnectionsAll = d.data;
                      $scope.expressionObj.TestConnectionSourceID = d.data[0].TestConnectionID;

                }, function (error) {
                    console.log('Oops! Something went wrong while saving the data.');
                });

               var testRobotTypes = TestFramworkService.loadAllTestRobotTypes(token);

              testRobotTypes.then(function (d) {
                   $rootScope.testRobotTypes = d.data;
                   $scope.testRobotTypeID = d.data[0].TestRobotTypeID;

               }, function (error) {
                   console.log('Oops! Something went wrong while saving the data.');
               });

              var testMicronsTypes = TestFramworkService.loadAllTestMicrons(token);

              $scope.testMicron = "";
              testMicronsTypes.then(function (d) {
                  $rootScope.testMicronTypes = d.data;
                  $scope.testMicron = d.data[0].TestMicroControllerID;

              }, function (error) {
                  console.log('Oops! Something went wrong while saving the data.');
              });





            }






            $rootScope.parentObj.beforeLogin = false;
            $rootScope.parentObj.afterLogin = true;
            $rootScope.users = d.data.AllUsers;
       

        

        

            var testcontypes = TestFramworkService.loadAllConnectionTypes(token);

             testcontypes.then(function (d) {
             $rootScope.testConnectionTypes = d.data;

             $rootScope.testConnectionObj.TestConnectionTypeID = d.data[0].TestConnectionTypeID;


            }, function (error) {
                console.log('Oops! Something went wrong while saving the data.');


            });

             var testtypes = TestFramworkService.getTestTypes(token);

             testtypes.then(function (d) {
                 $rootScope.testTypes = d.data;
            }, function (error) {
                 console.log('Oops! Something went wrong while saving the data.');


             });




        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        });
    };

    
    


});






app.controller('DemoController', function ($scope, $http, $rootScope, TestFramworkService) {

    $scope.showDemo = true;

    $scope.addUserInformation = function () {

        var userInfo = {
            LoginName: $scope.loginName,
            PasswordHash: $scope.txtPwd,
            EmailAddress: $scope.emailAddress,
            PhoneNumber: $scope.phoneNumber,
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            CompanyName: $scope.companyName,
            CompanyWebSite: $scope.companyWebsite

        };



        

        var userinformation = TestFramworkService.saveUser(userInfo);
        userinformation.then(function (d) {
            var userToken = d.data.UserID; 
            $scope.showDemo = false;
            $scope.loginName = "";
            $scope.txtPwd = "";
            $scope.emailAddress = "";
            $scope.phoneNumber = "";
            $scope.firstName = "";
            $scope.lastName = "";
            $scope.companyName = "";
            $scope.companyWebsite = "";






            $scope.demoMessage = "You are now all set we will send you an email details after company and profile verification";
               
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
            $scope.demoMessage = "Sorry you missed out some information";

        })
    };

});


/*
 this.loadAllConnectionTypes = function (tokenObj) {
        return $http(
          {
              method: 'post',
              data: tokenObj,
              url: 'testconnectiontype/LoadAll'
          });
    };

*/


app.controller('TestCaseController', function ($scope, $http, $rootScope, TestFramworkService) {
    /* test the screen only */

    $scope.testCycleDate = null;
    $scope.testTypesAll = [];
    
    

     $scope.txtTestCaseName ="";
     $scope.testCycleDate = "";
     $scope.selectedTestType = "";

     
    $scope.addTestCase = function () {

    
        var testproxy = {
            TestCaseDescName: $scope.selTestCaseDescName,
            CreatedDate: $scope.selExecutionDate,
            CreatedBy: $rootScope.UserID,
            TestTypeID: $scope.selTestTypeID
        }

        
        /* test the screen only */

        var testcaseinformation = TestFramworkService.saveTestCaseInfo(testproxy);

        testcaseinformation.then(function (d) {

            $rootScope.parentObj.beforeLogin = false;
            $scope.testCaseCreationMessage = "Successfully Created Test Case , The Next Step to assign expression or multiple expressions to Test Case with a order sequence"
            $rootScope.parentObj.afterLogin = true;

        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        });
    };

    $scope.addTestCase = function () {

    
        var testproxy = {
            TestCaseDescName: $scope.selTestCaseDescName,
            CreatedDate: $scope.selExecutionDate,
            CreatedBy: $rootScope.UserID,
            TestTypeID: $scope.selTestTypeID
        }

        
        /* test the screen only */

        var testcaseinformation = TestFramworkService.saveTestCaseInfo(testproxy);

        testcaseinformation.then(function (d) {

            $rootScope.parentObj.beforeLogin = false;
            $scope.testCaseCreationMessage = "Successfully Created Test Case , The Next Step to assign expression or multiple expressions to Test Case with a order sequence"
            $rootScope.parentObj.afterLogin = true;

        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        });
    };




});




app.controller('TestConnectionController', function ($scope, $http, $rootScope, TestFramworkService) {
    /* test the screen only */

    $scope.testConnectionMessage = "";

    $scope.showSuccessCon = true;
    $scope.showFailedCon = false;
    
    $scope.addTestConnection = function (testConnectionObj) {

        /* test the screen only */
        testConnectionObj.CreatedBy = $rootScope.UserID;
        var testconinformation = TestFramworkService.saveTestConnectionInfo(testConnectionObj);
        testcaseinformation.then(function (d) {

            $rootScope.parentObj.beforeLogin = false;
            $scope.testConnectionMessage = "Successfully Created Test connection , The Next Step to create a test script from defined connections"
            $rootScope.parentObj.afterLogin = true;
           
       
            $scope.showSuccessCon = true;
            $scope.showFailedCon = false;


        }, function (error) {

            $rootScope.testConnectionMessage = "Failed to create test connection";
            $rootScope.showSuccessCon = false;
            $rootScope.showFailedCon = true;


            console.log('Oops! Something went wrong while saving the data.')
        });
    };





});



app.controller('TestExpressionController', function ($scope, $http, $rootScope, TestFramworkService) {
    /* test the screen only */

    $scope.selTestTypeID = "";
    $scope.showExpression = false;
    $scope.evaluatedxpression = "";

    $scope.selTestConnectionID = "";
    $scope.allTables = [];
    $scope.removeSelected = false;
    $scope.testOperands = [
    { Operand: '>', Operation: 'Greater Then' },
    { Operand: '<', Operation: 'Less Then' },
    { Operand: '==', Operation: 'Equal' },
    { Operand: '<=', Operation: 'Less Then Equal' },
    { Operand: '>=', Operation: 'Greater Then Equal' }
    ];


    var index = 0;
    $scope.counterConditions = [
       { selTestTableID: '', counter: index, ConditionRepeat: '', selTestColumnID: '', selTestAndOrID: '', selTestOperandID: $scope.testOperands[0].Operand , checkthisValue: 0, testColumns: [{ TestColumnID: '34343434', TestColumnName: 'KUWEWE' ,dataTypeAllowed : "Text"  , maxlength : 0   }] , selectedDataType :"nvarchar" , maxlength : 0 }];
    

 
     $scope.testTables =  [
       { TestTableID: '21313UREUREERERRER13', TestTableName: 'Select Table Name' }
    ];
    

    $scope.selTestTableID = null;
    $scope.selTestColumnID = null;
    $scope.checkthisValue = "";
    

    $scope.testOperands = [
       { Operand: '>', Operation: 'Greater Then' },
       { Operand: '<', Operation: 'Less Then' },
       { Operand: '==', Operation: 'Equal' },
       { Operand: '<=', Operation: 'Less Then Equal' },
       { Operand: '>=', Operation: 'Greater Then Equal' }
    ];

    $scope.selTestOperandID = $scope.testOperands[0].Operand;

    $scope.testLogicals = [
       { lexicalToken: 'AND' , Operation: 'AND CONDITION' },
       { lexicalToken: 'OR' ,  Operation: 'OR CONDITION'  },
       { lexicalToken: '||'  , Operation: 'OR CONDITION'  },
       { lexicalToken: '&&',   Operation: 'AND OPERATION' },
       { lexicalToken: '==' ,  Operation: 'AND OPERATION' }
    ];



    
    $scope.selTestAndOrID = $scope.testLogicals[0].lexicalToken;

    $scope.complexExression = "";
    $scope.showStepOne = true;
    $scope.showStepTwo = false;


    $scope.showComplexExpression = false;



    $scope.updateOperand = function (selTestOperandID, counter) {






    };


    $scope.addCondition = function (Add) {
        index = index + 1;
        var values = $scope.counterConditions;
        var _newexpression = "";
        for (var i = 0; i < values.length ; i++) {
                if(i==0)
                {
                    _newexpression = $scope.counterConditions[i].selTestTableID + "." + $scope.counterConditions[i].selTestColumnID + " " + $scope.counterConditions[i].selTestOperandID + " " + $scope.counterConditions[i].checkthisValue;
                }
                else 
                {
                    _newexpression = "( " + _newexpression + " ) " + Add + " ( " + $scope.counterConditions[i].selTestColumnID + "." + $scope.counterConditions[i].selTestTableID + " " + $scope.counterConditions[i].selTestOperandID + " " + $scope.counterConditions[i].checkthisValue + " ) "
                }
               
            

        }

        $scope.evaluatedxpression = _newexpression;
        $scope.showComplexExpression = true;


        $scope.counterConditions.push({
            selTestTableID: '', counter: index, ConditionRepeat: '', selTestColumnID: '', selTestAndOrID: '', selTestOperandID: $scope.testOperands[0].Operand , checkthisValue: 0, testColumns: [{ TestColumnID: '34343434', TestColumnName: 'KUWEWE', dataTypeAllowed: "Text" , maxlength :0 }] ,  selectedDataType :"nvarchar" , maxlength : 0

        });


    };
    
    $scope.showRemove = false;


    


    $scope.callUpdate = function (chkRemoved, counter) {

        $scope.counterConditions[counter].checkthisValue = chkRemoved;
        var _in = false;

        var index = 0;
        var values = $scope.counterConditions;
        for (var i = 0; i < values.length ; i++)
        {
            if (values[i].checkthisValue == true)
            {
                _in = true;
            }
 
        }
          $scope.showRemove = _in ;

           
       
    };



    $scope.generateScript = function (counterConditions) {
         var icounter = 0;
        

    };


    $scope.addDataSource = function () {

        $scope.showStepOne = true;
        $scope.showStepTwo = false;
        $scope.testTables = [];
        $scope.testColumns = [];
    };

    $scope.nextStep = function () {

        var selectedConnectionID = $scope.selTestConnectionID;

        var token = {
            AuthenticationToken: $rootScope.UserID,
            ConnectionStr: $scope.selTestConnectionID,
            ConnectionID: $scope.selTestConnectionID
        };

        var testtables = TestFramworkService.loadAllTablesFromDB(token);

        $scope.showStepOne = false
        $scope.showStepTwo = true

        $scope.showComplexExpression = false;
         


        testtables.then(function (d) {

            $scope.testTables = d.data.TestTables;
            $rootScope.selTestTableID = d.dataTestTables[0].TestTableName;

        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.');
            
        });


    };

    var expectDataType = function (expectedColumns, key) {
            expectedColumns.forEach(function (wd, i) {
                expect(wd.getText()).toMatch(key);
            });
        
    };


    $scope.updateColumn = function (selTestColumn,selOperand, counter) {
        // for now just update column and later display readonly corresponding  datatype to know what value is allowed 
        // also once value entered and mouse leave on key down display not a valid data type vaue entered value entered here is different 
        $scope.counterConditions[counter].selTestColumnID = selTestColumn;
        $scope.counterConditions[counter].selTestOperandID = selOperand;


               

        for (var i = 0; i < $scope.counterConditions[counter].testColumns.length ; i++) {
                   
            if( $scope.counterConditions[counter].testColumns[i].TestColumnName == selTestColumn) 
            {
                $scope.counterConditions[counter].selectedDataType = $scope.counterConditions[counter].testColumns[i].TestColumnType
                $scope.counterConditions[counter].maxlength = $scope.counterConditions[counter].testColumns[i].MaxLengthAllowed 

            }

        }


   
    };

    $scope.updateOperand = function (Operand, counter) {
        // for now just update column and later display readonly corresponding  datatype to know what value is allowed 
        // also once value entered and mouse leave on key down display not a valid data type vaue entered value entered here is different 
        $scope.counterConditions[counter].selTestOperandID = Operand;

    };





    $scope.loadColumns = function (selectedTableName, counter) {


        var token = {

            AuthenticationToken: $rootScope.UserID,
            ConnectionStr: $scope.selTestConnectionID,
            ConnectionID: $scope.selTestConnectionID,
            TableName: selectedTableName
            
        };

        $scope.counterConditions[counter].selTestTableID = selectedTableName;
        var testtableColumns = TestFramworkService.loadAllColumnsFromTbl(token);

        testtableColumns.then(function (d) {
            $scope.counterConditions[counter].testColumns = d.data.TestColumns;


   
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.');

        });


    };

});


app.controller('TestRobotController', function ($scope, $http, $rootScope, TestFramworkService) {
    /* test script  screen only */
     // the expression will be send from this controller to Service to generate script
    
    var index = 0;

    $scope.selTestRobotTypeID = "";
    //https://taco.visualstudio.com/en-us/docs/get-started-first-mobile-app/

    $scope.selTestRobotName = "";

    $scope.showActions = false;

    $scope.allActions = [
       { selTestActionName: 'Define Any Action', counter: index, selTestClassForAction: 'Class Name', selTestActionSequence: '0'}];


    $scope.addAction = function()
    {
        index = index + 1;
        $scope.showActions = true;
        
        $scope.allActions.push({
            selTestActionName: 'Define Any Action', counter: index, selTestClassForAction: 'Class Name', selTestActionSequence: '0'

        });

    }


});



