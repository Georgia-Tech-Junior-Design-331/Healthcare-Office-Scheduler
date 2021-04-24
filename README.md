# Healthcare-Office-Scheduler
GT Junior Design Team 331's project.
We are building a scheduler for health offices to manage and communicate with their patients.


# Spring 2021 Release Notes
## Features

### Database 

* Functionality for adding, removing, and modifying any information that must be stored exists 

### Office-side application 

**Home Page**

* View upcoming appointments, or appointments by day 

**Manage Accounts Page**

* Add patient, doctor accounts 

* View/Remove accounts 

**Requests Page**

* View upcomming appointment requests, modify appointments to match requests 

**Add Appointment Page**

* Add a patient appointment 

**Appointments Page**

* Can view appointments, filter by patient, doctor, time

### Patient-side application

**Login**

* Can login with their account assigned by the office

**Home Page**

* View upcoming appointments, or appointments by day 

**Request a Delay Page**

* Make a delay request of the appointment

**Notification Setting Page**

* Change the method to receive the notification by email or/and SMS.

## Known Issues and Future Work

### Partial Implementation

* Patient Contacting: Structure is set up for testing with a personal gmail, but not for mass mailing.
* Time picking for appointments: Lacks proper UX for managing a complex schedule to communicate busy or free times. We were looking into: https://fullcalendar.io/docs
* Doctor Accounts: While database structure is implemented, doctors do not have log-in credentials or their own application.
* A general lack of robustness testing.

### Missing Implementation
* Account/schedule integration with Electronic Health Record systems.
 

# Install Guide  
This guide will describe what you need to do to get a working development environment for this project. 

## Requirements:
* A MySQL database and server for storage 
  * https://dev.mysql.com/downloads/installer/

* Node.js 
  * https://nodejs.org/en/

* Plugins/dependencies:  
  * All other dependencies are delivered through CDN. No installation necessary. 

## Step-by-step:

**Install a MySQL server:**

* Download and install a MySQL development server for your machine 

  * We used the MySQL Community Installer: 

  * https://dev.mysql.com/downloads/installer/  

**Install Node.js:**

* Download and install Node js 

  * https://nodejs.org/en/ 
 
**Clone project from GitHub:**

* Clone the project from GitHub as you would any other project 

**Create and populate your database with dummy data:**

* In a command console, navigate to the main project folder, which contains “create_db.js” 

* Run “node create_db.js” in the command line 

* This will set up the database and tables the application will use. 

* You can now populate your database with dummy data. To do this, navigate into the “test” folder in your command line. 

  * Run “node dummy_doctors.js” to populate doctors 

  * Run “node dummy_patients.js” to populate patients 

  * Run “node dummy_appointments.js” to populate patient appointments 

  * Run “node dummy_requests.js” to populate appointment change requests 

**Start the app:**

* In a command console, navigate to the main project folder, which contains “server.js” 

* Run “node server.js” in the command line 

* In a web browser, navigate to “localhost:8080” 

* You should now see the project’s webpage. From here, you can get to the patient-side or office-side. 

