import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Wallet, HandCoins, Book, Users,
  MapPinned, UserRoundPen, Menu, X, LayoutList, ListChecks
} from 'lucide-react';
import logo from "../../public/LOGOnew.png"

import { useNavigate } from 'react-router-dom';

const PAGE_TO_ROUTE = {
  Dashboard: "/dashboard",
  Expense: "/expense",
  Revenue: "/revenue",
  "Blue Book": "/blue-book",
  Users: "/users",
  Locations: "/locations",
  "My Profile": "/profile",
  "Rest. Onboarding": "/onboarding",
  "Rest. Onboarded": "/onboarded",
};

const Sidebar = ({ activePage, isOpen, setIsOpen, setActivePage, allowedPages }) => {

  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Expense', icon: Wallet },
    { name: 'Revenue', icon: HandCoins },
    { name: 'Blue Book', icon: Book },
    { name: 'Users', icon: Users },
    { name: 'Locations', icon: MapPinned },
    { name: 'Rest. Onboarding', icon: LayoutList },
    { name: 'Rest. Onboarded', icon: ListChecks },
  ];

  const handleClick = (page) => {
    setActivePage(page);
    navigate(PAGE_TO_ROUTE[page])
  };

  const [filteredNavItems, setFilteredNavItems] = useState(() =>
    navItems.filter(item => allowedPages.includes(item.name))
  );

  useEffect(() => {
    setFilteredNavItems(navItems.filter(item => allowedPages.includes(item.name)));
  }, [allowedPages]);

  return (
    <div className={`
      flex flex-col justify-between
      h-[calc(100%)] w-fit bg-[var(--sidebar-bg)]
      transition-all duration-300 ease-in-out select-none pb-2
      border-r border-[rgba(255,255,255,0.06)] z-3
      max-md:absolute
      ${isOpen ? '' : 'max-md:translate-x-[-60px]'}
    `}>

      {/* Navigation Section */}
      <nav className={`flex flex-col gap-2 ${isOpen ? 'w-[225px]' : 'w-fit'}`}>
        <div className={`h-[60px] ${isOpen ? 'aspect-[2.5]' : ''} flex items-center justify-center`}>
          <img src={logo} alt="logo" className={`py-1 h-full w-6/10 ${isOpen ? 'block' : 'hidden'}
          invert-[1] brightness-[0]`} />
        </div>
        {filteredNavItems.map((item) => {
          const isActive = activePage === item.name;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`
                        group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl cursor-pointer
                        transition-all duration-200
                        ${isActive ? 'bg-[var(--sidebar-active-bg)] text-white font-semibold'
                  : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)] hover:text-white/90'}
                      `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full bg-gradient-to-b from-[var(--primary-accent)] to-[var(--secondary-accent)]" />
              )}
              <item.icon size={20} className={`flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-[var(--primary-accent)]' : 'group-hover:text-[var(--primary-accent)]'}`} />
              {isOpen && (
                <span className={`text-[0.875rem] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.name}
                </span>
              )}
              {!isOpen && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[var(--sidebar-bg)] text-white text-xs rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">{item.name}</div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1 pb-3 px-2">
        <div
          onClick={() => {
            setActivePage('My Profile');
            navigate("/profile");
          }}
          className={`
            group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
            transition-all duration-200
            ${activePage === 'My Profile' ? 'bg-[var(--sidebar-active-bg)] text-white font-semibold'
              : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)] hover:text-white/90'}
          `}
        >
          {activePage === 'My Profile' && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full bg-gradient-to-b from-[var(--primary-accent)] to-[var(--secondary-accent)]" />
          )}
          <UserRoundPen size={20} className={`flex-shrink-0 ${activePage === 'My Profile' ? 'text-[var(--primary-accent)]' : 'group-hover:text-[var(--primary-accent)]'}`} />
          {isOpen && <span className={`text-[0.875rem] leading-none ${activePage === 'My Profile' ? 'font-semibold' : 'font-medium'}`}>My Profile</span>}
        </div>

        <div
          onClick={toggleSidebar}
          className={`
            flex items-center gap-3 p-3
            text-[var(--sidebar-text)] hover:text-white/90
            hover:bg-[brightness(0.9)] cursor-pointer
            fixed
            top-0
            bg-[var(--sidebar-bg)]
            shadow-lg
            z-99999999999999999
            rounded-r-xl
          `}
          style={{
            transform: `translateX(${isOpen ? '215px' : '50px'})`
          }}
        >
          {isOpen ? (
            <>
              <X size={20} />
              <span className="text-base leading-none hidden">Close</span>
            </>
          ) : (
            <Menu size={22} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
