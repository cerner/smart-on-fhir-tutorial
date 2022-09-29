"use strict";

$(document).ready(function () {
  FHIR.oauth2.ready().then(function (client) {
    $('#holder').show();
    $('#loading').hide();
    client.patient.read().then(function (patientData) {
      var nameFirst = 'No Name';
      var nameLast = 'No Name';

      if (typeof patientData.name[0] !== 'undefined' && typeof patientData.name[0].text !== 'undefined') {
        var nameSplit = patientData.name[0].text.split(', ');
        nameFirst = nameSplit[1];
        nameLast = nameSplit[0];
      }

      $('#patient-fname').text(nameFirst);
      $('#patient-lname').text(nameLast);
      $('#gender').text(patientData.gender);
      $('#birthdate').text(patientData.birthDate);
      $('#patient-loading').hide();
      $('#patient-table').removeClass('d-none');
    }).catch(function (err) {
      $('#patient-loading').hide();
      $('#patient-error').removeClass('d-none');
    });

    client.user.read().then(function (userData) {
      var nameFirst = '';
      var nameLast = '';

      if (typeof userData.name[0] !== 'undefined' && typeof userData.name[0].text !== 'undefined') {
        var nameSplit = userData.name[0].text.split(', ');
        nameFirst = nameSplit[1];
        nameLast = nameSplit[0];
      }

      $('#user-fname').text(nameFirst);
      $('#user-lname').text(nameLast);
      $('#user-active').text(userData.active);
      $('#user-id').text(userData.id);
      $('#user-loading').hide();
      $('#user-table').removeClass('d-none');
    }).catch(function (err) {
      $('#user-loading').hide();
      $('#user-error').removeClass('d-none');
    });

    $('#get-coding-reactor-btn').click(function() {
        console.info(client);
        $('#cloud-next-loading').removeClass('d-none');
        $('#cloud-next-loading').show();
        $('#cloud-next-data').hide();
        fetch("https://rcc-gateway-rcdevgf.devgf.revcycle-cloud.net/services/coding-service/v1/optum/encounters/".concat(client.encounter.id).concat("/codings"), {
            headers: {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                'Authorization': 'Bearer ' + client.state.tokenResponse.access_token,
                'tenantId': client.state.tokenResponse.tenant
            }
        }).then(function(getCodingData) {
            return getCodingData.json();
        }).then(function(parsedGetCodingData) {
            $('#json-input1').val(JSON.stringify(parsedGetCodingData, null, 4));
            $('#cloud-next-data').removeClass('d-none');
            $('#cloud-next-loading').hide();
            $('#get-coding-reactor-btn').prop('disabled', false);
            $('#cloud-next-data').show();
        }).catch(function(err) {});
    });
});
});