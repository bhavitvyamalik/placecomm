const Student = require('../models/student.model.js');

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "student name can not be empty"
        });
    }

    // Create a student
    const student = new Student({
        name: req.body.name || "Untitled student",
        department: req.body.department,
        rollno: req.body.rollno,
        cgpa: req.body.cgpa,
    });

    // Save student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentID, {
        name: req.body.name || "Untitled student",
        department: req.body.department,
        rollno: req.body.rollno,
        cgpa: req.body.cgpa,
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentID
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentID
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.studentID
        });
    });
};

// Update a student company identified by the studentId in the request
exports.update2 = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find student and update it with the request body
    Student.update(req.params.studentID,{
        $push: {
            enlisted: req.body.enlisted
        }
    }).exec(function(err, user){
        console.log(req.body.enlisted + "is added to the list of your companies");
    })
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};
