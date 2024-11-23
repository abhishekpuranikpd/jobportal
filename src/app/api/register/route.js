import { db } from "../../../lib/db"; // Prisma or custom database connection
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        // Parse incoming request JSON
        const { name, email, password, role, permissions } = await request.json();

        // Validate role and permissions
        if (!name || !email || !password || !role || !permissions) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate permissions for the given role
        if (role === "SUPERADMIN" && permissions.length === 0) {
            return NextResponse.json(
                { error: "SUPERADMIN must have at least one permission" },
                { status: 400 }
            );
        }

        // Create the new user with role and permissions
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                permissions: {
                    set: permissions, // Assign permissions
                },
            },
        });

        // Return success response
        return NextResponse.json(
            { result: "New User Created", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
