document.getElementById('login').onclick = function() {
	var account = {};
	account.username = document.getElementById('username').value;
	account.password = document.getElementById('password').value;

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/verify", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(account));
}