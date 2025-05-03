var connection = require("./connection");
module.exports.login = function (request, response) {
    let email = request.body.email;
    let password = request.body.password;
    if(email === undefined || password === undefined)
    {
        response.json([{'error':'input is missing'}]);
    }
    else 
    {
        let sql = `select id from admin where email='${email}' and password='${password}'`;
        connection.db.query(sql, function (error, result) {
            if (error != null)
                response.json([{ 'error': "error occured" }]);
            else {
                if (result.length === 0)
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid login' }]);
                else
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'login successfully' }, { 'id': result[0]['id'] }]);

            }
        });
    }
}

module.exports.change_password = function (request, response) {
    let {id,oldpassword,newpassword} = request.body;
    console.log(request.body);
    if(id === undefined || oldpassword === undefined || newpassword === undefined)
    {
        response.json([{ 'error': 'input is missing' }]);
    }
    else 
    {
        let sql = `select id from admin where password='${oldpassword}' and id=${id}`;
        connection.db.query(sql,function(error,result){
            if (error != null)
            {
                response.json([{ 'error': "error occured" }]);
            console.log(error);
            }
            else 
            {
                if(result.length === 0)
                {
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid password' }]);
                }
                else 
                {
                    //update old password with new password
                    let sql = `update admin set password='${newpassword}' where id='${id}'`;
                    connection.db.query(sql,function(error,result){
                        if(error)
                            response.json([{ 'error': "error occured" }]);
                        else 
                            response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'password changed successfully' }]);
                    });
                }
            }
        })
    }
}

module.exports.forgot_password = function (request, response) {
    let { email } = request.query;
    if (email === undefined) {
        response.json([
            { error: 'no' },
            { success: 'no' },
            { message: `email is missing` }
        ]);
    } else {
        // Check if the user exists
        let sql = `SELECT id FROM admin WHERE email='${email}'`;
        connection.db.query(sql, function (error, result) {
            if (error != null)
                response.json([{ error: 'error occured' }]);
            else {
                let count = result.length;
                if (count === 0) {
                    response.json([
                        { error: 'no' },
                        { success: 'no' },
                        { message: 'email not registered with us' }
                    ]);
                } else {
                    //generate random password
                    var generatePassword = require('./password_generators.js');
                    var NewPassword = generatePassword(10);
                    sql = `update admin set password='${NewPassword}' where email='${email}'`;
                    connection.db.query(sql, function (error, result) {
                        if (error != null)
                            response.json([{ error: 'error occured' }]);
                        else {
                            //send email
                            let mymail = require("./Email.js");
                            //create object of mail class
                            let mail_sender = new mymail.Email();
                            let subject = "Password recovery email";
                            let message = "your new password is " + NewPassword;
                            response.json([
                                { error: 'no' },
                                { success: 'yes' },
                                { message: 'please check your email for password recovery' }
                            ]);
                            //mail_sender.send(email, subject, message);
                        }
                    });
                }
            }
        });
    }
};



 