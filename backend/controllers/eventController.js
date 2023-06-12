const eventModal = require("../Modals/eventModal");
const userModal = require("../Modals/eventModal")
const mongoose = require("mongoose");
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const getEvents = async (req, res) => {
    const events = await eventModal.find({}).sort({createdAt: -1});
    res.status(200).json(events);
};

const getEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "Invalid event ID provided."})
    }
    const event = await eventModal.findById(id);
    if (!event) {
        res.staus(404).json({error: "No event exists with that ID."})
    }
    else {
        res.status(200).json(event);
    };
};

const createEvent = async (req, res) => {
    try {
        const token = localStorage.getItem("token");
        const admin = localStorage.getItem("admin");
        const userName = localStorage.getItem("userName");
        if (token === "") {
            res.status(500).json({ message: 'Error creating event', error: "You must be logged in." });
        }
        if (admin === "false") {
            res.status(500).json({ message: 'Error creating event', error: "You must be an admin to perform this." });
        }
        const event = new eventModal(req.body);
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event: event });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating event', error: error.message });
    };
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({error: "Invalid event ID provided."})
        }
        const event = eventModal.findOneAndDelete({_id: id});
        if (!event) {
            res.staus(404).json({error: "No event exists with that ID."})
        }
        else {
            res.status(200).json(event);
        };
    } catch(error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    };
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({error: "Invalid event ID provided."})
        };
        const event = eventModal.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        if (!event) {
            res.staus(404).json({error: "No event exists with that ID."})
        }
        else {
            res.status(200).json(event);
        };
    } catch(error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    };
};

module.exports = {
    createEvent,
    updateEvent,
    getEvents,
    getEvent,
    deleteEvent
};

