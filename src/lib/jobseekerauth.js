import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secretKey = "secret"; // Change this to a more secure value in production
const key = new TextEncoder().encode(secretKey);

// Function to encrypt payload and generate JWT
export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d") // Set token to expire in 30 days
        .sign(key);
}

// Function to decrypt JWT and retrieve payload
export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

// Function to log out user and clear session
export async function logout() {
    const res = NextResponse.next();
    res.cookies.set("session", "", {
        expires: new Date(0), // Expire the cookie immediately
        path: '/', // Ensure the cookie is removed across all paths
        httpOnly: true, // Make it httpOnly for security
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: 'strict' // Help prevent CSRF attacks
    });
    return res;
}

// Function to get the current session
export async function getSession() {
    try {
        const session = cookies().get("session")?.value;
        if (!session) return null; // Return null if no session exists
        return await decrypt(session); // Decrypt the session token to get the payload
    } catch (error) {
        // Optionally clear invalid sessions
        cookies().set("session", "", { expires: new Date(0) });
        return null;
    }
}

// Function to update the session, refreshing it
export async function updateSession(request) {
    try {
        const session = request.cookies.get("session")?.value;
        if (!session) return;

        // Refresh the session so it doesn't expire
        const parsed = await decrypt(session);
        parsed.expires = new Date(Date.now() + 4 * 60 * 60 * 1000); // Set new expiration time

        const res = NextResponse.next();
        res.cookies.set({
            name: "session",
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires,
            path: '/', // Ensure it is set for all paths
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: 'strict' // Help prevent CSRF
        });
        return res; // Return the response with updated session
    } catch (error) {
        const res = NextResponse.next();
        res.cookies.set("session", "", { expires: new Date(0), path: '/' }); // Clear on error
        return res;
    }
}

// Function to log in a user and handle session management
export async function loginUser(request, payload) {
    const res = NextResponse.next();
    
    // Check for an existing session
    const existingSession = cookies().get("session")?.value;
    if (existingSession) {
        // If a session exists, log out the previous user
        await logout();
    }

    // Create a new session
    const newSession = await encrypt(payload);
    res.cookies.set("session", newSession, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set to expire in 30 days
        path: '/', // Ensure it is set for all paths
        httpOnly: true, // Make it httpOnly for security
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: 'strict' // Help prevent CSRF attacks
    });
    
    return res; // Return the response with the new session
}
