function send_request(filters) {	
	const request = '/getRequests';
	const body = {filters: filters};
	requests.request_items(request, body);
}

var filters = {};
var requests = new Dynamic_List('requests', render_request_item);
send_request(filters);