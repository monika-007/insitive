var connection = require("./connection");

// Create Test Schedule
module.exports.create_test_schedule = function (request, response) {
    let { test_name, subject_id, test_date, duration, total_marks } = request.body;

    if (!test_name || !subject_id || !test_date || !duration || !total_marks) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO test_schedule (test_name, subject_id, test_date, duration, total_marks) 
                   VALUES ('${test_name}', ${subject_id}, '${test_date}', '${duration}', ${total_marks})`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Test schedule created successfully' }]);
            }
        });
    }
};

// Get Test Schedule by ID
module.exports.get_test_schedule = function (request, response) {
    console.log('Request body:', request.body);
    let id = request.params.id;

    if (!id) {
        
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `SELECT test_name, subject_id, duration, total_marks, DATE_FORMAT(test_date, '%Y-%m-%d') AS test_date FROM test_schedule WHERE id = ${id}`;

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

// Get All Test Schedules
module.exports.get_all_test_schedules = function (request, response) {
    let sql = `SELECT test_name, subject_id, duration, total_marks, DATE_FORMAT(test_date, '%Y-%m-%d') AS test_date,title FROM test_schedule t,subject s WHERE s.id=subject_id ORDER BY test_date DESC `;
    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

module.exports.get_all_subject = function (request, response) {
    let sql = `SELECT t.subject_id,s.title FROM test_schedule t,subject s WHERE s.id=subject_id ORDER BY test_date DESC `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};
// Update Test Schedule
module.exports.update_test_schedule = function (request, response) {
    let { id, test_name, subject_id, test_date, duration, total_marks } = request.body;

    if (!id || !test_name || !subject_id || !test_date || !duration || !total_marks) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `UPDATE test_schedule SET 
                   test_name = '${test_name}',
                   subject_id = ${subject_id},
                   test_date = '${test_date}',
                   duration = '${duration}',
                   total_marks = ${total_marks} 
                   WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
                console.log(error);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Test schedule updated successfully' }]);
            }
        });
    }
};

// Delete Test Schedule
module.exports.delete_test_schedule = function (request, response) {
    let id = request.params.id;

    if (!id) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `DELETE FROM test_schedule WHERE id = ${id}`;

        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Test schedule deleted successfully' }]);
            }
        });
    }
};
