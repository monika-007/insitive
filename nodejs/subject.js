var connection = require("./connection");

// Create Subject
module.exports.create_subject = function (request, response) {
    let { title } = request.body;
    if (!title) {
        response.json([{ 'error': 'title is missing' }]);
    } else {
        let sql = `INSERT INTO subject (title) VALUES ('${title}')`;
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': error.message }]);
            } else {
                response.json([{ 'success': 'Subject added successfully', 'id': result.insertId }]);
            }
        });
    }
};

// Get Subjects
module.exports.get_subjects = function (request, response) {
    let sql = `SELECT * FROM subject`;
    connection.db.query(sql, function (error, results) {
        if (error) {
            response.json([{ 'error': error.message }]);
        } else {
            response.json(results);
        }
    });
};

// Update Subject
module.exports.update_subject = function (request, response) {
    let { id, title } = request.body;
    if (!id || !title) {
        response.json([{ 'error': 'id and title are required' }]);
    } else {
        let sql = `UPDATE subject SET title = '${title}' WHERE id = ${id}`;
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': error.message }]);
            } else {
                response.json([{ 'success': 'Subject updated successfully' }]);
            }
        });
    }
};

// Delete Subject
module.exports.delete_subject = function (request, response) {
    let id = request.params.id;
    if (!id) {
        response.json([{ 'error': 'id is required' }]);
    } else {
        let sql = `DELETE FROM subject WHERE id = ${id}`;
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': error.message }]);
            } else {
                response.json([{ 'success': 'Subject deleted successfully' }]);
            }
        });
    }
};
