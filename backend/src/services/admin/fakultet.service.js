const Fakultet = require('../../model/fakulteti')


const createFakultet =async (fakultet)=>{
    if(await Fakultet.findOne({emri:fakultet.emri})){
        throw new Error ('Fakulteti me te njejtin emer ekziston ')
    }else{
        const fakultetDb = new Fakultet({
            emri:fakultet.emri,
            pershkrimi:fakultet.pershkrimi
        });
        fakultetDb.save().then(()=>{
            console.log('fakultet created')
        }).catch((err)=>{
            console.log(err);
        })
        return fakultetDb;
    }
}

const getAllFaculty =()=>{
  return Fakultet.find({});
}


module.exports={createFakultet,getAllFaculty}