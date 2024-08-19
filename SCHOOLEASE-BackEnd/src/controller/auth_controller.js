const dbconnection = require('../database');
const bcrypt = require('bcrypt');

// Signup Function
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, password, accountType } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        await dbconnection.query(
            'INSERT INTO user (firstName, lastName, emailAddress, password, accountType) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, emailAddress, hashPassword, accountType]
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

        if(user_found[0].length===0){
            res.status(401).send({
                success: false,
                data: [],
                message: "Wrong email"
            })
        }else{
            let verifyPassword = await bcrypt.compare(password, user_found[0][0].password);
            if(verifyPassword){
                res.status(201).send({
                    success: true,
                    data: user_found[0],
                    message: 'Successfully Login'
                });
            }else{
                res.status(401).send({
                    success: false,
                    data: [],
                    message: 'Wrong password'
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
