var connection = require("./connection");

// Register Course
module.exports.register_course = function (request, response) {
    let { name, description, faculty_id } = request.body;
    console.log(request.body);
    if (name === undefined || faculty_id === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO courses (name, description, faculty_id ) VALUES 
                   ('${name}', '${description}', '${faculty_id}')`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
                console.log(error);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Course registered successfully' }]);
            }
        });
    }
};

module.exports.get_all_faculty = function (request, response) {
    let sql = `SELECT c.faculty_id, u.first_name,u.last_name FROM courses c JOIN users u ON u.id = c.faculty_id WHERE u.role = 'faculty';`;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

// Get Course by ID
module.exports.get_course = function (request, response) {
    let id = request.params.id;

    if (id === undefined) {
        response.json([{ error: 'input is missing' }]);
    } else {
        let sql = `
            SELECT c.*, u.first_name, u.last_name 
            FROM courses c 
            JOIN users u ON u.id = c.faculty_id 
            WHERE c.id = ${id} && u.role = 'faculty'
        `;

        connection.db.query(sql, function (error, result) {
            if (error) {
                console.error("Query error:", error);
                response.json([{ error: "Database query failed" }]);
            } else {
                response.json(result);
            }
        });
    }
};

// Get All Courses
module.exports.get_all_courses = function (request, response) {
    let sql = `SELECT c.*, u.first_name, u.last_name FROM courses c JOIN users u ON u.id = c.faculty_id WHERE u.role = 'faculty';`;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

module.exports.get_all_courses_with_feedback = function (request, response) {
    let sql = `SELECT c.id , c.name, u.first_name, u.last_name,f.rating FROM courses c JOIN users u JOIN feedback f ON u.id = c.faculty_id && c.faculty_id=f.faculty_id WHERE u.role = 'faculty' && f.feedback_type='course' `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

// Get Courses by faculty
// module.exports.get_courses_by_faculty = function (request, response) {
//     let faculty_id = request.params.faculty_id;

//     if (faculty_id === undefined) {
//         response.json([{ 'error': 'input is missing' }]);
//     } else {
//         let sql = `SELECT * FROM courses WHERE faculty_id= ${faculty_id};`

//         connection.db.query(sql, function (error, result) {
//             if (error) {
//                 response.json([{ 'error': "error occurred" }]);
//             } else {
//                 response.json(result);
//             }
//         });
//     }
// };

// Update Course
module.exports.update_course = function (request, response) {
    let { id, name, description, faculty_id } = request.body;

    if (id === undefined || name === undefined || faculty_id === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `UPDATE courses SET 
                    name = '${name}', 
                    description = '${description}', 
                    faculty_id = '${faculty_id}' 
                   WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
                console.log(error);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Course updated successfully' }]);
            }
        });
    }
};

// Delete Course
module.exports.delete_course = function (request, response) {
    let id = request.params.id;

    if (id === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `DELETE FROM courses WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Course deleted successfully' }]);
            }
        });
    }
};
