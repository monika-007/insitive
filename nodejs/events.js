var connection = require("./connection");

// Create Event
module.exports.createEvent = function (request, response) {
    let { name, description, date } = request.body;
    if (!name || !date) {
        response.json([{ 'error': 'input is missing' }]);
    } else {
        let sql = `INSERT INTO events (name, description, date) VALUES ('${name}', '${description}', '${date}')`;
        connection.db.query(sql, function (error, result) {
            if (error) {
                response.json([{ 'error': "error occurred" }]);
            } else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'event created successfully' }]);
            }
        });
    }
};

// Get All Events
module.exports.getAllEvents = function (request, response) {
    let sql = `SELECT name, description, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM events`;
    connection.db.query(sql, function (error, results) {
        if (error) {
            console.log(error);
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(results);
        }
    });
};

// Get Event by ID
module.exports.getEventById = function (request, response) {
    let id = request.params.id;
    let sql = `SELECT name, description, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM events WHERE id=${id}`;
    connection.db.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            response.json([{ 'error': "error occurred" }]);
        } else {
            response.json(result.length > 0 ? result[0] : [{ 'error': 'event not found' }]);
        }
    });
};

// Update Event
module.exports.updateEvent = function (request, response) {
    let { id, name, description, date } = request.body; // Getting id from request body

    console.log('Request body:', request.body);

    // Validate input
    if (!id || isNaN(id)) {
        console.log(error);
        return response.status(400).json({ error: 'Invalid or missing event ID' });
    }
    if (!name || !date) {
        return response.status(400).json({ error: 'Name and date are required' });
    }

    const sql = `UPDATE events SET name = ?, description = ?, date = ? WHERE id = ?`;
    const values = [name, description || '', date, id]; // Default empty string for description if missing

    connection.db.query(sql, values, function (error, result) {
        if (error) {
            console.error('Database query error:', error); // Logs the actual error
            return response.status(500).json({ error: 'An error occurred while updating the event' });
        }

        // Check if the event was found and updated
        if (result.affectedRows === 0) {
            console.log(error);
            return response.status(404).json({ error: 'Event not found' });
        }

        // Success
        response.json([{ error: 'no'},{success: 'yes'},{message: 'Event update successfully' }]);
    });
};

// Delete Event
module.exports.deleteEvent = function (request, response) {
    let id = request.params.id; // Get id from request.params

   // console.log('Request body:', request.body);
    //console.log('Request params:', request.params);

    // Validate input
    if (!id || isNaN(id)) {
        console.log(error);
        return response.status(400).json({ error: 'Invalid or missing event ID' });
    }

    const sql = `DELETE FROM events WHERE id = ?`;
    const values = [id];

    connection.db.query(sql, values, function (error, result) {
        if (error) {
            console.error('Database query error:', error);
            return response.status(500).json({ error: 'An error occurred while deleting the event' });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'Event not found' });
        }

        response.status(200).json({ success: true}, {message: 'Event deleted successfully' });
    });
};


