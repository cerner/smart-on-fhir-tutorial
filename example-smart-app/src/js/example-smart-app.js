(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();

        // var obv = smart.patient.api.fetchAll({
        //   type: 'Observation',
        //   query: {
        //     code: {
        //       $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
        //             'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
        //             'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
        //     }
        //   }
        // });

        var obv = smart.patient.api.fetchAll({
          type: 'Observation',
          query: {
            code: {
              $or: ['http://loinc.org|26478-8', 'http://loinc.org|2345-7']
            }
          }
        });

        console.log('patient:');
        console.log(patient)

        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient, obv) {
          var byCodes = smart.byCodes(obv, 'code');
          console.log("byCodes:");
          console.log(byCodes('26478-8'));
          console.log(byCodes('2345-7'));

          var gender = patient.gender;

          var fname = '';
          var lname = '';

          if (typeof patient.name[0] !== 'undefined') {
            fname = patient.name[0].given.join(' ');
            lname = patient.name[0].family;
          }

          // Observations
          lymph = byCodes('26478-8');
          // Cerner SoF Tutorial Observations
          // var height = byCodes('8302-2');
          // var systolicbp = getBloodPressureValue(byCodes('55284-4'),'8480-6');
          // var diastolicbp = getBloodPressureValue(byCodes('55284-4'),'8462-4');
          // var hdl = byCodes('2085-9');
          // var ldl = byCodes('2089-1');


          var p = defaultPatient();
          p.birthdate = patient.birthDate;
          p.gender = gender;
          p.fname = fname;
          p.lname = lname;

          // Observations
          p.lymph = getQuantityValueAndUnit(lymph[0]);


          // Cerner SoF Tutorial Observations
          // p.height = getQuantityValueAndUnit(height[0]);

          // if (typeof systolicbp != 'undefined')  {
          //   p.systolicbp = systolicbp;
          // }

          // if (typeof diastolicbp != 'undefined') {
          //   p.diastolicbp = diastolicbp;
          // }

          // p.hdl = getQuantityValueAndUnit(hdl[0]);
          // p.ldl = getQuantityValueAndUnit(ldl[0]);
          console.log('p:');
          console.log(p);
          ret.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };

  function defaultPatient(){
    return {
      fname: {value: ''},
      lname: {value: ''},
      gender: {value: ''},
      birthdate: {value: ''},
      lymph: {value: ''}

      // Cerner SoF Tutorial Observations
      // height: {value: ''},
      // systolicbp: {value: ''},
      // diastolicbp: {value: ''},
      // ldl: {value: ''},
      // hdl: {value: ''},
    };
  }

  // Helper Function

  function getBloodPressureValue(BPObservations, typeOfPressure) {
    var formattedBPObservations = [];
    BPObservations.forEach(function(observation){
      var BP = observation.component.find(function(component){
        return component.code.coding.find(function(coding) {
          return coding.code == typeOfPressure;
        });
      });
      if (BP) {
        observation.valueQuantity = BP.valueQuantity;
        formattedBPObservations.push(observation);
      }
    });

    return getQuantityValueAndUnit(formattedBPObservations[0]);
  }

  function getQuantityValueAndUnit(ob) {
    if (typeof ob != 'undefined' &&
        typeof ob.valueQuantity != 'undefined' &&
        typeof ob.valueQuantity.value != 'undefined' &&
        typeof ob.valueQuantity.unit != 'undefined') {
          return ob.valueQuantity.value + ' ' + ob.valueQuantity.unit;
    } else {
      return undefined;
    }
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#fname').html(p.fname);
    $('#lname').html(p.lname);
    $('#gender').html(p.gender);
    $('#birthdate').html(p.birthdate);
    $('#lymph').html(p.lymph);
    
    // Cerner SoF Tutorial Observations

    // $('#height').html(p.height);
    // $('#systolicbp').html(p.systolicbp);
    // $('#diastolicbp').html(p.diastolicbp);
    // $('#ldl').html(p.ldl);
    // $('#hdl').html(p.hdl);
  };

})(window);
