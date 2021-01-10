const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        })

        sendToken(user, 201, res);
    } catch (error) {
        return next(error);
    };
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        // res.status(400).json({success: false, error: "Please provide email and password"});
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            return next(new ErrorResponse("Email is not registered", 401));
        };

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Password is not correct", 401));
        };

        return sendToken(user, 200, res);
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }
};

exports.forgotPassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetPassword = (req, res, next) => {
    res.send("Reset Password Route");
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token});
}