const {User} = require('../models/models')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const saltRounds = 12;

const signupController = async (req,res,next)=>{
    const {username,password,email} = req.body;
    if(!username || !password || !email) return res.status(400).json({error: "Invalid request body"})
    const user = await User.findOne({username: username});
    if(user) {
        return res.status(400).json({error: "User already exists"})
    }
    else{
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            if(err) next(err)
            let newUser = new User({
                username,
                hash,
                email
            })

            newUser = await newUser.save();
            const token = jwt.sign({ _id:newUser._id, username: username }, process.env.SECRET);
            return res.json({ token })
        });
    }


}

const loginController = async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password ) return res.status(400).json({error: "Invalid request body"})
    const user = await User.findOne({username: username});
    if(!user) {
        return res.status(400).json({error: "User does not exist"})
    }
    else{
        bcrypt.compare(password, user.hash, function(err, result) {
            if(err) next(err)
            if(result){
                const token = jwt.sign({ id:user._id, username: user.username }, process.env.SECRET);
                return res.json({ token })
            }
            else{
                return res.status(401).json({error: 'Wrong password'})
            }
        });
    }

}

const profileController = async (req,res)=>{
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })
    return res.json({ username: user.username, email: user.email })
}

module.exports = {signupController,loginController,profileController}