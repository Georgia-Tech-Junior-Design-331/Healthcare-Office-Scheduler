var appointments = new Dynamic_List('appointments', render_appointment_item);
appointments.request_items('/getAppointments');