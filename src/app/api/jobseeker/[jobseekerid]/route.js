import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Middleware to handle FormData
export const PUT = async (req, params) => {
    console.log('Params:', params); // Log params for debugging
    const id = params.params.jobseekerid;
    console.log(id);

    // Check if ID is provided
    if (!id) {
        return NextResponse.json({ error: "Jobseeker ID is required." }, { status: 400 });
    }

    try {
        const formData = await req.formData();

        // Prepare the data object for update
        const updateData = {};

        // Get form fields from formData
        const fullName = formData.get('fullName');
        if (fullName) updateData.fullName = fullName;

        const email = formData.get('email');
        if (email) updateData.email = email;

        const password = formData.get('password');
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const phone = formData.get('phone');
        if (phone) updateData.phone = phone;

        const jobPreference = formData.get('jobPreference');
        if (jobPreference) updateData.jobPreference = jobPreference;

        const resumeUrl = formData.get('resumeUrl'); // Get the uploaded file
        if (resumeUrl) updateData.resume = resumeUrl;
        const skills = formData.getAll("skills"); // Get skills from form data (multi-select)
        if (skills) updateData.skills = skills;
        const location = formData.get('location'); 
        if (location) updateData.location = location;
        const aboutMe = formData.get('aboutMe'); 
        if (aboutMe) updateData.aboutMe = aboutMe;
        const linkedIn = formData.get('linkedIn'); 
        if (linkedIn) updateData.aboutMe = linkedIn;

        const website = formData.get('website');  
        if (website) updateData.aboutMe = website;
        const category = formData.get('category');
        if (phone) updateData.category = category;
        const profileimg = formData.get('logo');
        if (profileimg) updateData.profileimg = profileimg;
        const user = await db.jobseeker.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ success: true, user }, { status: 200 });

    } catch (error) {
        console.error("Error updating jobseeker:", error);
        return NextResponse.json({ error: "Something went wrong during the update" }, { status: 500 });
    }
};
