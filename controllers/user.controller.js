import jwt from 'jsonwebtoken'
import {ErrorClass} from '../Error/Error.js'
import User from '../model/user.model.js'
import bcrypt from 'bcrypt'
export class UserController extends ErrorClass{
    Register = async (req,res,next) => {
        try {
            let genSalt = await bcrypt.genSalt(10)
            let {firstname, lastname, email , username, password, isAdmin} = req.body;
            isAdmin ? isAdmin = isAdmin : false
            if(!firstname ||  !lastname || !username || !password || !email) return next(this.ErrorHandler(500, 'All credintails are required!'))
            if(!String(email).includes("@gmail.com")) return next(this.ErrorHandler(500, 'invalid email address!'))
            let Username = await User.findOne({ username : username });
            if(Username) return next(this.ErrorHandler(500, 'Username already exist!'))
            let Email = await User.findOne({ email : email });
            if(Email) return next(this.ErrorHandler(500, 'Email already Exist!'))
            let NewUser = await User.create({
                ...req.body,
                isAdmin : isAdmin,
                password : await bcrypt.hash(password,genSalt)
            })
            res.status(200).json({ data : NewUser })
        } catch (error) {
            next(error)
        }
    }
    UpdateUserImage = async (req,res,next) => {
        try {
            let {id} = req.params;
                let UpdatedUserData = await User.findByIdAndUpdate(id,{
                $set : {
                    ...req.body,
                    profile : req.body.profile
                }
            })
            res.status(200).json({ data : UpdatedUserData })
        } catch (error) {
            next(error)
        }
    }
    Login = async (req,res,next) => {
        try {
            let {useEmail, password} = req.body
            if(!useEmail || !password) return next(this.ErrorHandler(500,'All credintails are required!'))
            let Username = await User.find({ $or : [ {username : useEmail}, {email : useEmail} ]})
            if(!Username[0]) {
                return next(this.ErrorHandler(500,'wrong email address or username!'))
            }
            let Password = await bcrypt.compare(password,Username[0].password);
            if (!Password) return next(this.ErrorHandler(500,'wrong username or password'));
            let token = jwt.sign({id : Username[0]._id, isAdmin : Username[0].isAdmin}, process.env.JWT, {expiresIn : '2d'})
            res.cookie('token',token,{httpOnly : true, sameSite : true}).status(200).json({ data : Username[0]})
        } catch (error) {
            next(error)
        }
    }
    UpdateUser = async (req,res,next) => {
        try {
            let {username,email,firstname,lastname,profile} = req.body;
            if(!username || !profile || !email || !firstname || !lastname) next(this.ErrorHandler(500, 'all credintails are required!'))
            await User.findOneAndUpdate({ _id : req.user.id },{
                $set : {
                    ...req.body,
                    username : username,
                    profile : profile,
                    email : email,
                    firstname : firstname,
                    lastname : lastname,
                    profile : profile
                }
            })
            res.status(200).json({ data : 'Updated!' })
        } catch (error) {
            next(error)
        }
    }
    UpdateUserForAdmin = async (req,res,next) => {
         try {
            let {username,email,firstname,lastname} = req.body;
            if(!username || !email || !firstname || !lastname) return next(this.ErrorHandler(500, 'all credintails are required!'))
            let response = await User.findByIdAndUpdate(req.params.id,{
                $set : {
                    ...req.body,
                    username : username,
                    email : email,
                    firstname : firstname,
                    lastname : lastname,
                }
            })
            res.status(200).json({ data : response })
 }      catch (error) {
            next(error)
        }
    }
    SingleUserInfo = async (req,res,next) => {
        try {
            let SingleUser = await User.findOne({ _id : req.user.id })
            res.status(200).json({data : SingleUser})
        } catch (error) {
            next(error)
        }
    }
    SingleUserById = async (req,res,next) => {
        try {
            let SingleUser = await User.findById(req.params.id)
            res.status(200).json({data : SingleUser})
        } catch (error) {
            next(error)
        }
    }
    AllUser = async (req,res,next) => {
        try {
            let AllData = await User.find({}).sort({ createdAt : -1})
            res.status(200).json({data : AllData})
        } catch (error) {
            next(error)
        }
    }
    DeleteAllUser = async (req,res,next) => {
        try {
            await User.deleteMany({})
            res.status(200).json({data : 'All users are deleted!'})
        } catch (error) {
            
        }
    }
    DeleteSingleUser = async (req,res,next) => {
        try {
            let {id} = req.params
            await User.findByIdAndDelete(id);
            res.status(200).json({ data : 'you have deleted user self successfully!'})
        } catch (error) {
            next(error)
        }
    }
}