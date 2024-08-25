const dbconnection = require('../database')

exports.getSchool= async(req, res) => {
    try {
        const school = await dbconnection.query('SELECT * FROM school');
        res.status(200).send({
            success: true,
            data: school[0],
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