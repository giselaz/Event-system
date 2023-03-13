

const uploadImage=(req,res)=>{
  
    console.log(req.file)
    if (req.file === undefined) return res.send("you must select an image.");
    const imgUrl = req.file.filename;
    return res.send(imgUrl);
}
module.exports={uploadImage};