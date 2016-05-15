var pacienti_ID = ["cdbceb38-191f-419c-96f1-c4182a004951","0f6824b6-bd1b-4dcf-8e48-f51391d5f428","d6a3a5a1-17f7-4178-9f74-440d87cc2781","3eb872ea-fef6-460f-9e13-6a29c3dd3866","8027690a-7ec8-4caf-849d-6fac45d07edc","664dd4d0-ec1f-4d6d-b87a-6d5253d61800","1a30f45c-bf70-4948-abe4-246f386de07c","23e2e067-2fbf-4980-897d-0849706f582d","02031d7f-2c26-40fe-a5ad-36de8bf236cd"];
var pacienti = [];

$(document).ready(function() {

    preberiEHR_pacienti();

});


var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = 'ales.smokvina@gmail.com';
var password = 'ehr4ales';


function getSessionID() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}
function preberiEHR_pacienti() {
    var i;
    for (i = 0; i < pacienti_ID.length; i++) {
        var firstName;
        var lastName;
        var gender;
        var dateOfBirth;
        var height;
        var heightUnit;
        var weight;
        var weightUnit;
        var systolic;
        var diastolic;
        var pressureUnit;
        var timePressure;
        var temperature;
        var temperatureUnit;
        var timeTemp;
        var spo2;
        var allergy = [];
        
        var deferred = $.Deferred();
        
        var post = $.ajax({
        url: baseUrl + "/demographics/ehr/" + pacienti_ID[i] + "/party",
        type: 'GET',
        headers: {"Ehr-Session": getSessionID()},
        success: function (data) {
            firstName = data.party.firstNames;
            lastName = data.party.lastNames;
            gender = data.party.gender;
            dateOfBirth = data.party.dateOfBirth;
        }}, $.ajax({
	    url: baseUrl + "/view/" + pacienti_ID[i] + "/" + "height",
	    type: 'GET',
	    headers: {"Ehr-Session": getSessionID()},
	    success: function (res) {
	    	if (res.length > 0) {
	            height = res[res.length-1].height;
	            heightUnit = res[res.length-1].unit;
	    	}
	    }
    	}, $.ajax({
    	    url: baseUrl + "/view/" + pacienti_ID[i] + "/" + "weight",
    	    type: 'GET',
    	    headers: {"Ehr-Session":  getSessionID()},
    	    success: function (res) {
    	    	if (res.length > 0) {
		            weight = res[res.length-1].weight;
		            weightUnit = res[res.length-1].unit;
    	    	} 
        }}, $.ajax({
    	    url: baseUrl + "/view/" + pacienti_ID[i]  + "/" + "blood_pressure",
    	    type: 'GET',
    	    headers: {"Ehr-Session": getSessionID()},
    	    success: function (res) {
    	    	if (res.length > 0) {
		            timePressure = res[res.length-1].time;
		            systolic = res[res.length-1].systolic;
		            diastolic = res[res.length-1].diastolic;
		            pressureUnit = res[res.length-1].unit
    	    	} 
    	}},     	$.ajax({
    	    url: baseUrl + "/view/" + pacienti_ID[i] + "/" + "spO2",
    	    type: 'GET',
    	    headers: {"Ehr-Session": getSessionID()},
    	    success: function (res) {
    	    	if (res.length > 0) {
                    spo2 = res[res.length-1].spO2;
    	    	}
    	    }},     	$.ajax({
    	    url: baseUrl + "/view/" + pacienti_ID[i] + "/" + "body_temperature",
    	    type: 'GET',
    	    headers: {"Ehr-Session": getSessionID()},
    	    success: function (res) {
    	    	if (res.length > 0) {
		            timeTemp = res[res.length-1].time
		            temperature = res[res.length-1].temperature
		            temperatureUnit = res[res.length-1].unit;
    	    	}
    	}}, $.ajax({
    	    url: baseUrl + "/view/" + pacienti_ID[i] + "/" + "allergy",
    	    type: 'GET',
    	    headers: {"Ehr-Session": getSessionID()},
    	    success: function (res) {
    	    	if (res.length > 0) {
    	    	    for (var i in res)
		            allergy[i] = res[i].allergy;
    	    	}
    	}})))))));

        post.done(function(p) {

            var pacient = {
            	"firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "dateOfBirth": dateOfBirth,
                "height": height,
                "heightUnit": heightUnit,
                "weight": weight,
                "weightUnit": weightUnit,
                "systolic": systolic,
                "diastolic": diastolic,
                "pressureUnit": pressureUnit,
                "timePressure": timePressure,
                "temperature": temperature,
                "temperatureUnit": temperatureUnit,
                "timeTemp": timeTemp,
                "spo2": spo2,
                "allergy": allergy
        	};
    	
        	pacienti[i] = pacient;
        	console.log(pacient);
        });
    }
}
