import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import NavBar from "./components/header";
import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Peperk.in",
  description: "Peperk.in",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  const sessionmail = session?.email;
  let data = null;

  if (sessionmail) {
    // Check if the logged-in user is a Jobseeker
    const jobseekerData = await db.Jobseeker.findFirst({
      where: { email: sessionmail },
    });

    if (jobseekerData) {
      data = {
        ...jobseekerData,
      };
    } else {
      // If no Jobseeker found, check if the user is an Employer
      const employerData = await db.Employer.findUnique({
        where: { email: sessionmail },
      });

      if (employerData) {
        data = {
          ...employerData,
        };
      }
    }
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAF9F6]`}
      >
        <div className="">  <NextTopLoader />    
       {children}</div>
      </body>
    </html>
  );
}
