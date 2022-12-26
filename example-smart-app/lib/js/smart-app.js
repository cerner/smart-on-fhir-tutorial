"use strict";

$(document).ready(function () {
console.log("Checking fhir.");
  FHIR.oauth2.ready().then(function (client) {
    $('#holder').show();
    $('#loading').hide();
    $('#get-coding-reactor-btn').click(function() {
      console.log("Calling cloud.next.");
        $('#cloud-next-loading').removeClass('d-none');
        $('#cloud-next-loading').show();
        $('#cloud-next-data').hide();
        fetch("https://rcc-gateway-rcdevgf.devgf.revcycle-cloud.net/services/coding-service/v1/optum/mock/patients/".concat(client.state.tokenResponse.patient).concat("/encounters/").concat(client.encounter.id).concat("/codings"), {
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

    $('#get-discovery-service').click(function() {
          console.log("Calling discovery service.");
            $('#cloud-next-loading').removeClass('d-none');
            $('#cloud-next-loading').show();
            $('#cloud-next-data').hide();
            fetch("https://millennia.integrationcerner.com/instance/".concat(client.state.tokenResponse.tenant), {
               method: "GET",
                mode: 'no-cors',
                headers: {
                    'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                    'Access-Control-Allow-Origin' : '*'
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

    $('#refresh-btn').click(function () {
      client.refresh().then(console.log).catch(console.error);
    });
  });
});
