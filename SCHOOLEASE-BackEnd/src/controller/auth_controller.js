const dbconnection = require('../database');
const bcrypt = require('bcrypt');
const passport = require('passport')
require('dotenv').config();
// const initializePassport = require('../passportconfig');
// initializePassport(passport);
const jwt = require('jsonwebtoken')

// Signup Function
exports.signup = async (req, res) => {
    try {
        const { Name, emailAddress, password, accountType } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const userExist = await dbconnection.query(
            'SELECT * FROM user WHERE emailAddress = ?', [emailAddress]
        );
        
        if(userExist[0].length>0){
          return  res.status(401).send({
                success: false,
                data: [],
                message: "user already exist"
            })}
      
        await dbconnection.query(
            'INSERT INTO user (Name, emailAddress, password, accountType) VALUES (?, ?, ?, ?)',
            [Name, emailAddress, hashPassword, accountType]
        );

        const userInserted = await dbconnection.query(
            'SELECT * FROM user WHERE id IN(SELECT MAX(id) FROM user)'
        );

        res.status(201).send({
            success: true,
            data: userInserted[0],
            message: 'User saved successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: "Server error: " + error.message
        });
    }
};

// Signin Function

exports.signin = async (req, res) => {
    try {
        let {emailAddress, password} = req.body;

        const user_found = await dbconnection.query(
            'SELECT * FROM user WHERE emailAddress = ?', [emailAddress]
        );
      
       
      
      
        
        if(user_found[0].length === 0){
            
            
            return res.status(401).send({ 
                success: false,
                data: [],
                message: "the email or password is incorrect"
            })
        }else{
            const accessToken = jwt.sign(
                { id: user_found[0][0].id, email: user_found[0][0].emailAddress, userName:user_found[0][0].Name },
                process.env.ACCESS_TOKEN_SECRET, // Use an environment variable instead
                { expiresIn: "1h" }
            );
            let verifyPassword = await bcrypt.compare(password, user_found[0][0].password);
            if(verifyPassword){
                res.status(201).send({
                    success: true,
                    data: user_found[0],
                    accessToken,
                    message: 'Successfully Login'
                });
            }else{
               return  res.status(401).send({
                    success: false,
                    data: [],
                    message: "the email or password is incorrect"
                });
            }

    
           
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: "Error on server: "+error.stack
        })
    }
}
// function autenticateUser(req,res,next){
//  const authHeader = req.headers['autorizations']
//  const token = authHeader && authHeader.split(' ')[1]
//  if(token == null) return res.sendStatus(401) 

//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
//         if(err) return res.status(403)
//             req.user = user
//         next()
//     }
// )
// }
exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: "Access denied!" });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified; // Add user data to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token!" });
    }
};
// Update User Function
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, password, accountType } = req.body;
        const id = req.query.id;

        if (!id) {
            return res.status(400).send({
                success: false,
                data: [],
                message: "User ID is required"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await dbconnection.query(
            "UPDATE user SET firstName = ?, lastName = ?, emailAddress = ?, password = ?, accountType = ? WHERE id = ?",
            [firstName, lastName, emailAddress, hashPassword, accountType, id]
        );

        const [updatedUser] = await dbconnection.query(
            "SELECT * FROM user WHERE id = ?",
            [id]
        );

        if (updatedUser.length === 0) {
            return res.status(404).send({
                success: false,
                data: [],
                message: "User not found"
            });
        }

        res.status(200).send({
            success: true,
            data: updatedUser[0],
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: "Server error: " + error.message
        });
    }
};
