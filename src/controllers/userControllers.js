const userCtrl = {}
const User = require('../models/userModel');


async function autoIncrementId() {
	try {
		let { incremental_id } = await User.findOne()
			.sort({ incremental_id: -1 })
			.limit(1)
		// usa esta variable para el autoincremento
		let oldSeq = parseInt(incremental_id)
		let newSeq = oldSeq + 1
		return newSeq
	} catch (e) {
		return 1
	}
}

async function countLength(array){
    var arr={};
    for(i=0; i < array.length; i++){
        var char=array[i];
        if (arr[char]) arr[char]++
        else arr[char]=1;
    }
    return arr;
}


//Get LIST USERS
userCtrl.getUsers = async (req, res)=>{
    const results = await User.find();
    console.log(results);
    res.json(results);
}
userCtrl.createUser = async(req, res)=>{
    try{
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(req.body.email)){
			req.body.incremental_id = await autoIncrementId();
            const newUser = User(req.body);
            console.log(newUser);
            await newUser.save();
            res.status(200).json({
                message: "User created successfully",
                newUser
            });
        }else{
            res.status(300).json({
                message:  "Error"
            });
        }
    }catch(e){
        res.status(500).json({
            message:" Query Error",
            error: e
        })
    }
    
}
userCtrl.quantifies = async(req, res) => {
    try{
        const results = await User.find();
        const values = [];
        results.forEach(async function(result, index){
            console.log('Result', result.email.length);
            values.push(result.email.length);
            if((results.length - 1) == index){
                var counter = await countLength(values);
                res.status(200).json({
                    message: "Quantifies",
                    counter
                })
            }
        });
    }catch(e){
        res.status(500).json({
            message: 'Error in processing',
            e
        });
    }
}
module.exports = userCtrl;