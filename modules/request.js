function render_request_item() {
    if (this.open == null) {
        this.open = false;
    }

    if (this.type == 1) {
        this.type = 'Reschedule';
    } else if (this.type == 0) {
        this.type = 'Cancel';
    }

    if (this.urgent == 1) {
        this.urgent = 'Urgent';
    } else if (this.urgent == 0) {
        this.urgent = '';
    }

    if (!this.open) {
        return (
            <div className="row" onClick={() => {
                this.open = true;
                this.list.render();
            }}>
                <h6>Request {this.num}</h6>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width: '60%'}}>{this.p_lname + ', ' + this.p_fname}</td>
                            <td rowSpan="2">
                                <button className="btn btn-primary" onClick={() => open_appointment(this.a_id)}>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>{this.type}</td>
                        </tr>
                        <tr>
                            <td>{this.urgent}</td>
                        </tr>
                        <tr>
                            <td>{pretty_datetime(this.a_start)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="row" onClick={() => {
                this.open = false;
                this.list.render();
            }}>
                <h6>Request {this.num}</h6>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width: '60%'}}>{this.p_lname + ', ' + this.p_fname}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => open_appointment(this.a_id)}>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>{this.type}</td>
                        </tr>
                        <tr>
                            <td>{this.urgent}</td>
                        </tr>
                        <tr>
                            <td>{pretty_datetime(this.a_start)}</td>
                        </tr>
                        <tr>
                            <td>Details:</td>
                            <td>{this.description}</td>
                        </tr>
                        <tr>
                            <td>Appointment:</td>
                            <td>{this.a_description}</td>
                        </tr>
                    </tbody>
                </table>                
            </div>
        );
    }       
}