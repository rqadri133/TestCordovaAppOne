app.filter('expressionparse', ['TestFramworkService', function(TestFramworkService) {
    // tableName.ColumnName >|<|==|!= somvalue|tableName.ColumnName OR|AND|==|Equal tableName.ColumnName
    return function (input, uppercase) {
        this.array = [
       { lexicalToken: 'tableName.ColumnName' },
       { lexicalToken: '>|<|==|!=' },
       { lexicalToken: 'somvalue|tableName.ColumnName' },
       { lexicalToken: 'OR|AND|==|Equal' },
       { lexicalToken: 'tableName.ColumnName' },
       { lexicalToken: '>|<|==|!=' },
       { lexicalToken: '>|<|==|!=' },
       { lexicalToken: 'somvalue|tableName.ColumnName' }
   
        ];

        input = input || '';
        var out = '';
        
        var tableNameFirstIndex = input.indexOf(".",0)
        var tableName = input.substring(0,tableNameFirstIndex);

        // the above will get the table Name display hint for columns 
        // allow the space and the give the hint for symbols > then equals to ....
        // get the columnNames from Table and only let him select from it 
        // and then assisting for conditions after that 



        for (var i = 0; i < input.length; i++) {
            out = input.substring(0, input.indexOf(".",0) , + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
}]);
app.filter('getColumns', ['TestFramworkService', function(TestFramworkService) {
    // tableName.ColumnName >|<|==|!= somvalue|tableName.ColumnName OR|AND|==|Equal tableName.ColumnName
    return function (tableName , connectionID) {
        var columns = [];
        return columns;
    };
}]);
