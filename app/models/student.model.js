var mongoose = require('mongoose');
//var restful = require('node-restful')
var ObjectId = mongoose.Schema.Types.ObjectId;

const studentSchema = mongoose.Schema({
    name: String,
    department: String,
    rollno: Number,
    cgpa: Number,
    enlisted: [{ type : ObjectId, ref: 'tblstudent' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('tblstudent', studentSchema);
