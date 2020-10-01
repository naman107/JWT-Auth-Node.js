const Blog = require("../models/BlogModel");
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 4 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
    });
    if (errors === null || errors === undefined) {
        errors = {}
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const blog = await Blog.create({ email, password });
        const token = createToken(blog._id);
        res.header('auth-token', token).send(token)
        res.status(201).json({ blog: blog._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const blog = await Blog.login(email, password);
        const token = createToken(blog._id);
        res.header('auth-token', token)
        res.status(200).json({ blog: blog._id });
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ errors: err.message });
    }

}