const dayjs = require("dayjs");
const hallData = require("../hallData");
const bookingData = require("../bookingData");



//Show All Rooms Availabe in hall
exports.availableRoom = (req, res) => {
    res.status(200).json({
        RoomsAvailable: hallData,
    });
};

//Create Unique Rooms in hall
exports.createRoom = (req, res) => {

    let result = [];
    req.body.rooms.forEach((room) => {
        let isPresent = hallData.find((temp) => temp.roomId === room.roomId);
        let roomId = room.roomId;
        if (isPresent === undefined) {
            hallData.push(room);
            console.log(room);

            result.push({ Id: roomId, status: "Created" });
        } else {
            result.push({
                Id: roomId,
                roomCreationStatus: " Room Id Already Exists!! Use Another Room Id",
            });
        }
    });

    res.status(200).json({
        roomCreationStatus: result,
    });
};

//All booked rooms
exports.bookedRoom = (req, res) => {

    let data = bookingData;

    let output = [];

    data.forEach((bookedRooms) => {
        let roomData = hallData.find((room) => room.roomId === bookedRooms.roomId);

        let obj = {
            roomName: roomData.roomName,
            bookedStatus: bookedRooms.status,
            customerName: bookedRooms.customerName,
            date: bookedRooms.date,
            startTime: bookedRooms.startTime,
            endTime: bookedRooms.endTime,
        };

        output.push(obj);
    });

    res.status(200).json({
        bookedRooms: output,
    });
};

//Book a room(no rooms are booked on that date and time).
exports.startBooking = (req, res) => {

    let flag;
    let result = [];

    req.body.bookingDetails.forEach((room) => {
        flag = 1;
        let roomData = bookingData.find((rooms) => {
            if (rooms.roomId === room.roomId) {
                console.log("room id's equal");

                let bookingDate = dayjs(room.date);

                let bookedDate = dayjs(rooms.date);

                console.log(bookingDate.isSame(bookedDate));

                if (bookingDate.isSame(bookedDate)) {
                    console.log("Booking date already exists");
                    let bookedStartTime = +room.startTime;

                    let bookedEndTime = +room.endTime;

                    let bookingTime = +rooms.startTime;

                    if (
                        (bookingTime < bookedEndTime && bookedStartTime >= bookingTime) ||
                        bookingTime === bookedStartTime
                    ) {
                        result.push({
                            roomId: room.roomId,
                            status: "A booking Already Exists on given time",
                        });

                        flag = 0;
                    }
                }
            }
        });
        if (flag === 1) {
            room["status"] = "confirm";
            bookingData.push(room);
            result.push({
                roomId: room.roomId,
                status: "Booking Confirmed",
            });
        }
    });

    res.status(200).json({
        bookingStatus: result,
    });
};

//All customer details
exports.bookedCustomer = (req, res) => {
    let data = bookingData;

    let output = [];

    data.forEach((bookedRooms) => {
        let roomData = hallData.find((room) => room.roomId === bookedRooms.roomId);

        let obj = {
            customerName: bookedRooms.customerName,
            roomName: roomData.roomName,
            date: bookedRooms.date,
            startTime: bookedRooms.startTime,
            endTime: bookedRooms.endTime,
        };

        output.push(obj);
    });

    res.status(200).json({
        customerData: output,
    });
};