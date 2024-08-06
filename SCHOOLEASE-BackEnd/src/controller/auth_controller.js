
const dbconnection = require('../database');
const bcrypt = require('bcrypt');

exports.signup = async(req,res) =>{
   try {
    let{firstName,lastName,emailAddress,password,accountType} = req.body;
    let hashPassword = await bcrypt.hash(password,10);
    await dbconnection.query(
        'INSERT INTO user(firstName,lastName,emailAddress,password,accountType) VALUES (?,?,?,?,?)',[firstName,lastName,emailAddress,hashPassword,accountType]
    );
    const user_inserted = await dbconnection.query(
        'SELECT * FROM user WHERE id IN(SELECT MAX(id) FROM user )  '
    );
    res.status(201).send({
        success: true,
        data: user_inserted,
        message: 'saved successful'
    })
        

   } catch (error) {
    res.status(500).send({
        success:false,
        data: [],
        message: "error on server"+error.stack
    })
   }
    
}
exports.signin = async(req,res) =>{
    try {
     let{email,password} = req.body;

     const user_found = await dbconnection.query(
         'SELECT * FROM user WHERE email = ? AND password = ?', [email]
     );
     if(user_found[0].length===0){
        res.status(401).send({
            success:false,
            data: [],
            message:"wrong email or password"
        })

     }
     else{
        let user = user_found[0];
        if(bcrypt.compare(password, user_found[0].password)){
             res.status(201).send({
            success:true,
            data:user_found,
            meessage:"saved successfully"
        })
    }
        else{
            res.status(401).send({
                success:true,
                data:user_found,
                meessage:"wrong password"
            })
        }
        
       
     }

} catch (error) {
     res.status(500).send({
         success:false,
         data: [],
         message: "error on server"+error.stack
     })
    }
     
 }
 exports.updateUser = async(req, res) => {
    try {
        let {name, email,password} = req.body;
        let id = req.query.id;
        let hashPassword = await bcrypt.hash(password,10);
       await dbconnection.query(
            "UPDATE user SET name = ?, email = ?,password = ? WHERE id= ?",
             [name, email,hashPassword ,id]
            );
        const updateStudent = await dbconnection.query(
            "SELECT * FROM student WHERE id = ?",
            [id]
        );
        res.status(201).send({
            success: true,
            data: updateUser[0],
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
