const http = require('http');
var express = require('express');
var app = express();
var users = require('./users');
var admin = require('./admin');
var feedback = require('./feedback');
var events = require('./events');
var courses = require('./courses');
var test_schedule = require("./test_schedule");
var assignment = require('./assignment');
var marks = require('./marks');
var subject = require('./subject');
var cors = require("cors"); // Add this line

const USER_ROUTE = "/users";
const ADMIN_ROUTE = "/admin";
const FEEDBACK_ROUTE = "/feedback";
const EVENTS_ROUTE = "/events";
const COURSES_ROUTE = "/courses" ;
const TEST_SCHEDULE_ROUTE = "/test_schedule";
const ASSIGNMENT_ROUTE = "/assignment";
const MARKS_ROUTE="/marks";
const SUBJECT_ROUTE="/subject";
const PORT_NO = 5000 ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // New line added
app.use(cors({
    origin: 'http://localhost:3000',
    // Update with your React.js app's origin
    optionsSuccessStatus: 200,
}));
 // http://localhost:5000/admin
app.post(ADMIN_ROUTE+"/login",(request,response) =>  admin.login (request,response));
// http://localhost:5000/admin/change_password
app.post(ADMIN_ROUTE,(request,response) => admin.change_password(request,response));
// http://localhost:5000/admin/forgot_password
app.get(ADMIN_ROUTE,(request,response) => admin.forgot_password(request,response));

// Register
// Endpoint: http://localhost:5000/users/register
// Method: POST
//input first_name=monika&last_name=helaiya&email=monika@gmail.com&password=123123&role=student
//all inputs are required
app.post(USER_ROUTE, (request, response) => users.register(request, response));

// Login
// Endpoint: http://localhost:5000/users
// Method: POST
//input (required)
//email=monika@gmail.com&password=123123

app.post(USER_ROUTE+"/login", (request, response) => users.login(request, response));

//for all faculty
//endpoint: http://localhost:5000/users/faculty
//method:get 
app.get(USER_ROUTE +"/faculty", (request, response) => users.get_all_faculty(request, response));

//for all student
//endpoint: http://localhost:5000/users
//method:get 
app.get(USER_ROUTE, (request, response) => users.get_all_student(request, response));


// Change Password
// Endpoint: http://localhost:5000/users/change_password
// Method: POST
//input:id=1&oldpassword=123123&newpassword=321321
app.post(USER_ROUTE+"/change_password", (request, response) => users.change_password(request, response));

// Forgot Password
// Endpoint: http://localhost:5000/users/forgot_password
// Method: GET
//input:localhost:5000/users/forgot_password?email=admin@gmail.com&newpassword=112233

app.get(USER_ROUTE, (request, response) => users.forgot_password(request, response));

app.get(USER_ROUTE+"/user/:id", (request, response) => users.get_user_by_id(request, response));

//define routes for feedback
//http://localhost:5000/feedback/submit_feedback
//method : post
//{ "user_id": 1, "feedback_type": "Class", "target_id": 101, "rating": 5, "review": "Great class!" }
app.post(FEEDBACK_ROUTE, (request, response) => feedback.submit_feedback(request, response));

//http://localhost:5000/feedback/get_feedback/1
//method : get

//app.get(FEEDBACK_ROUTE , (request, response) => feedback.get_feedback(request, response));

//http://localhost:5000/feedback
//method : get
app.get(FEEDBACK_ROUTE,(request, response) => feedback.get_all_feedback(request, response));
//http://localhost:5000/feedback/get_feedback_by_user/1
//method:get
//app.get(FEEDBACK_ROUTE, (request, response) => feedback.get_feedback_by_user(request, response));

//http://localhost:5000/feedback/update_feedback
//method : put
//{ "id": 1, "rating": 4, "review": "Good class!" }
//error
app.put(FEEDBACK_ROUTE, (request, response) => feedback.update_feedback(request, response));

//http://localhost:5000/feedback/delete_feedback/1
//method : delete

app.delete(FEEDBACK_ROUTE, (request, response) => feedback.delete_feedback (request, response));

