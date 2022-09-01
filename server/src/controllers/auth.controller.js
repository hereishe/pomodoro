import db from '../helpers/db.js';
import crypt from '../helpers/crypt.js';
import session from '../helpers/session.js';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {

    let email_result = await db.findOne('users', {"email": req.body.email});
    let username_result = await db.findOne('users', {"username": req.body.username}); 

    if(email_result || username_result){
        
        return res.status(400).send({
            message: 'User already exists'
        });

    } else {
        let result = await db.insertOne('users', {"email": req.body.email, "username": req.body.username});
        let auth_result = await db.insertOne('login_auths', {'username': req.body.username, 'password': await crypt.cryptPassword(req.body.password)});
        res.send({
            message: 'success'
        });
    }
};

export const Login = async (req, res) => {
    let auth = await db.findOne('login_auths', {'username': req.body.username});

    //user not found
    if(!auth){
        return res.status(401).send({
            message: 'Invalid Credentials'
        });
    }

    //invalid password
    if(!await crypt.comparePass(req.body.password, auth.password)){
        return res.status(401).send({
            message: 'Invalid Credentials'
        });
    }

    //success
    let refreshToken = session.getRefreshToken(auth._id)

    res.cookie('refresh_token', refreshToken,
        {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    );

    //store refresh_token
    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);
    
    await db.insertOne('tokens', {'user_id': auth._id.toString(), 'token':refreshToken, 'expired_at': expired_at})

    res.send({
        token: session.getAccessToken(auth._id)
    });

};

export const Auth = async (req, res, next) => {
    try {
        const payload = session.verifyAccessToken(req.header('Authorization'));
        //if refresh token invalid
        if(!payload){
            console.log('unauthenticated1')
            return res.status(401).send({
                message: 'unauthenticated1'
            });
        }
        
        let refreshToken = await db.findOne('tokens', {'user_id': payload.id, 'expired_at': {'$gte': new Date()}});
        //if refresh token expired
        if(!refreshToken){
            console.log('unauthenticated2');
            return res.status(401).send({
                message: 'unauthenticated2'
            });
        }

        // auth success
        res.locals.user = refreshToken.user_id;
        next();

    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated3'
        });
    }

};

export const Refresh = async(req, res) => {
    try {
        const payload = session.verifyRefreshToken(req.cookies['refresh_token']);

        if(!payload){
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
        res.send({
            token: session.getAccessToken(payload.id)
        });

    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}

export const Logout = async(req, res) => {

    await db.deleteOne('tokens', {token})

    res.cookie('refresh_token', '', {maxAge:0});
    res.send({
        message: 'success'
    });
};