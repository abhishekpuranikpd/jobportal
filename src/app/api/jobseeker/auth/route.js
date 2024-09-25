import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


import { db } from "@/lib/db"

export async function GET(request, params) {
    try {
        const searchParams = new URL(request.url).searchParams
        const apikey = searchParams.get("apikey")
        const email = searchParams.get("email")
        const password = searchParams.get("password")

        if (
            !apikey ||
            !email ||
            !password ||
            apikey !== "479693736527271"
        ) {
            throw new Error("Invalid credentials")
        }

        const Jobseeker = await db.Jobseeker.findUniqueOrThrow({
            where: { email : email } ,
         
           
        })

        const passwordMatch = await bcrypt.compare(
            password,
            Jobseeker.password
        )

        // if password does not match
        if (!passwordMatch) {
            throw new Error("Incorrect password")
        }

        return new NextResponse(JSON.stringify(Jobseeker), { status: 200 })
    } catch (error) {
        console.log("Jobseeker", error)
        return new NextResponse(JSON.stringify({ msg: error.message }), {
            status: 500,
        })
    }
}
