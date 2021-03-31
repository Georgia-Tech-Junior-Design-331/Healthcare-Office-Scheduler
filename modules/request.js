function render_request_item() {
    if (this.open == null) {
        this.open = false;
    }

    if (this.type == 1) {
        this.type = 'Reschedule';
    } else if (this.type == 0) {
        this.type = 'Cancel';
    }

    if (!this.open) {
        return (
            <div className="row">
                <h6>Request {this.num}</h6>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width: '60%'}}>{this.name}</td>
                            <td rowSpan="2">
                                <button className="btn btn-primary" onClick={() => {
                                    this.open = true;
                                    this.list.render();
                                }}>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>{this.type}</td>
                        </tr>
                        <tr>
                            <td>{pretty_datetime(this.start)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
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
                            <td>{pretty_datetime(this.start)}</td>
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
                                <button className="btn btn-primary" onClick={() => {
                                    this.open = false;
                                    this.list.render();
                                }}>Close</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }       
}