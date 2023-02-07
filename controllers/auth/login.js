const {	Unauthorized} = require("http-errors");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../../models");


const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    // const passCompare = bcrypt.compareSync(password, user.password);

    if(!user || !user.comparePassword(password)) {
        throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});

    res.json({
        status:"success",
        code: 200,
        data: {
            token
        }
    })
};

module.exports = login;