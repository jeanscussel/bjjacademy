var WebSqlDB = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {

        // This here refers to this instance of the webSqlDb
        var self = this;

        // Open/create the database
        this.db = window.openDatabase("bjjacademydb", "1.0", "BjjAcademy Database", 4 * 1014 * 1024);   
        
        // WebSQL databases are tranaction based so all db querying must be done within a transaction
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('DEBUG - 5. initializeDatabase complete');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        var sqlAluno =
            " create table if not exists alunos ( " +
            "     codalu integer primary key autoincrement not null, " +
            "     nomealu varchar(45) not null, " +
            "     idadealu varchar(15) not null, " +
            "     pesoalu varchar(15) not null, " +
            "     faixaalu varchar(45) not null, " +
            "     fotalu text " +
            " ) ";
        var sqlProfessor =
            " create table if not exists professores ( " +
            "     codprof integer primary key autoincrement not null, " +
            "     nomeprof varchar(45) not null, " +
            "     idadeprof varchar(15) not null, " +
            "     pesoprof varchar(15) not null, " +
            "     faixaprof varchar(45) not null, " +
            "     fotprof text " +
            " ) ";
        
        tx.executeSql(sqlAluno, null,
                function() {            // Success callback
                    console.log('DEBUG - 3. DB Tables created succesfully');
                },
                function(tx, error) {   // Error callback
                    alert('Create table error: ' + error.message);
                });
        tx.executeSql(sqlProfessor, null,
                function() {            // Success callback
                    console.log('DEBUG - 3. DB Tables created succesfully');
                },
                function(tx, error) {   // Error callback
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx) {
        // Array of objects
        var alunos = [
                {"codalu": 1, "nomealu": "Hélio", "idadealu": "85", "pesoalu": "60,75", "faixaalu": "Vermelha",fotalu: "aluno1.png"},
                {"codalu": 2, "nomealu": "Carlson", "idadealu": "55", "pesoalu": "90,75", "faixaalu": "Preta",fotalu: "aluno2.png"},
                {"codalu": 3, "nomealu": "Royson", "idadealu": "39", "pesoalu": "80,75", "faixaalu": "Preta",fotalu: "aluno3.png"},
            ];
        // Array of objects
        var professores = [
                {"codprof": 1, "nomeprof": "Michel", "idadeprof": "42", "pesoprof": "88,25", "faixaprof": "Preta",fotprof: "professor1.png"},
                {"codprof": 2, "nomeprof": "Wado", "idadeprof": "62", "pesoprof": "87,35", "faixaprof": "Preta",fotprof: "professor2.png"},
                {"codprof": 3, "nomeprof": "Augusto", "idadeprof": "34", "pesoprof": "98,25", "faixaprof": "Marrom",fotprof: "professor3.png"},
            ];
        var la = alunos.length;
        var pf = professores.length;

        var sqlA = "INSERT OR REPLACE INTO alunos " +
            " (codalu, nomealu, idadealu, pesoalu, faixaalu, fotalu) " +
            " VALUES (?, ?, ?, ?, ?, ?)";
         var sqlA = "INSERT OR REPLACE INTO professores " +
            " (codprof, nomeprof, idadeprof, pesoprof, faixaprof, fotprof) " +
            " VALUES (?, ?, ?, ?, ?, ?)";
        var a;
        var p;
        
        for (var i = 0; i < la; i++) {
            a = alunos[i];
            tx.executeSql(sqlA, [a.codalu, a.nomealu, a.idadealu, a.pesoalu, a.faixaalu, a.fotalu],
                    function() {            // Success callback
                        console.log('DEBUG - 4. Sample data DB insert success');
                    },
                    function(tx, error) {   // Error callback
                        alert('INSERT error: ' + error.message);
                    });
        }
        for (var i = 0; i < la; i++) {
            a = professores[i];
            tx.executeSql(sqlA, [a.codprof, a.nomeprof, a.idadeprof, a.pesoprof, a.faixaprof, a.fotprof],
                    function() {            // Success callback
                        console.log('DEBUG - 4. Sample data DB insert success');
                    },
                    function(tx, error) {   // Error callback
                        alert('INSERT error: ' + error.message);
                    });
        }
    }
    
    this.findAlunoAll = function(callback) {        
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM alunos";
                tx.executeSql(sql, [], function(tx, results) {
                    var len = results.rows.length,
                        alunos = [],
                        i = 0;

                    // Semicolon at the start is to skip the initialisation of vars as we already initalise i above.
                    for (; i < len; i = i + 1) {
                        alunos[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(alunos);
                });
            },
            function(error) {
                alert("Transaction Error findAll: " + error.message);
            }
        );
    }

    this.findAlunoById = function(codalu, callback) {        
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM alunos WHERE codalu=?";
                tx.executeSql(sql, [codalu], function(tx, results) {
                    // This callback returns the first results.rows.item if rows.length is 1 or return null
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.insertAluno = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
           function (tx) {
                var sql = "INSERT INTO alunos (nomealu, idadealu, pesoalu, faixaalu, fotalu) VALUES (?, ?, ?, ?, ?)";
                tx.executeSql(sql, [parsedJson.nomealu, parsedJson.idadealu, parsedJson.pesoalu, parsedJson.faixaalu, parsedJson.fotalu], function(tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }


    this.deleteAluno = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM alunos WHERE codalu=?";
                tx.executeSql(sql, [parsedJson.codalu], function(tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }
    
    
    
// ------------------------------------ PROFESSOR ----------------------------------------
    
    this.findProfessorAll = function(callback) {        
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM professores";
                tx.executeSql(sql, [], function(tx, results) {
                    var len = results.rows.length,
                        professores = [],
                        i = 0;

                    // Semicolon at the start is to skip the initialisation of vars as we already initalise i above.
                    for (; i < len; i = i + 1) {
                        professores[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(professores);
                });
            },
            function(error) {
                alert("Transaction Error findAll: " + error.message);
            }
        );
    }

    this.findProfessorById = function(codprof, callback) {        
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM professores WHERE codprof=?";
                tx.executeSql(sql, [codprof], function(tx, results) {
                    // This callback returns the first results.rows.item if rows.length is 1 or return null
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.insertProfessor = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
           function (tx) {
                var sql = "INSERT INTO professores (nomeprof, idadeprof, pesoprof, faixaprof, fotprof) VALUES (?, ?, ?, ?, ?)";
                tx.executeSql(sql, [parsedJson.nomeprof, parsedJson.idadeprof, parsedJson.pesoprof, parsedJson.faixaprof, parsedJson.fotprof], function(tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }


    this.deleteProfessor = function(json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM professores WHERE codprof=?";
                tx.executeSql(sql, [parsedJson.codprof], function(tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    }
    
    // inicializando base de dados
    this.initializeDatabase(successCallback, errorCallback);
}