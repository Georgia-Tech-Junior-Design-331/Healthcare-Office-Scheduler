document.getElementById('login').onclick = function() {
	var account = {};
	var body = {account: account};
	account.username = document.getElementById('username').value;
	account.password = document.getElementById('password').value;

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/verify", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');


	xhttp.onload = function() {
		// var response = JSON.parse(xhttp.response);
		
		// var xhttp1 = new XMLHttpRequest();
		// xhttp1.open("POST", "/setPID", true);
		// xhttp1.setRequestHeader('Content-Type', 'application/json');

		// // var id_to_use = JSON.parse(xhttp.response).id;
		
		// var p_body = {id: -1};
		// p_body.id = response.id;
		
		// xhttp1.onload = function() {
			alert("Successfully requested!");
			location.href = 'patient/home';
		// };
		// xhttp1.send(JSON.stringify(p_body));
		
		// console.log(JSON.parse(xhttp.response).id);
	};
    xhttp.send(JSON.stringify(body));

}