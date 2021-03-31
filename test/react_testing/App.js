import logo from './logo.svg';
import './App.css';
import TableElement from './TableElement.js';
import './upcomingAppointmentsStyle.css';

function App() {
  // Copied inline style from original page
  const divStyle = {
    fontFamily:'Roboto Light, Arial, Arial, Tahoma',
    textAlign: 'center',
    fontSize:'14px',
    marginTop:'7vw',
    width: '50vw',
    marginLeft: '25vw'
  };

  // Dummy Dataset, I'm assuming the dataset provided from the backend will be similar to this
  // Variable names copied from the schema
  var apptData = [
    {p_fname: 'Dane', p_lname: 'Koval', doctor_id: 0, datetime: '11:00am', description: 'arm-injury', status: 2},
    {p_fname: 'Drew', p_lname: 'Koval', doctor_id: 1, datetime: '12:00pm', description: 'wrist-injury', status: 1},
    {p_fname: 'Cedric', p_lname: 'Stallworth', doctor_id: 2, datetime: '12:00pm', description: 'knee-injury', status: 1}
  ];

  // Create an array of HTML code snippets to add to the DOM
  const items = []
  for (const element of apptData) {
    items.push(<TableElement objt={element} />);
  }

  return (
    <div className="App">
      <div style={divStyle}>
        <h1>Upcoming Appointments</h1>
      </div>

      <div className="container">
        {items}
      </div>

    </div>
  );
}

export default App;
