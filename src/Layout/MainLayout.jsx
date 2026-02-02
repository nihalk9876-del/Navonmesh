import React, { useState } from 'react';
import Navbar from "../Components/Navbar";
import SocialBar from "../Components/SocialBar";
import Footer from "../Components/Footer";
import ChatBot from "../Components/ChatBot";
import { Outlet } from "react-router-dom";
import bgVideo from "../assets/bg.mp4";
import RegisterModal from "../Components/RegisterModal";

const MainLayout = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <div className="app-layout">
      {/* 🌌 GLOBAL BACKGROUND VIDEO */}
      <video
        className="global-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <Navbar onRegisterClick={openRegister} />
      <SocialBar />

      <main className="app-content">
        <Outlet context={{ openRegister }} />
      </main>

      <Footer />
      <ChatBot />

      {/* Register Modal */}
      {isRegisterOpen && <RegisterModal onClose={closeRegister} />}
    </div>
  );
};

export default MainLayout;
