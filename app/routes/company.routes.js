module.exports = (app) => {
    const companies = require('../controllers/company.controller.js');

    // Create a new Company
    app.post('/companies', companies.create);

    // Retrieve all companies
    app.get('/companies', companies.findAll);

    // Delete a Company with companyID
    app.delete('/companies/:companyID', companies.delete);
}
