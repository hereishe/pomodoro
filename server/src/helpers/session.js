import config from "../helpers/config.js";
import jwt from 'jsonwebtoken';

export default {
    getAccessToken: (auth_id) => {
        return jwt.sign({
            id: auth_id,

                                //expiry shouldn't be this long
                                //remember to change
                                //after fixing axios incercept header set 
        }, config.ACCESS_SECRET, {expiresIn: '10m'});
    },


    getRefreshToken: (auth_id) => {
        return jwt.sign({
            id: auth_id,
    
        }, config.REFRESH_SECRET, {expiresIn: '1w'});
    },

    verifyAccessToken: (accessToken) => {
        return jwt.verify(accessToken, config.ACCESS_SECRET || '');
    },

    verifyRefreshToken: (refreshToken) => {
        return jwt.verify(refreshToken, config.REFRESH_SECRET || '');
    }
}