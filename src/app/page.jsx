import Image from "next/image";

import JobSearchBar from "./components/hero";
import NavBar from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="container">     <NavBar /><JobSearchBar/>
       <Footer />
</div>

  );
}
