import expres from 'express'
import { UserController } from '../controllers/user.controller.js'
import { Token } from '../Token/Token.js';
export let userRouter = expres.Router()
let Ucontroller = new UserController();
let token = new Token()
userRouter.post('/register',Ucontroller.Register)
userRouter.put('/user/:id',Ucontroller.UpdateUserImage)
userRouter.post('/login',Ucontroller.Login)
userRouter.put('/update-user',token.verifyIsUserLoggedIn, Ucontroller.UpdateUser)
userRouter.put('/update-user/:id',token.verifyIsUserLoggedIn, Ucontroller.UpdateUserForAdmin)
userRouter.get('/singleUser',token.verifyIsUserLoggedIn, Ucontroller.SingleUserInfo)
userRouter.get('/singleUser/:id',token.verifyisUserAdmin, Ucontroller.SingleUserById)
userRouter.get('/',token.verifyIsUserLoggedIn, Ucontroller.AllUser)
userRouter.post('/logout',token.verifyIsUserLoggedIn, Ucontroller.Logout)
userRouter.delete('/', token.verifyisUserAdmin, Ucontroller.DeleteAllUser)
userRouter.delete('/:id', token.verifyIsUserLoggedIn, Ucontroller.DeleteSingleUser);