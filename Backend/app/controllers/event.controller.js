const Event = require('../models/Event');

function eventList (cb){
    Event.find().lean().exec(function(err, events){
        if (err) {
            cb(err);
        } else {
            cb(err, events);
        }
    }) 
}


function eventGet (id, cb) {
    Event.findById(id).exec(function(err, event){
        
        if(err) {
            cb(err);
        } else {
            cb(null, event);
        }

    })
}

function eventAdd(data, cb) {

    let newEvent = new Event (data)
    
       newEvent.save(function(err, event){

        if(err) {
            cb(err);
        } else {
            cb(null, event);
        }
 
        });
}

function eventUpdate(id, data, cb) {
    Event.updateOne({_id: id}, data, function(err, event) {
 
        if(err) {
            cb(err);
        } else {
            cb(null, event);
        }
 
    });
}

function eventDelete(id, cb) {
    Event.deleteOne({_id: id},function (err, event) {
        if (err) {
            cb(err);
        } else {
            cb(null, event);
        }
    });
}

module.exports = {
    list: eventList,
    get: eventGet,
    add: eventAdd,
    update: eventUpdate,
    delete: eventDelete
}