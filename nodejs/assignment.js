var connection = require("./connection");

// Create Assignment
module.exports.create_assignment = function (request, response) {
    let { name, description, due_date, total_marks, subject_id } = request.body;

    if (!name || !description || !due_date || !total_marks || !subject_id) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO assignment (name, description, due_date, total_marks, subject_id) 
                   VALUES ('${name}', '${description}', '${due_date}', ${total_marks}, ${subject_id})`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                console.log(error);
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Assignment created successfully' }]);
            }
        });
    }
};

module.exports.get_all_subject = function (request, response) {
    let sql = `SELECT a.subject_id,s.title FROM assignment a,subject s WHERE s.id=subject_id ORDER BY due_date DESC `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};
// Get Assignment by ID
module.exports.get_assignment = function (request, response) {
    let id = request.params.id;

    if (!id) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `SELECT id, name, description , total_marks, subject_id , DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date  FROM assignment WHERE id = ${id}`;
        connection.db.query(sql, function (error, result) {
            if (error) {
                console.log(error);
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json(result);
            }
        });
    }
};

// Get All Assignments
module.exports.get_all_assignments = function (request, response) {
    let sql = `
    SELECT 
        a.id, 
        a.Name, 
        a.description, 
        a.total_marks, 
        a.subject_id, 
        DATE_FORMAT(a.due_date, '%Y-%m-%d') AS due_date, 
        s.title 
    FROM 
        assignment a
    JOIN 
        subject s ON s.id = a.subject_id 
    ORDER BY 
        a.due_date DESC`;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

// Update Assignment
module.exports.update_assignment = function (request, response) {
    let { id, name, description, due_date, total_marks, subject_id } = request.body;

    if (!id || !name || !description || !due_date || !total_marks || !subject_id) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `UPDATE assignment SET 
                   name = '${name}',
                   description = '${description}',
                   due_date = '${due_date}',
                   total_marks = ${total_marks},
                   subject_id = ${subject_id} 
                   WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Assignment updated successfully' }]);
            }
        });
    }
};

// Delete Assignment
module.exports.delete_assignment = function (request, response) {
    let id = request.params.id;

    if (!id) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `DELETE FROM assignment WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Assignment deleted successfully' }]);
            }
        });
    }
};
