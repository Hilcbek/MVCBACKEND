import jwt from "jsonwebtoken";
import { ErrorClass } from "../Error/Error.js";
export class Token extends ErrorClass{
    verifyIsUserLoggedIn = (req,res,next) => {
        try {
                let token = req.cookies.token;
                if(!token) return next(this.ErrorHandler(500, 'please login first'))
                jwt.verify(token,process.env.JWT,(err,payload) => {
                    if(err) return next(this.ErrorHandler(500, 'token expired!'))
                    req.user = payload;
                    next()
                })
        } catch (error) {
            next(error)
        }
    }
    verifyisUserAdmin = async (req,res,next) => {
        try {
            this.verifyIsUserLoggedIn(req,res,() => {
                if(!req.user.isAdmin) return next(this.ErrorHandler(500, 'Admin privilage only!'))
                next()
            })
        } catch (error) {
            next(error)
        }
    }
}