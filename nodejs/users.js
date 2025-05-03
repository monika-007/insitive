const connection = require("./connection");

// REGISTER USER
module.exports.register = function (request, response) {
    let { first_name, last_name, email, password, role } = request.body;

    if (first_name === undefined || last_name === undefined || email === undefined || password === undefined || role === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ('${first_name}', '${last_name}', '${email}', '${password}', '${role}')`;
        connection.db.query(sql, function (error, result) {
            if (error != null) {
                if (error.code === "ER_DUP_ENTRY")
                    response.json([{ 'error': "no" }, { 'success': 'no' }, { 'message': 'email is already registered' }]);
                else
                    response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'registered successfully' }]);
            }
        });
    }
};

// LOGIN USER
module.exports.login = function (request, response) {
    let { email, password } = request.body;

    if (email === undefined || password === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `SELECT id, role FROM users WHERE email='${email}' AND password='${password}'`;
        connection.db.query(sql, function (error, result) {
            if (error != null)
                response.json([{ 'error': "error occurred" }]);
            else {
                if (result.length === 0)
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid login' }]);
                else
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'login successful' }, { 'id': result[0]['id'] }, { 'role': result[0]['role'] }]);
            }
        });
    }
};
// Inside your controller (e.g., userController.js)
module.exports.get_user_by_id = function (request, response) {
    const id = request.params.id;

    if (!id) {
        return response.json([{ error: "User ID is missing" }]);
    }

    const sql = `SELECT id, first_name, last_name, email FROM users WHERE id = ?`;

    connection.db.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            return response.json([{ error: "Error occurred", details: error.message }]);
        }

        if (result.length === 0) {
            return response.json([{ error: "No student found with this ID" }]);
        }

        response.json(result[0]);
    });
};


module.exports.get_all_faculty = function (request, response) {
    let sql = `SELECT id,first_name, last_name, email, password, role, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM users where role='faculty' `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

module.exports.get_all_student = function (request, response) {
    let sql = `SELECT id,first_name, last_name, email, password, role, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM users where role='student' `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};


// CHANGE PASSWORD
module.exports.change_password = function (request, response) {
    console.log(request.body);
    let { id, oldpassword, newpassword } = request.body;

    if (id === undefined || oldpassword === undefined || newpassword === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `SELECT id FROM users WHERE password='${oldpassword}' AND id=${id}`;
        connection.db.query(sql, function (error, result) {
            if (error != null)
                response.json([{ 'error': "error occurred" }]);
            else {
                if (result.length === 0) {
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'invalid password' }]);
                } else {
                    // Update old password with new password
                    sql = `UPDATE users SET password='${newpassword}' WHERE id=${id}`;
                    connection.db.query(sql, function (error, result) {
                        if (error)
                            response.json([{ 'error': "error occurred" }]);
                        else
                            response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'password changed successfully' }]);
                    });
                }
            }
        });
    }
};

// FORGOT PASSWORD
module.exports.forgot_password = function (request, response) {
    let email = request.query.email;  // Read from query string
    let newpassword = request.query.newpassword;  // Read from query string

    if (email === undefined || newpassword === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        // Check if the user exists
        let sql = `SELECT id FROM users WHERE email='${email}'`;
        connection.db.query(sql, function (error, result) {
            if (error != null) {
                response.json([{ 'error': "error occurred" }]);
                console.log(error);
            } else {
                if (result.length === 0) {
                    response.json([{ 'error': 'no' }, { 'success': 'no' }, { 'message': 'user not found' }]);
                } else {
                    // Update password with the new password
                    let sql = `UPDATE users SET password='${newpassword}' WHERE email='${email}'`;
                    connection.db.query(sql, function (error, result) {
                        if (error) {
                            response.json([{ 'error': "error occurred" }]);
                        } else {
                            response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'password reset successfully' }]);
                        }
                    });
                }
            }
        });
    }
};