//define routes for events
//https://localhost:5000/events/createEvent
//method: post
// {
//     "name": "Annual Science Fair",
//     "description": "A science fair showcasing student projects.",
//     "date": "2025-03-15"
// }

app.post(EVENTS_ROUTE,(request, response) => events.createEvent(request, response));


//https://localhost:5000/events/getAllEvents
//method: GET

app.get(EVENTS_ROUTE,(request, response) => events.getAllEvents (request, response));

//https://localhost:5000/events/1
//method: GET
//Example: /events/1
app.get(EVENTS_ROUTE+"/:id",(request, response) => events.getEventById (request, response));


//https://localhost:5000/events/updateEvent
//method: put
// {
//     "name": "Updated Event Name",
//     "description": "Updated description of the event.",
//     "date": "2025-05-01"
// }
app.put(EVENTS_ROUTE,(request,response) => events.updateEvent(request, response));

//https://localhost:5000/events/deleteEvent/3
//method: delete
//example : /delete/1

app.delete(EVENTS_ROUTE + "/:id",(request, response) => events.deleteEvent (request, response));

//define routes for courses
//https://localhost:5000/courses/register_course
//method : post
//input :{
//     "name": "Data Structures",
//     "description": "Learn about arrays, linked lists, and trees",
//     "instructor_id": 2
// }
app.post(COURSES_ROUTE,(request , response) => courses.register_course(request,response));

//https:/localhost:5000/courses
//method:get
app.get(COURSES_ROUTE,(request,response) => courses.get_all_courses(request,response));
//https:/localhost:5000/courses/feedback
//method:get
app.get(COURSES_ROUTE+"/feedback",(request,response) => courses.get_all_courses_with_feedback(request,response));


//https:/localhost:5000/courses
//method:get
app.get(COURSES_ROUTE + "/faculty",(request,response) => courses.get_all_faculty(request,response));

// //https://localhost:5000/courses/get_course/1
// //method:get

app.get(COURSES_ROUTE + "/:id",(request , response) => courses.get_course(request,response));

// //https://localhost:5000/courses/get_courses_by_faculty/1
// //method:get
// app.get(COURSES_ROUTE + "/get_courses_by_faculty/:faculty_id",(request , response) => courses.get_courses_by_faculty(request,response));

//https://localhost:5000/courses
//method:put
//input:{
//     "id": 1,
//     "name": "Intro to Programming",
//     "description": "Updated course content",
//     "faculty_id": 4
// }
app.put(COURSES_ROUTE,(request , response) => courses.update_course(request,response));

//https://localhost:5000/courses/delete_course/1
//method:delete
app.delete(COURSES_ROUTE + "/:id",(request , response) => courses.delete_course(request,response));


//define routes for test schedule
//https://localhost:5000/test_schedule/create_test_schedule
//method:post
// {
//   "test_name": "Math Exam",
//   "subject_id": 2,
//   "test_date": "2024-02-10",
//   "duration": "01:30:00",
//   "total_marks": 100
// }
app.post(TEST_SCHEDULE_ROUTE,(request,response)=> test_schedule.create_test_schedule(request,response));

//https://localhost:5000/test_schedule/get_all_test_schedules
//method:get
app.get(TEST_SCHEDULE_ROUTE,(request,response)=> test_schedule.get_all_test_schedules(request,response));

//https://localhost:5000/test_schedule/subjects
//method:get
app.get(TEST_SCHEDULE_ROUTE+("/subjects"),(request,response)=> test_schedule.get_all_subject(request,response));

// //https://localhost:5000/test_schedule/get_test_schedule/1
// //method:get
app.get(TEST_SCHEDULE_ROUTE + "/:id",(request,response)=> test_schedule.get_test_schedule(request,response));

//https://localhost:5000/test_schedule
//method:put
//error
// {
//     "id": 1,
//     "test_name": "Updated Math Exam",
//     "subject_id": 2,
//     "test_date": "2024-02-15",
//     "duration": "02:00:00",
//     "total_marks": 120
//   }
app.put(TEST_SCHEDULE_ROUTE,(request,response)=> test_schedule.update_test_schedule(request,response));

