var connection = require("./connection");


// Submit Feedback
module.exports.submit_feedback = function (request, response) {
    let { user_id, rating, review } = request.body;
    
    if (user_id === undefined || rating === undefined || review === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO feedback (user_id, rating, review) VALUES 
                   ('${user_id}','${rating}', '${review}')`;
        
        connection.db.query(sql, function (error, result) {
            if (error) {
                console.log(error);
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Feedback submitted successfully' }]);
            }
        });
    }
};
module.exports.get_all_feedback = function (request, response) {
    let sql = `SELECT f.*,first_name,last_name FROM feedback f,users u WHERE u.id=user_id ORDER BY u.first_name ASC  `;

    connection.db.query(sql, function (error, result) {
        if (error) {
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result);
        }
    });
};

// Get Feedback by ID
// module.exports.get_feedback = function (request, response) {
//     let id = request.params.id;
    
//     if (id === undefined) {
//         response.json([{ 'error': 'input is missing' }]);
//     } else {
//         let sql = `SELECT * FROM feedback WHERE id = ${id}`;
        
//         connection.db.query(sql, function (error, result) {
//             if (error) {
//                 response.json([{ 'error': "error occurred" }]);
//             } else {
//                 response.json(result);
//             }
//         });
//     }
// };

// // Get Feedback by User
// module.exports.get_feedback_by_user = function (request, response) {
//     let user_id = request.params.user_id;
    
//     if (user_id === undefined) {
//         response.json([{ 'error': 'input is missing' }]);
//     } else {
//         let sql = `SELECT * FROM feedback WHERE user_id = ${user_id}`;
        
//         connection.db.query(sql, function (error, result) {
//             if (error) {
//                 response.json([{ 'error': "error occurred" }]);
//             } else {
//                 response.json(result);
//             }
//         });
//     }
// };

// Update Feedback
module.exports.update_feedback = function (request, response) {
    let { id, rating, review } = request.body;
    
    if (id === undefined || rating === undefined || review === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `UPDATE feedback SET rating = '${rating}', review = '${review}' WHERE id = ${id}`;
        
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Feedback updated successfully' }]);
            }
        });
    }
};

// Delete Feedback
module.exports.delete_feedback = function (request, response) {
    let id = request.params.id;
    
    if (id === undefined) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `DELETE FROM feedback WHERE id = ${id}`;
        
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'Feedback deleted successfully' }]);
            }
        });
    }
};
