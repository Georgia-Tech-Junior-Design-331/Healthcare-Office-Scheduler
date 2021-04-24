//A Dynamic_List can be created to aid in rendering custom lists. The render_func specifies how each item should be rendered.
class Dynamic_List {

	constructor(id, render_func) {
		this.list_display_count = -1;
		this.list = [];
		this.id = id;
		this.render_func = render_func;
	}

	request_items(request, body) {
		var xhttp = new XMLHttpRequest();
		xhttp.open('POST', request, true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.onload = () => {
			this.list = [];
			var response = JSON.parse(xhttp.responseText);

			for (var i = 0; i < response.length; i++) {
				this.list[i] = response[i];
				this.list[i].num = i + 1;
				this.list[i].list = this;
				this.list[i].render = this.render_func;
			}

			this.render();
		};
		xhttp.send(JSON.stringify(body));
	}

	render() {
		var child = [];

		var len = (this.list_display_count > 0 && this.list_display_count < this.list.length) ? this.list_display_count : this.list.length;

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