import db from '../helpers/db.js';

export const PomComplete = async (req, res) => {
    let dbres = await db.insertOne('pomodoro', {"user_id": res.locals.user,"category": req.body.category, "timeFinished": new Date().getTime()});

    if(!dbres){
        return res.status(500).send({
            message: 'unsuccessful'
        });
    }
    
    res.send({
        message: 'success'
    });
};

export const GetHistoricPoms = async (req, res) => {
    let dbres = await db.find('pomodoro', {"user_id": res.locals.user});

    if(!dbres){
        return res.status(500).send({
            message: 'unsuccessful'
        });
    }

    res.send({
        message: 'success',
        pom_list: dbres.map( ({category, timeFinished}) => ({category, timeFinished}))
    })
};