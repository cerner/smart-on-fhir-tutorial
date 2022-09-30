"use strict";

$(document).ready(function () {
console.log("Checking fhir.");
  FHIR.oauth2.ready().then(function (client) {
    var domainMap = {
      '2c400054-42d8-4e74-87b7-80b5bd5fde9f': 'deveng',
      'eb2384f8-839e-4c6e-8b29-18e71db1a0b1': '64dev',
      'fb8067d7-e012-4703-8888-17b86d11f0f8': 'solgm',
      '9ce2bac1-f00e-43d9-ab88-89e1d4c52e1a': 'eng18',
      '5a12b3e8-5941-4076-8592-1fb463441c68': 'swedv',
      '34fc7274-1120-4899-937d-a9ea1becc848': 'm18dv',
    };
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
    client.encounter.read().then(function (encounterData) {
      $('#enct-class').text(encounterData.class);
      $('#location').text(encounterData.location.map(function (locObj) {
        return locObj.location.display;
      }).join(", "));
      $('#start').text(new Date(encounterData.period.start).toLocaleString());
      $('#end').text(new Date(encounterData.period.end).toLocaleString());
      $('#enct-loading').hide();
      $('#enct-table').removeClass('d-none');
    }).catch(function (err) {
      $('#enct-loading').hide();
      $('#enct-error').removeClass('d-none');
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
    fetch("service/get-codes?domain=".concat(domainMap[client.state.tokenResponse.tenant], "&encounter=").concat(client.encounter.id), {
      headers: {
        'consumer-key': 'com.cerner.icdplus',
        'Accept': "application/json"
      }
    }).then(function (alvaData) {
      return alvaData.json();
    }).then(function (parsedAlvaData) {
      $('#json-input').val(JSON.stringify(parsedAlvaData, null, 4));
      $('#alva-loading').hide();
      $('#encounter-data').removeClass('d-none');
    }).catch(function (err) {
      $('#alva-loading').hide();
      $('#alva-error').removeClass('d-none');
    });
    $('#save-codes-btn').click(function () {
      var saveBody;
      $('#alva-loading').show();
      $('#alva-save-error').hide();
      $('#save-codes-btn').prop('disabled', true);
      $('#encounter-data').hide();

      try {
        saveBody = JSON.stringify(JSON.parse($("#json-input").val()));
        $('#json-parse-error').addClass('d-none');
      } catch (err) {
        $('#json-parse-error').removeClass('d-none');
        throw err;
      }

      fetch("service/save-codes?domain=".concat(domainMap[client.state.tokenResponse.tenant], "&encounter=").concat(client.encounter.id) + ($('#enable-compare-date-time').is(":checked") ? "&compareDateTime=".concat(new Date($('#date-time-input').val()).toISOString()) : ''), {
        headers: {
          'consumer-key': 'com.cerner.icdplus',
          'Accept': "application/json"
        },
        method: 'POST',
        body: saveBody
      }).then(function (saveData) {
        return saveData.json();
      }).then(function (parsedSaveData) {
        $('#json-input').val(JSON.stringify(parsedSaveData, null, 4));

        if (parsedSaveData.msg !== "No response") {
          throw parsedSaveData;
        }

        $('#alva-save-ok').removeClass('d-none');
        $('#alva-save-error').hide();
        $('#alva-loading').hide();
        $('#save-codes-btn').prop('disabled', false);
        $('#encounter-data').show();
      }).catch(function (err) {
        $('#alva-save-error').removeClass('d-none');
        $('#alva-save-error').show();
        $('#alva-loading').hide();
        $('#alva-save-ok').hide();
        $('#save-codes-btn').prop('disabled', false);
      });
    });

    $('#get-coding-reactor-btn').click(function() {
        $('#cloud-next-loading').removeClass('d-none');
        $('#cloud-next-loading').show();
        $('#cloud-next-data').hide();
        fetch("https://rcc-gateway-rcdevgf.devgf.revcycle-cloud.net/services/coding-service/v1/optum/encounters/100223648/codings"), {
            headers: {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                'Authorization': 'Bearer eyJhbGciOiJub25lIn0.eyJpc3MiOiJodHRwczpcL1wvYXV0aG9yaXphdGlvbi5pbnRlZ3JhdGlvbmNlcm5lci5jb21cL2ludHJvc3BlY3Rpb24iLCJpYXQiOjE2MDUxODgwMDAsInVybjpjZXJuZXI6YXV0aG9yaXphdGlvbjpzeXN0ZW0tYWNjb3VudC1jcmVkZW50aWFsLXRva2VuOnZlcnNpb246MSI6eyJ2ZXIiOiIxLjAiLCJzZWNyZXQiOiJHeWprV0tyRld2Nmd5b1RxN3U2QVp6R3ZqcHA5dlhyZCIsImtleSI6IjAyNmI4NTFjLTUyNjYtNDIzYS1iNjg2LTU2NDJiNjEzYzk1YSJ9LCJqdGkiOiJmNDc5OTQ3Mi1jMDIxLTQ5MTEtODg5OS02ZjVkZDU2MTdhZWIifQ.',
                'tenantId': '2e3bfff6-5b5b-4474-9058-caff792dbefa'
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

    $('#get-codes-btn').click(function () {
      $('#alva-loading').show();
      $('#alva-save-error').hide();
      $('#get-codes-btn').prop('disabled', true);
      $('#encounter-data').hide();
      fetch("service/get-codes?domain=".concat(domainMap[client.state.tokenResponse.tenant], "&encounter=").concat(client.encounter.id), {
        headers: {
          'consumer-key': 'com.cerner.icdplus',
          'Accept': "application/json"
        }
      }).then(function (alvaData) {
        return alvaData.json();
      }).then(function (parsedAlvaData) {
        $('#json-input').val(JSON.stringify(parsedAlvaData, null, 4));
        $('#alva-error').hide();
        $('#alva-loading').hide();
        $('#get-codes-btn').prop('disabled', false);
        $('#encounter-data').show();
      }).catch(function (err) {
        $('#alva-error').removeClass('d-none');
        $('#alva-error').show();
        $('#alva-loading').hide();
        $('#get-codes-btn').prop('disabled', false);
      });
    });
    $('#refresh-btn').click(function () {
      client.refresh().then(console.log).catch(console.error);
    });
  }).catch(function (error) {
    $('#loading').hide();
    $('#errors').html("<div class=\"alert alert-danger\"> Failed to call FHIR Service - ".concat(error.message, " </div>"));
  });
  $('#enable-compare-date-time').change(function () {
    $('#date-time-input').prop('disabled', !$('#enable-compare-date-time').is(":checked"));
    $('#date-time-input').val(null);
  });
});