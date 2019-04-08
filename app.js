const express = require('express')
const path = require('path')

const met = require('./met')

const port = process.env.PORT || 3000

const app = express()

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/students/:id', function(req, res){
    if(!req.params.id){
        return res.send({
            error: "Se requiere ingresar una matricula."
        })
    }
    res.send({
        id: "A01034988",
        fullname: "David Rojas Ortiz",
        nickname: "Reds",
        age: 25
    })
})

app.get('/met', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    if(!req.query.search){
        return res.send({
            error: "A search keyword must be provided"
        })
    }
    met.getObjectID(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        const obj = response
        met.getObject(obj, function(error, response){
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                searchTerm: req.query.search,
                artist: response.artist,
                title: response.title,
                year: response.year,
                technique: response.technique,
                metUrl: response.metUrl
            })
        })

    })
})

app.get('*', function(req, res){
    res.send({
        error: "Esta ruta no existe."
    })
})

app.listen(port, function(){
    console.log('up and running');
})
