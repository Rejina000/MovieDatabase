import * as AuthModel from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';

const cookieOptions={
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    sameSite:process.env.NODE_ENV==='production'?'none':'lax',
    secure:process.env.NODE_ENV==='production',
};

export async function registerUser(req, res) {
    try {
        const user = await AuthModel.register(req.body);
       
        if (user) {
            const token = generateToken(user);
            res.cookie('jwtToken',token,cookieOptions);


            return res.status(201).json({
                message: "User registered successfully",
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                    
                },
            });
        }

        return res.status(400).json({
            message: "User registration failed",
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
}
export async function loginUser(req, res) {
    try {
        const user = await AuthModel.login(req.body);
       


        if (user) {
            const token = generateToken(user);
            res.cookie('jwtToken',token,cookieOptions);

            return res.status(200).json({
                message: 'User logged in successfully',
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: token
                }
            });
        }

        return res.status(400).json({
            message: 'User login failed'
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

export async function getCurrentUser(req, res) {
    try {
        const user = await AuthModel.getUserById(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}