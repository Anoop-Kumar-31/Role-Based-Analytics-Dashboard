// src/components/PortalLayout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

const PortalLayout = ({ allowedPages, portal, pageToRoute, setPopup, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState(() => window.localStorage.getItem('activePage') || "DashBoard");
  const location = useLocation();

  // Sync activePage with current URL path on location change
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    // Find page name by matching path in pageToRoute
    const matchedPage = Object.entries(pageToRoute).find(
      ([pageName, route]) => route.toLowerCase() === path
    );

    if (matchedPage && allowedPages.includes(matchedPage[0])) {
      setActivePage(matchedPage[0]);
      localStorage.setItem("activePage", matchedPage[0]);
    }
  }, [location.pathname, allowedPages, pageToRoute]);

  const handleSetActivePage = (page) => {
    setActivePage(page);
    localStorage.setItem("activePage", page);
  };

  return (
    <div className="flex h-full w-full">
      <Sidebar
        activePage={activePage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setActivePage={handleSetActivePage}
        allowedPages={allowedPages}
        portal={portal}
      />
      <div className="flex flex-col flex-grow overflow-auto bg-[var(--background)]">
        <Header setActivePage={setActivePage} setIsLoggedIn={setIsLoggedIn} setPopup={setPopup} />
        <main className="transition-all duration-300 w-full p-4 animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
