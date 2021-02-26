import logo from './logo.svg';
import './App.css';
import './upcomingAppointmentsStyle.css';

function TableElement(props) {
  // Access to the current appointment, passed in to the component as a prop
  const currElement = props.objt;
  // Assume that we have access to a mapping of doctor ID to doctor, like below
  const drIdMapping = ["Dr. Burdell", "Dr. Ramachandran", "Dr. Girard"]

  return (

    <div className="element-container">
      <div className="info-container">
        <div className="element-box"> <b>Patient: </b>{`${currElement.p_lname}, ${currElement.p_fname}`}</div>
        <div className="element-box"><b>Appointment Time: </b>{`${currElement.datetime}`}</div>
        <div className="element-box"><b>Reason For Visit: </b>{`${currElement.description}`}</div>
        <div className="element-box"><b>Doctor ID: </b>{`${drIdMapping[currElement.doctor_id]}`}</div>
      </div>
      <button className='view-button'>View</button>
    </div>
  );
}

export default TableElement;
