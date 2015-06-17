var path = require('path');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(null,null,null,
                {dialect:"sqlite",storage:"quiz.sqlite"}
            );

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

sequelize.sync().success(function(){
    Quiz.count().success(function(count){

        if(count === 1){ // la tabla solo se inicializa si esta vacia.
            Quiz.create({
                pregunta:'Capital de España',
                respuesta:'Madrid'
            }).success(function(){console.log('Base de datos inicializada')});
        }
    });
});