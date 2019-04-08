const request = require('request')

function getObjectID(keyword, callback){
    const srchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + keyword
    request.get(srchUrl, function(error, response){
        if(error){
            callback("Error: Service unavailable", undefined)
        } else{
            let body = JSON.parse(response.body)
            if(body.message == "Not Found"){
                callback("Error: Link is incorrect", undefined)
            } else {
                if(body.total == 0){
                    callback("Error: No objects match with the search criteria", undefined)
                } else {
                    res = body.objectIDs[0]
                    callback(undefined, res)
                }
            }

        }
    })
}

function getObject(id, callback){
    const objUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id
    request.get(objUrl, function(error, response){
        if(error){
            callback("Error: Service unavailable", undefined)
        } else{
            let body = JSON.parse(response.body)
            if(body.message == "ObjectID not found"){
                callback("Error: The required object does not exist", undefined)
            } else{
                var artist
                if(body.constituents == null){
                    artist = null
                } else{
                    artist = body.constituents[0].name
                }
                res = {
                    artist: artist,
                    title: body.title,
                    year: body.objectEndDate,
                    technique: body.medium,
                    metUrl: body.objectURL
                }
                callback(undefined, res)
            }
        }
    })
}

module.exports = {
    getObjectID : getObjectID,
    getObject : getObject
}
