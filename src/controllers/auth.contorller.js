
const AuthService = require('../services/auth.service')
const ValidateUser = require('../validations/user.validation')


const userLogin = async (req,res)=>{
    const tokens= await AuthService.logIn(req.body);
  return  res
      .header("Authorization", tokens.access_token)
      .header("RefreshToken", tokens.refresh_token)
      .status(200)
      .json({ message: "Registration successfully." });
}

const userLogOut=async (req,res)=>{
const refreshToken = req.header("refreshToken");
if(refreshToken.startsWith("Bearer ")){
    refreshToken.substring(7, refreshToken.length);
}
const userId= req.userId;
await AuthService.logOut(userId,refreshToken);

res.send({message:"Refresh token deleted  successfully"})

}
module.exports ={userLogin,userLogOut}