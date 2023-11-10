import expres from 'express'
import { UserController } from '../controllers/user.controller.js'
import { Token } from '../Token/Token.js';
export let userRouter = expres.Router()
let Ucontroller = new UserController();
let token = new Token()
userRouter.post('/register',Ucontroller.Register)
userRouter.put('/user/:id',Ucontroller.UpdateUserImage)
userRouter.post('/login',Ucontroller.Login)
userRouter.put('/update-user', Ucontroller.UpdateUser)
userRouter.put('/update-user/:id', Ucontroller.UpdateUserForAdmin)
userRouter.get('/singleUser', Ucontroller.SingleUserInfo)
userRouter.get('/singleUser/:id', Ucontroller.SingleUserById)
userRouter.get('/', Ucontroller.AllUser)
userRouter.post('/logout', Ucontroller.Logout)
userRouter.delete('/', Ucontroller.DeleteAllUser)
userRouter.delete('/:id', Ucontroller.DeleteSingleUser);
