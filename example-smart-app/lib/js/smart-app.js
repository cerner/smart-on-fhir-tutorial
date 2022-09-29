"use strict";

$(document).ready(function () {
console.log("fhir working!");
  FHIR.oauth2.ready().then(function (client) {
    console.log("fhir working!");
    $('#holder').show();
    $('#loading').hide();
    $('#get-coding-reactor-btn').click(function() {
        console.log("Hello cloud.next!");
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