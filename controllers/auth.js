const User = require('../models/User');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        })

        res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    };

    res.send("Register Route");
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({success: false, error: "Please provide email and password"});
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            res.status(404).json({ success: false, error: "Email is not registered"});
        };

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            res.status(404).json({success: false, error: "Password is not correct"});
        };

        res.status(200).json({
            success: true,
            token: "yoooo"
        });
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }

    res.send("Register Route");
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
};