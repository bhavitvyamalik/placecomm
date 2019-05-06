const Company = require('../models/company.model.js');

// Create and Save a new Company
exports.create = (req, res) => {
    //console.log(req.body)
    // Validate request
    if(req.body==={}) {
        return res.status(400).send({
            message: "Company content can not be empty"
        });
    }

    // Create a Company
    const company = new Company({
        name: req.body.name || "Untitled Company",
        profile: req.body.profile || "NIL",
        ctc: req.body.ctc
    });

    // Save Company in the database
    company.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the company."
        });
    });
};

// Retrieve and return all companies from the database.
exports.findAll = (req, res) => {
    Company.find()
    .then(companies => {
        res.send(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companys."
        });
    });
};

// Delete a company with the specified companyId in the request
exports.delete = (req, res) => {
    Company.findByIdAndRemove(req.params.companyID)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyID
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyID
            });
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.companyID
        });
    });
};
