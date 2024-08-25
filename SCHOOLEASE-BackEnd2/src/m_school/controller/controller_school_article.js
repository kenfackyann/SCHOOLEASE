const dbconnection = require('../database');

exports.getSchoolArticle = async(req, res) => {
    try {
        const schoolArticle = await dbconnection.query('SELECT * FROM school_article');
        res.status(200).send({
            success: true,
            data: schoolArticle[0],
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
exports.saveSchoolArticle = async(req, res) => {
    try {
        let {name,content,school_id} = req.body;
        const schoolArticle = await dbconnection.query(
            "INSERT INTO school_article (name,content,school_id) VALUES(?,?,?)", [name,content,school_id]);
        res.status(201).send({
            success: true,
            data: schoolArticle,
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
