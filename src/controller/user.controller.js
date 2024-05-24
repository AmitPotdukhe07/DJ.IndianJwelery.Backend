import User from '../model/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, company, designation, country } = req.body;

        const existingUser = await User.findOne({
            email: email
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        }

        let user = new User({
            name,
            email,
            password: password,
            company,
            designation,
            country
        });
        user = await user.save();
        res.status(201).json({
            success: true,
            msg: "User created."
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User with this email does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }
        console.log(process.env.JWT_SECRET_USER);
        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET_USER);

        res.status(200).json({ success: true, token, ...user._doc });
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
}