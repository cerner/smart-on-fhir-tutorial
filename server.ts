const fhirClient = require("fhirclient");

// This is what the EHR will call
app.get("/launch", (req, res) => {
    fhirClient(req, res).authorize({
        "client_id": "2a1b9027-c001-49f8-a1e6-5011079274fb",
        "scope": "patient/*.read"
    });
});

// This is what the Auth server will redirect to
app.get("/", (req, res) => {
    fhirClient(req, res).ready()
        .then(client => client.request("Patient"))
        .then(res.json)
        .catch(res.json);
});
