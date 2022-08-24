const User = require('../model/user');
const UserService = require('../services/admin/user.service');
const ValidateUser = require('../validations/user.validation')


const addUser =async (req,res)=>{
    await ValidateUser.validateRegister(body);
    const user = await UserService.CreateUser(req.body);
    res.send(user);
}
const setRole = async (req,res)=>{
  if(! ValidateUser.validateRole(req.body)) throw new Error('Please specify a valid role ' )
   await UserService.setUserRole(req.params.userId,req.body);
   return res.json({message: 'User role set successfully'})

}

module.exports={addUser,setRole}