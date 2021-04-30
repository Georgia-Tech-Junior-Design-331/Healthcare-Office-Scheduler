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
* Time picking for appointments: Lacks proper UX for managing a complex schedule to communicate busy or free times.
  * We were looking into: https://fullcalendar.io/docs. See "web/test" folder and its page for our beginning-stage implementation.
* Doctor Accounts: While database structure is implemented, doctors do not have log-in credentials or their own application.
* A general lack of robustness testing, particularly across web browsers.


### Missing Implementation
* Account/schedule integration with Electronic Health Record systems.
* Data security architecture needs to be reviewed.
 

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
* For Windows, we used the MySQL Community Installer:
https://dev.mysql.com/downloads/installer/ 
Choose the one with more downloads.

* For Mac, we used MySQL Workbench:
https://dev.mysql.com/downloads/workbench/ 

* Skip making an account by clicking the link at the bottom to start the download

* Once in installer:
  * Setup Type: Developer Default
  * Legacy authentication method
  * On accounts screen: Create your own password, and add a new user with Username = "server" and Password = "Password123"
  * All other settings should likely be kept as default.

* Your two useful programs you should now have: MySQL Workbench and MySQL Installer
  * Installer: adding new parts to MySQL. Ideally, you shouldn’t need it after you get things set up, but we had to reinstall some components when some things didn’t work.
  * Workbench: Useful for looking at your database to see your data. Once things are set up, on the home screen, click on the server connection to get to the database. On the administration tab of the left-side navigator, you can view the server status. On the Schemas tab of the left-side navigator, you can see your database. If you have already created one (see below) click on “db” in the navigator and you should see all the tables.


**Install Node.js:**

* Download and install Node js 

  * https://nodejs.org/en/ 
  * This should just work. Download the latest recommended version, and follow the installation instructions. Also check the box to install the extra dev tools, and follow their instructions.

 
**Clone project from GitHub:**

* Clone the project from GitHub as you would any other project 

**Create and populate your database with dummy data:**

* In a command console, navigate to the main project folder, which contains “create_db.js” 

* Run “node create_db.js” in the command line 

* This will set up the database and tables the application will use. 
* You can now populate your database with dummy data. To do this, navigate into the “test” folder in your command line. 
  * You can run “node dummy_all.js” in your command console to populate everything.


* You can also populate each table individually:

  * Run “node dummy_doctors.js” to populate doctors 

  * Run “node dummy_patients.js” to populate patients 

  * Run “node dummy_appointments.js” to populate patient appointments 

  * Run “node dummy_requests.js” to populate appointment change requests 
  * If script does not exit automatically, click “Control + C” on the keyboard to exit the script. Then, continue running the remaining scripts in the same fashion.

**Start the app:**

* In a command console, navigate to the main project folder, which contains “server.js” 

* Run “node server.js” in the command line 

* In a web browser, navigate to “localhost:8080” 

* You should now see the project’s webpage. From here, you can get to the patient-side or office-side. 
  * For the patient-side, you need to log in. Using our dummy data, all usernames are the first initial and last name with no spaces, password is 1234.

