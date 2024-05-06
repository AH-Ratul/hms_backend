const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;

//---------- middlewares ------------
app.use(cors());
app.use(express.json());

//------------------ imports routes ---------------------------
const adminSignup = require("./route/adminSignup/adminSignup");
const adminLogin = require("./route/adminLogin/adminLogin");
const userSignup = require("./route/userSignup/userSignup");
const userLogin = require("./route/userLogin/userLogin");
const addRoom = require("./route/Room/addRoom");
const getRoom = require("./route/Room/getRoom");
const addemployee = require("./route/employee/addEmployee");
const getEmployee = require("./route/employee/getEmployee");
const booking = require("./route/Booking/booking");
const booking_details = require("./route/Booking/getBookingDetails");
const search_rooms = require("./route/SearchRooms/SearchRooms");
const total_booking = require("./route/Booking/totalBooking");
const delete_booking = require("./route/Booking/deleteBooking");
const delete_employee = require("./route/employee/deleteEmployee");
const delete_room = require("./route/Room/deleteRoom");

//------------------- Routes ----------------------------------
app.use("/adminsignup", adminSignup);
app.use("/adminlogin", adminLogin);
app.use("/userSignup", userSignup);
app.use("/userLogin", userLogin);
app.use("/addroom", addRoom);
app.use("/getRoom", getRoom);
app.use("/addemployee", addemployee);
app.use("/getEmployee", getEmployee);
app.use("/booking", booking);
app.use("/booking-details", booking_details);
app.use("/search-rooms", search_rooms);
app.use("/total-booking", total_booking);
app.use("/delete-booking", delete_booking);
app.use("/delete-employee", delete_employee);
app.use("/delete-room", delete_room);

//------------ API route ---------------
app.get("/", (req, res) => {
  res.send(`server is listening at port ${port}`);
});

//------------ start the server -----------------
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
