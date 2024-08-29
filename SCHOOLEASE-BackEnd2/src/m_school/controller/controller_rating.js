const dbconnection = require('../database');

exports.controllerRating = async(req, res) => {
    try {
        const Rating = await dbconnection.query('SELECT * FROM rate');
        res.status(200).send({
            success: true,
            data: Rating[0],
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