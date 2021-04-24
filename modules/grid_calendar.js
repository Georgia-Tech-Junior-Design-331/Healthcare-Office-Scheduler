var grids = 0;

class Grid_Calendar {

	constructor(start, end, duration = 15) {
		this.blocks = [];
		this.id = 'grid' + grids;
		grids++;

		var block_count = (end.getHours() * 60 + end.getMinutes() - start.getHours() * 60 - start.getMinutes()) / duration;

		for (var i = 0; i < 7; i++) {
			this.blocks[i] = [];
			var current = new Date(start.getTime());

			for (var j = 0; j < block_count; j++) {
				var end = new Date(current.getTime());
				end.setMinutes(end.getMinutes() + duration);
				end.setSeconds(end.getSeconds() - 1);

				this.blocks[i][j] = {
					start: {
						hour: current.getHours(), minute: current.getMinutes(), second: current.getSeconds()
					},
					end: {
						hour: end.getHours(), minute: end.getMinutes(), second: end.getSeconds()
					}
				};

				this.blocks[i][j].start.string = this.time_string(this.blocks[i][j].start);
				this.blocks[i][j].end.string = this.time_string(this.blocks[i][j].end);
				current.setMinutes(current.getMinutes() + duration);
			}
		}		
	}

	time_string(block_time) {
		var h = block_time.hour;
		var m = block_time.minute;
		var s = block_time.second;
		var hstr = (h < 10) ? '0' + h : '' + h;
		var mstr = (m < 10) ? '0' + m : '' + m;
		var sstr = (s < 10) ? '0' + s : '' + s;
		return hstr + ':' + mstr + ':' + sstr;
	}

	grid() {
		return (
			<table id={this.id}>
				<tbody>
					<tr>
						<th>Time</th>
						<th width="100px">Sunday</th>
						<th width="100px">Monday</th>
						<th width="100px">Tuesday</th>
						<th width="100px">Wednesday</th>
						<th width="100px">Thursday</th>
						<th width="100px">Friday</th>
						<th width="100px">Saturday</th>
					</tr>
					{
						this.blocks[0].map((block, i) => {
							return (
								<tr key={i}>
									<th className="time">{block.start.string + ' - ' + block.end.string}</th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		)
	}

	render_grid() {
		ReactDOM.render(
            <div>
                {this.grid()}
            </div>
            , document.getElementById('grid')
        );
	}

	render_appointments(filters) {	
		var xhttp = new XMLHttpRequest();
		var body = {filters: filters};
		xhttp.open('POST', 'getAppointments', true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.onload = () => {			
			this.appointments = JSON.parse(xhttp.responseText);
			var table = document.getElementById(this.id);

			for (var i = 0; i < this.appointments.length; i++) {
				let a = this.appointments[i];
				a.start = new Date(a.start);
				a.end = new Date(a.end);
				var day = a.start.getDay();
				var blocks = this.blocks[day];
				var start_index = 0;

				for (var j = blocks.length - 1; j >= 0; j--) {
					var start = blocks[j].start;
					var block_time = start.hour * 3600 + start.minute * 60 + start.second;
					start = a.start;
					var start_time = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
					var end = a.end;
					var end_time = end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds();

					if (block_time < end_time) {
						var cell = table.rows[j + 1].cells[day + 1];
						cell.style.backgroundColor = 'green';
						cell.onclick = function() {
							alert(a.id);
						};

						if (block_time <= start_time) {
							start_index = j;
							break;
						}
					}					
				}
			}
		};
		xhttp.send(JSON.stringify(body));
	}
}