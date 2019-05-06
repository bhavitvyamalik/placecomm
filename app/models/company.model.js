var mongoose = require('mongoose');
//var restful = require('node-restful')

const companySchema = mongoose.Schema({
    name: String,
    profile: String,
    ctc: String
}, {
    timestamps:true
});

module.exports = mongoose.model('tblcompany', companySchema);
