const dbconnection = require('../database');

exports.getDepartment= async(req, res) => {
    try {
        const department = await dbconnection.query('SELECT * FROM department');
        res.status(200).send({
            success: true,
            data: department[0],
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