var requests = [];
const list_display_count = 0;
load_requests();

class Request extends React.Component {
    constructor(props, num, req) {
        super(props);
        this.open = false;
        this.num = num;
        this.id = req.id;
        this.type = req.type ? 'Reschedule' : 'Cancel';
        this.description = req.description;
        this.name = req.lname + ', ' + req.fname;
        this.datetime = req.start;  
        this.a_desc = req.a_description;
        this.end = req.end;   
    }

    expand(expand) {
        this.open = expand;
        render_requests();
    }

    render() {
        if (!this.open) {
            return (
                <li className="list-group-item" key={this.id}>
                    <div className="row">
                        <h6>Request {this.num}</h6>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{width: '60%'}}>{this.name}</td>
                                    <td rowSpan="2">
                                        <button className="btn btn-primary" onClick={() => this.expand(true)}>View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{this.type}</td>
                                </tr>
                                <tr>
                                    <td>{prettyDateAndTime(this.datetime)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="list-group-item" key={this.id}>
                    <div className="row">
                        <h6>Request {this.num}</h6>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{width: '60%'}}>{this.name}</td>
                                </tr>
                                <tr>
                                    <td>{this.type}</td>
                                </tr>
                                <tr>
                                    <td>{prettyDateAndTime(this.datetime)}</td>
                                </tr>
                                <tr>
                                    <td>Details:</td>
                                    <td>{this.description}</td>
                                </tr>
                                <tr>
                                    <td>Appointment:</td>
                                    <td>{this.a_desc}</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2">
                                        <button className="btn btn-primary" onClick={() => this.expand(false)}>Close</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            );
        }       
    }
}

function load_requests() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getRequestsOffice", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var list = JSON.parse(xhttp.responseText);

        for (var i = 0; i < list.length; i++) {
            requests[i] = new Request({}, i + 1, list[i]);
        }

        render_requests();
    };
    xhttp.send();
}

function render_requests() {
    var child = [];

    var len = (list_display_count > 0 && list_display_count < requests.length) ? list_display_count : requests.length;

    for (var i = 0; i < len; i++) {
        child[i] = requests[i].render();
    }

    ReactDOM.render(
        [child], 
        document.getElementById('list')
    );
}

function prettyDateAndTime(dateAndTime) {
    var a = new Date(dateAndTime);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[a.getMonth()] + " " + a.getDate() + " " + a.getFullYear() + " @ " + a.toLocaleTimeString();
}