class Dynamic_List {

	constructor(id) {
		this.list_display_count = -1;
		this.list = [];
		this.id = id;
	}

	request_items(render_func, request) {
		var xhttp = new XMLHttpRequest();
    	xhttp.open("GET", request, true);
    	xhttp.setRequestHeader('Content-Type', 'application/json');
    	xhttp.onload = () => {
    		this.list = [];
		    var response = JSON.parse(xhttp.responseText);

		    for (var i = 0; i < response.length; i++) {
		        this.list[i] = response[i];
		        this.list[i].num = i + 1;
		      	this.list[i].list = this;
		        this.list[i].render = render_func;
		    }

		    this.render();
		};
		xhttp.send();
	}

	render() {
		var child = [];

	    var len = (this.list_display_count > 0 && this.list_display_count < list.length) ? this.list_display_count : this.list.length;

	    for (var i = 0; i < len; i++) {
	        child[i] = (
	        	<li className="list-group-item" key={this.list[i].num}>
		        	{this.list[i].render()}
		       	</li>
		    );
	    }

	    ReactDOM.render(
	        [child], 
	        document.getElementById(this.id)
	    );
	}
}