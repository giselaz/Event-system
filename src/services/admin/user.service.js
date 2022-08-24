const bcrypt = require("bcrypt");
const User = require("../../model/user");

const CreateUser = async (user) => {
  if (await User.findOne({ email: user.email })) {
    throw new Error("User already exist");
  } else {
    const salt = await bcrypt.genSalt(10);

    const userDb = new User({
      emri: user.emri,
      mbiemri: user.mbiemri,
      email: user.email,
      password: user.password,
    });
    userDb.password = await bcrypt.hash(user.password, salt);

    userDb
      .save()
      .then(() => {
        console.log("user Created");
      })
      .catch((err) => {
        console.log(err);
      });
    return userDb;
  }
};
const setUserRole =(userId,data)=>{
  return User.findByOneAndUpdate({
    id:userId
  },
  {
    userType:data
  },
  { new: true })

}

module.exports = { CreateUser ,setUserRole};
