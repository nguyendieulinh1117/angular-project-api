const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const typeUser = req.body.typeUser
    const name = req.body.name;

    const emailExist = await Users.findOne({ email: email })
    if (emailExist) return res.status(400).send('email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new Users({
        name: name,
        email: email,
        password: hashedPassword,
        typeUser: typeUser
    })
    try {
        const user = await newUser.save();
        if (!user) throw Error("Something went wrong with saving user");
        res.status(200).json({
            message: 'them thanh cong thanh vien',
            user: user
        });
    } catch (error) {
        res.status(400).json({ message: error })
    }

}
exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // checking if the email exists
    const user = await Users.findOne({ email: email });
    if (!user) return res.status(400).send("Email is not found");
    // PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
    // Create and assign a token
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        typeUser: user.typeUser,
        "iat": (new Date().getTime())
    }
    const token = jwt.sign(payload, "Abc", { expiresIn: '240h' });
    res.status(200).json({
        message: "login thanh cong",
        token: token
    })
}

exports.testAuth = (req, res, next) => {
    res.status(200).json({
        message: "Logged in",
        user: req.user
    })
}