document.getElementById('login').onclick = function() {
	var account = {};
	var body = {account: account};
	account.username = document.getElementById('username').value;
	account.password = document.getElementById('password').value;

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/verify", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

	xhttp.onload = function() {
		var xhttp1 = new XMLHttpRequest();
		xhttp1.open("POST", "/setPID", true);
		xhttp1.setRequestHeader('Content-Type', 'application/json');

		// var id_to_use = JSON.parse(xhttp.response).id;
		
		var patient_id = {};
		var body = {patient_id: patient_id};
		patient_id.id = JSON.parse(xhttp.response).id;
		console.log(body.patient_id.id);
		
		xhttp1.onload = function() {
			console.log(xhttp1.response)
		};
		
		xhttp1.send(JSON.stringify(body));
		// console.log(JSON.parse(xhttp.response).id);
	};

    xhttp.send(JSON.stringify(body));
}