module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // Create a new Student
    app.post('/students', students.create);

    // Retrieve all students
    app.get('/students', students.findAll);

    // Update a Student's details with studentID
    app.put('/students/:studentID', students.update);

    // Register/deregister Student's for a company
    app.put('/students/:studentID/update', students.update2);

    // Delete a Student with studentID
    app.delete('/students/:studentID', students.delete);
}
