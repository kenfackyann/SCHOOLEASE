const dbconnection = require('../database');


exports.addArticle= async(req, res) => {
    try {
        let {article_title,article_content} = req.body;
        const article = await dbconnection.query(
            "INSERT INTO articles(article_title,article_content) VALUES(?, ?)", [article_title,article_content]);
        res.status(201).send({
            success: true,
            data: article,
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
