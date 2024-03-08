import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
	},
	email: {
		type: String,
		required: [true, "Please provide a email"],
	},
	message: {
		type: String,
		required: [true, "Please provide a Message"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const Contact =
	mongoose.models.contacts || mongoose.model("contacts", userSchema);

export default Contact;
