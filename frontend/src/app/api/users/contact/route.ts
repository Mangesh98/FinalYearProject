import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, email, message } = reqBody;

		const newContact = new Contact({
			username,
			email,
			message,
		});

		const savedContact = await newContact.save();
		console.log(savedContact);

		return NextResponse.json({
			message: "Message Submitted successfully",
			success: true,
		});
	} catch (error: any) {
		if (error.code === 11000) {
			// Duplicate key error, handle accordingly
			console.error("Duplicate key error:", error);
			return NextResponse.json(
				{ error: "Username or email already exists" },
				{ status: 400 }
			);
		} else {
			// Other errors
			console.error("Error saving contact:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
