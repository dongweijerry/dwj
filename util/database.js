/**
 * Created by 威 on 2016/9/17.
 */
// var pg = require("pg");
// var conString = "tcp://postgres:dw2587758@localhost/dwj";
// var getConnection = function(callback){
//     var client = new pg.Client(conString);
//     client.connect(function(){
//         if(callback)callback(client);
//     });
// }
// var dropTable = function(table){
//     getConnection(function(client){
//         var dropSql = "drop table if exists "+table+";"
//         client.query(dropSql,function(){
//             client.end();
//         });
//         console.log(dropSql)
//     });
// }
// var init =function(){
//     getConnection(function(client){
//         var db_table = require("../db_table.json");
//         var tableSql = "";
//         var fields;
//         var fieldsSql;
//         for (var table in db_table){
//             fieldsSql=[];
//             // dropTable(table);
//             fields = db_table[table].fields;
//             tableSql = "create table if not exists "+table+"(id serial primary key";
//             for(var field in fields){
//                 tableSql+=","+field+" "+fields[field];
//             }
//             tableSql+=");"
//             client.query(tableSql,function(){
//                 client.end();
//             });
//             console.log(tableSql);
//         }
//
//     });
//
// }
// init();
// exports.getConnontion=getConnection;
var Sequelize = require('sequelize');
var Q = require("q");
var sequelize = new Sequelize('postgres://postgres:dw2587758@localhost:5432/dwj');

var init =function(){
    var User = sequelize.define('user', {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true
    });

    User.sync({force: true}).then(function () {
        // Table created
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });

    // user = User.findOne()
    //
    // console.log(user.get('firstName'));
}

init();
