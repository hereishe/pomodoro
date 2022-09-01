import db from '../helpers/db.js';

export const Create = async (req, res) => {
    let dbres = await db.insertOne('categories', {"user_id": res.locals.user,"name": req.body.name});

    if(!dbres){
        return res.status(500).send({
            message: 'unsuccessful'
        });
    }
    
    res.send({
        message: 'success'
    });
}

export const Get = async (req, res) => {
    
    let dbres = await db.find('categories', {"user_id": res.locals.user});

    if(!dbres){
        return res.status(500).send({
            message: 'unsuccessful'
        });
    }

    res.send({
        message: 'success',
        categories: dbres.map( ({name}) => ({name}))
    })
}