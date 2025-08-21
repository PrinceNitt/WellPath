import jwt from 'jsonwebtoken'
import Center from '../models/CenterSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = async (req, res, next) => {

    //get token from headers
    const authToken = req.headers.authorization
    
    if(!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({success: false, msg:"No token. Authorized access only."})
    }

    try {
        const token = authToken.split(' ')[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded.id 
        req.role = decoded.role

        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(404).json({success: false, msg:"Token Expired"})
        }
        return res.status(404).json({success: false, msg:"Invalid Token"})
    }
}

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId

    let user = null;

    const patient = await User.findById(userId);
    const center = await Center.findById(userId);

    if(patient) user = patient;
    if(center) user = center;

    if(!roles.includes(user.role)){
        return res.status(404).json({success: false, msg:"You are not authorized"})

    }

    next()
}