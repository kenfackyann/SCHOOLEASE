const dbconnection = require('../database');

exports.getCategory= async(req, res) => {
    try {
        const category = await dbconnection.query('SELECT * FROM category');
        res.status(200).send({
            success: true,
            data: category[0],
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