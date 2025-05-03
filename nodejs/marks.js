const connection = require("./connection");

// Create Mark
module.exports.create_mark = function (request, response) {
    const { student_id, test_id, marks_obtained, graded_at } = request.body;

    if (!student_id || !test_id || !marks_obtained) {
        return response.json([{ 'error': 'input is missing' }]);
    }

    const sql = `INSERT INTO marks (student_id, test_id, marks_obtained, graded_at) VALUES (?, ?, ?, ?)`;
    const values = [student_id, test_id, marks_obtained, graded_at || new Date().toISOString().split('T')[0]];

    connection.db.query(sql, values, function (error, result) {
        if (error) {
            console.log(error);
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Mark created successfully' }]);
    });
};

// Get Mark by ID
module.exports.get_mark = function (request, response) {
    const id = request.params.id;

    if (!id) {
        return response.json([{ 'error': 'input is missing' }]);
    }

    const sql =`SELECT id, student_id, test_id, marks_obtained, DATE_FORMAT(graded_at, '%Y-%m-%d') AS graded_at FROM marks WHERE id = ? `;
    connection.db.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        response.json(result);
    });
};

module.exports.get_mark_with_user = function (request, response) {
    const id = request.params.id;

    if (!id) {
        return response.json([{ 'error': 'input is missing' }]);
    }

    const sql = `
        SELECT 
            m.student_id,
            m.test_id,
            m.marks_obtained,
            u.first_name,
            u.last_name,
            t.test_name
        FROM 
            marks m
        JOIN 
            users u ON m.student_id = u.id
        JOIN 
            test_schedule t ON m.test_id = t.id
        WHERE 
            m.id = ? AND u.role = 'Student'
    `;

    connection.db.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        response.json(result);
    });
};


// Get All Marks
module.exports.get_all_marks = function (request, response) {
    const sql = `SELECT m.id, m.student_id, m.test_id, m.marks_obtained, DATE_FORMAT(graded_at, '%Y-%m-%d') AS graded_at, u.first_name, u.last_name, t.test_name 
                 FROM marks m 
                 JOIN users u ON u.id = m.student_id 
                 JOIN test_schedule t ON t.id = m.test_id 
                 ORDER BY u.first_name ASC`;

    connection.db.query(sql, function (error, result) {
        if (error) {
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        response.json(result);
    });
};

// Get All students
module.exports.get_all_students = function (request, response) {
    const sql = `SELECT m.student_id, u.first_name, u.last_name 
                 FROM marks m 
                 JOIN users u ON u.id = m.student_id 
                 ORDER BY u.first_name ASC`;
    connection.db.query(sql, function (error, result) {
        if (error) {
            console.log("SQL Error:", error);
            response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        else {
            // Debug log
            response.json(result);
        }

    });
};


// Get All Test Name
module.exports.get_all_test_name = function (request, response) {
    const sql = `SELECT m.test_id, t.test_name 
                 FROM marks m 
                 JOIN test_schedule t ON t.id = m.test_id`;

    connection.db.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};
// Update Mark
module.exports.update_mark = function (request, response) {
    const { id, student_id, test_id, marks_obtained, graded_at } = request.body;

    if (!id || !student_id || !test_id || !marks_obtained) {
        return response.json([{ 'error': 'input is missing' }]);
    }

    const sql = `UPDATE marks SET 
                 student_id = ?, 
                 test_id = ?, 
                 marks_obtained = ?, 
                 graded_at = ? 
                 WHERE id = ?`;

    const values = [student_id, test_id, marks_obtained, graded_at || new Date().toISOString().split('T')[0], id];

    connection.db.query(sql, values, function (error, result) {
        if (error) {
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        if (result.affectedRows === 0) {
            return response.json([{ 'error': 'no record found with the provided id' }]);
        }
        response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Mark updated successfully' }]);
    });
};

// Delete Mark
module.exports.delete_mark = function (request, response) {
    const id = request.params.id;

    if (!id) {
        return response.json([{ 'error': 'input is missing' }]);
    }

    const sql = `DELETE FROM marks WHERE id = ?`;

    connection.db.query(sql, [id], function (error, result) {
        if (error) {
            return response.json([{ 'error': "error occurred", 'details': error.message }]);
        }
        response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Mark deleted successfully' }]);
    });
};
