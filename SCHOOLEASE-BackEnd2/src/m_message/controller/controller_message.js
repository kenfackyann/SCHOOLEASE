const dbconnection = require('../database');

exports.getMessage= async(req, res) => {
    try {
        const message = await dbconnection.query('SELECT * FROM message');
        res.status(200).send({
            success: true,
            data: message[0],
            message: 'Success'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: error.stack
        });
    }
}