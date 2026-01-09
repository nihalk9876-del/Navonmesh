import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";

import Home from "./Pages/Home";
import Hackathon from "./Pages/Hackathon";
import Gallery from "./Pages/Gallery";
import ProjectExpo from "./Pages/ProjectExpo";
// import Accomodation from "./Pages/Accomodation";
// import Events from "./Pages/Events";
// import Workshops from "./Pages/Workshops";
// import Speakers from "./Pages/Speakers";
// import Sponsers from "./Pages/Sponsers";
// import ContactUs from "./Pages/ConstactUs";
// import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FAQs from "./Pages/FAQs";
import ContactUs from "./Pages/ContactUs";
// import About from "./Pages/About";
// import CoreTeam from "./Pages/CoreTeam";
import ProblemStatement from "./Pages/ProblemStatement";
import Team from "./Pages/Team";
import Conference from "./Pages/Conference";
import Accommodation from "./Pages/Accommodation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH Navbar, Sidebar, Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/problem-statement" element={<ProblemStatement />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/projectexpo" element={<ProjectExpo />} />
          <Route path="/conference" element={<Conference />} /> {/* Added Conference Route */}
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/team" element={<Team />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/accomodation" element={<Accomodation />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/sponser" element={<Sponsers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/coreteam" element={<CoreTeam />} /> */}
        </Route>

        {/* Pages WITHOUT Navbar / Sidebar / Footer */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
