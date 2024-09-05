const dbconnection = require('../database');

exports.getUniversity = async(req, res) => {
    try {
        const University = await dbconnection.query('SELECT * FROM Universities ');
        res.status(200).send({
            success: true,
            data: University,
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

exports.saveUniversity = async(req, res) => {
    try {
        let {university_name,date_of_establishement,region,location,website,ownership} = req.body;
        const univ = await dbconnection.query(
            "INSERT INTO universities(university_name,date_of_establishement,region,location,website,ownership) VALUES(?,?,?,?,?,?)", [university_name,date_of_establishement,region,location,website,ownership]);
        res.status(201).send({
            success: true,
            data: univ,
            message: 'Successfully Saved'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: error.stack
        });
    }
}

exports.updateUniversity = async(req, res) => {
    try {
        let {universitId,university_name,date_of_establishement,region,location,website} = req.body;
        let id = req.query.id;
        const univ = await dbconnection.query(
            "UPDATE universities SET universidyId=?,university_name=?,date_of_establishement=?,region=?,location=?,website=?",
             [universitId,university_name,date_of_establishement,region,location,website]
            );
        const updateUniversity = await dbconnection.query(
            "SELECT * FROM universities WHERE universityId  = ?",
            [id]
        );
        res.status(201).send({
            success: true,
            data: updateUniversity[0],
            message: 'Successfully Updated'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: error.stack
        });
    }
}

exports.deleteUniversity = async(req, res) => {
    try {
        let id = req.params.id;
        const univ = await dbconnection.query(
            "DELETE FROM universities WHERE universityId= ?",
             [id]
            );
        res.status(200).send({
            success: true,
            data: univ,
            message: 'Successfully Deleted '+id
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: [],
            message: error.stack
        });
    }
}