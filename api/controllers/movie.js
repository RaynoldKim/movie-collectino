'use strict;'

//include out 'db'
var db = require('../../config/db')();

module.exports = {getAll, save, getOne, update, delMovie};

//get /movie operationId
function getAll(req, res, next) {
    res.json( {movies: db.find()});
}

//post /movie operationId
function save(req, res, next) {
    res.json( {success: db.save(req.body), description: "Movie added to the list!"});
}

//Get /movie/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var movie = db.find(id);
    if(movie) {
        res.json(movie);
    } else {
        res.status(204).send();
    }
}

//put /movie/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters.
    var movie = req.body;
    if(db.update(id, movie)) {
        res.json( {success: 1, description: "Movie updated!"});
    } else {
        res.status(204).send();
    }
}

//delete /move/{id} operationId
function delMovie(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    
    if(db.remove(id)){
        res.json( {success:1, description: "Movie deleted!"});
    } else {
        res.status(204).send();
    }
}

