import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Added hook imports

import MainLayout from "./Layout/MainLayout";
import Preloader from "./Components/Preloader"; // Import Preloader

import Home from "./Pages/Home";
import Hackathon from "./Pages/Hackathon";
import Gallery from "./Pages/Gallery";
import ProjectExpo from "./Pages/ProjectExpo";
// ... imports
import Register from "./Pages/Register";
import FAQs from "./Pages/FAQs";
import ContactUs from "./Pages/ContactUs";
import ProblemStatement from "./Pages/ProblemStatement";
import Team from "./Pages/Team";
import Conference from "./Pages/Conference";
import Accommodation from "./Pages/Accommodation";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onLoaded={handleLoaded} />}
      <HashRouter>
        <div style={{ display: loading ? 'none' : 'block' }}> {/* Hide app content while loading to prevent flash */}
          <Routes>
            {/* Pages WITH Navbar, Sidebar, Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/problem-statement" element={<ProblemStatement />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projectexpo" element={<ProjectExpo />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/team" element={<Team />} />
            </Route>

            {/* Pages WITHOUT Navbar / Sidebar / Footer */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
