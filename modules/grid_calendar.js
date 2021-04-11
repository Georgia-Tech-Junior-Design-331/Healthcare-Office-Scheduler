class Grid_Calendar {
	//list of appointments
	//start of work day
	//end of workday

	constructor(start, end) {
		this.blocks = [];
		var block_count = (end.getHours() * 60 + end.getMinutes() - start.getHours() * 60 - start.getMinutes()) / 15;
		var current = new Date(start.getTime());

		for (var i = 0; i < block_count; i++) {
			this.blocks.push(current);
			var current = new Date(current.getTime());
			current.setMinutes(current.getMinutes() + 15);
		}
	}

	grid() {
		return (
			<table>
				<tbody>
					<tr>
						<th>Time</th>
						<th>Sun</th>
						<th>Mon</th>
						<th>Tues</th>
						<th>Wed</th>
						<th>Thurs</th>
						<th>Fri</th>
						<th>Sat</th>
					</tr>
					{
						this.blocks.map((item, i) => {
							var end = new Date(item.getTime());
							end.setMinutes(end.getMinutes() + 15);
							end.setSeconds(end.getSeconds() - 1);
							return (
								<tr key={i} id={'block' + i}>
									<th className="time">{item.toLocaleTimeString() + ' - ' + end.toLocaleTimeString()}</th>
									<th className="sun"></th>
									<th className="mon"></th>
									<th className="tues"></th>
									<th className="wed"></th>
									<th className="thurs"></th>
									<th className="fri"></th>
									<th className="sat"></th>
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

	render_appointments() {
		/*
		iterate over all appointments
		match appointment to row(s)
		for each row, match to day (by class)
		mark them
		*/
	}
}

function startend() {
	var start = new Date();
	var end = new Date(start.getTime());
	end.setMinutes(end.getMinutes() + 60);
	return [start, end];
}

var se = startend();
var cal = new Grid_Calendar(se[0], se[1]);
cal.render_grid();