//https://localhost:5000/test_schedule/delete_test_schedule/1
//method:delete
app.delete(TEST_SCHEDULE_ROUTE + "/:id",(request,response)=> test_schedule.delete_test_schedule(request,response));

//create api for assignment
//https://localhost:5000/assignment
//method:post
// {
//     "name": "Math Exam",
//     "description": "Final exam covering all topics.",
//     "due_date": "2024-02-10",
//     "total_marks": 100,
//     "subject_id": 2
//   }
app.post(ASSIGNMENT_ROUTE,(request,response)=> assignment.create_assignment(request,response));

//https://localhost:5000/assignment
//method:get

app.get(ASSIGNMENT_ROUTE,(request,response)=> assignment.get_all_assignments(request,response));

//https://localhost:5000/assignment/subjects
//method:get

app.get(ASSIGNMENT_ROUTE+"/subjects",(request,response)=> assignment.get_all_subject(request,response));

// //https://localhost:5000/assignment/1
// //method:get
app.get(ASSIGNMENT_ROUTE + "/:id",(request,response)=> assignment.get_assignment(request,response));

//https://localhost:5000/assignment
//method:put
// {
//     "title": "Updated Math Exam",
//     "description": "Updated description of the final exam.",
//     "due_date": "2024-02-15",
//     "total_marks": 120,
//     "subject_id": 2
//   }

app.put(ASSIGNMENT_ROUTE,(request,response)=> assignment.update_assignment(request,response));


//https://localhost:5000/assignment/delete_assignment
//method:delete

app.delete(ASSIGNMENT_ROUTE+ "/:id",(request,response)=> assignment.delete_assignment(request,response));

//define routes for marks
//https://localhost:5000/marks/create_mark
//method:post
// {
//     "student_id": 1,
//     "test_id": 2,
//     "marks_obtained": 85,
//     "graded_at": "2024-02-10"
// }

app.post(MARKS_ROUTE,(request,response)=> marks.create_mark(request,response));

//https://localhost:5000/marks
//method:get
app.get(MARKS_ROUTE,(request,response)=> marks.get_all_marks(request,response));

//localhost:5000/marks/students
//method:get
app.get(MARKS_ROUTE+"/students",(request,response)=> marks.get_all_students(request,response));

//https://localhost:5000/marks/test_name
//method:get
app.get(MARKS_ROUTE+"/test_name",(request,response)=> marks.get_all_test_name(request,response));


app.get(MARKS_ROUTE + "/mark/:id",(request,response)=> marks.get_mark_with_user(request,response));

// //https://localhost:5000/marks/1
// //method:get
app.get(MARKS_ROUTE + "/:id",(request,response)=> marks.get_mark(request,response));

//https://localhost:5000/marks
//method:put
// {
//     " id": 1,
//     "student_id": 1,
//     "test_id": 2,
//     "marks_obtained": 90,
//     "graded_at": "2024-02-12"
// }

app.put(MARKS_ROUTE,(request,response)=> marks.update_mark(request,response));

//https://localhost:5000/marks/delete_mark/1
//method:delete
app.delete(MARKS_ROUTE + "/:id",(request,response)=> marks.delete_mark(request,response));

//define routes for subject
//https://localhost:5000/subject/create_subject
//method:post
// {
//     title:bca
// }

app.post(SUBJECT_ROUTE,(request,response)=> subject.create_subject(request,response));

//https://localhost:5000/subject/get_subjects
//method:get
app.get(SUBJECT_ROUTE,(request,response)=> subject.get_subjects(request,response));

//https://localhost:5000/subject/update_subject
//method:put
// {
//     " id": 1,
//     "title": bba,
// }

app.put(SUBJECT_ROUTE,(request,response)=> subject.update_subject(request,response));

//https://localhost:5000/subject/delete_subject/1
//method:delete
app.delete(SUBJECT_ROUTE + "/:id",(request,response)=> subject.delete_subject(request,response));



app.listen(PORT_NO, () => {
    console.log('ready to accept request on port', PORT_NO);
});

