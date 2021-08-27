const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    name: { type: String, required: true},
    username: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ username: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'The email address is already taken!'
        },
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'The email address is already taken!'
        },
    },
    status: { type: String, required: true},
    incremental_id: { type: Number, required: true }
},{
    timestamps: true
})
module.exports = model('User', userSchema)