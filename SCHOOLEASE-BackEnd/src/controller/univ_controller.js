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
// exports.university_filter = async(req, res) => {
    
//     const { region, field, price, language } = req.body;

//     // Start building the SQL query
//     let sql = `SELECT DISTINCT universities.* FROM universities 
//     JOIN university_field ON universities.universityId = university_field.universityId 
//     JOIN fields ON university_field.field_id =fields.id 
//     JOIN universities_languages ON universities.universityId = universities.universityId 
//     JOIN language ON universities_languages.langauge_id =language.id 
//     WHERE language.languages = ?
//           AND universities.fee <= ?
//           AND fields.field_name = ?
//           AND universities.region = ?`
//           ;
    
//     // Array to hold the query parameters (values to be bound)
//     const params = [language, price, field, region]

//     // // Add conditions to the SQL query based on user responses
//     // if (region) {
//     //     sql += ` AND universities.region = ?`;   // Add condition for region
//     //     params.push(region);
//     // }
//     // if (field) {
//     //     sql += ` AND fields.field_name = ?`;    // Add condition for field
//     //     params.push(field);
//     // }
//     // if (price) {
//     //     sql += ` AND universities.fee <= ?`;     // Add condition for price (fee)
//     //     params.push(price);
//     // }
//     // if (language) {
//     //     sql += ` AND language.languages = ?`; // Add condition for language
//     //     params.push(language);
//     // }

//     // Execute the raw SQL query with the dynamically built query and parameters
//     dbconnection.query(sql, params, (err, results) => {
//         if (err) {
//             console.error('Database query error:', err);
//             return res.status(500).json({ error: 'Database query failed' });
//         }

//         // Send the filtered results (universities) back to the client
//         res.json(results);
//     });

// 
exports.filterUniversity= async(req, res) => {
    try {
        const { region, field, price, language } = req.body;

        // SQL query with proper JOIN condition
        const sql = `
           SELECT DISTINCT universities.* ,fields.* FROM universities 
           JOIN university_field ON universities.universityId = university_field.universityId 
           JOIN fields ON university_field.field_id =fields.id 
           JOIN universities_languages ON universities.universityId = universities.universityId 
           JOIN language ON universities_languages.langauge_id =language.id
            WHERE language.languages = ?
              AND universities.fee <= ?
              AND fields.field_name = ?
              AND universities.region = ?
        `;

        const params = [language, price, field, region];

        // Make sure the query is executed using a promise-based approach
        const [UniversityResult] = await dbconnection.query(sql, params);

        res.status(200).send({
            success: true,
            data: UniversityResult,
            message: 'Success',
        });
    } catch (error) {
        console.error('Database error:', error); // Log the error for debugging
        res.status(500).send({
            success: false,
            data: [],
            message: error.stack,
        });
    }
}