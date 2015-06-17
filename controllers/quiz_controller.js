var models = require('../models/models.js');

exports.load = function(req,res,next,quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }
            else{
                next(new Error('No existe quizId=' + quizId));
            }
        }
    ).catch(function(error){
        next(error);
    });
}

exports.index = function(req,res){

    if (req.query.search !== undefined){
        // Comprobar caracteres...

        console.log("Esta es la busqueda " + req.query.search);

        var textSearch = "%" + req.query.search + "%";
        models.Quiz.findAll({where: ["pregunta like ?", textSearch]}).success(function(quizzes){
            res.render('quizes/index',{quizzes:quizzes})
        });
    }
    else{
        console.log("Va a devolver todos los quizzes");

        models.Quiz.findAll().success(function(quizzes){
            res.render('quizes/index',{quizzes:quizzes})
        });
    } 
}

exports.show = function(req,res){
    res.render('quizes/question',{quiz:req.quiz});
}

exports.answer = function(req,res){

    var rightAnswer = req.quiz.respuesta;
    var resultResponse = rightAnswer === req.query.respuesta?'Correcto':'Incorrecto';
    res.render('quizes/answer', {respuesta:resultResponse,quiz:req.quiz});  
}