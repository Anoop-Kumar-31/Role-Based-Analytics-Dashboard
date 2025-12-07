import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Wallet, HandCoins, Book, Users,
  MapPinned, UserRoundPen, Menu , X,LayoutList, ListChecks  
} from 'lucide-react';
import logo from '../assets/images/Black-Logo.png';

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
      h-[calc(100%)] w-fit bg-white
      transition-all duration-240 ease-in-out select-none pb-2
      border-[#00000033] border-r-1 z-3
      max-md:absolute
      ${isOpen?'':'max-md:translate-x-[-52px]'}
    `}>
      
      {/* Navigation Section */}
      <nav className={`flex flex-col  ${isOpen ? 'w-[240px]' : 'w-fit'}`}>
      <div className={`h-[50px] ${isOpen?'aspect-[2.5]':''} flex items-center justify-center mb-2`}>
          <img src={logo} alt="logo" className={`px-5 w-full ${isOpen?'block':'hidden'} bg-white`} />
      </div>
        {filteredNavItems.map((item) => {
          const isActive = activePage === item.name;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`
                        flex items-center gap-[10px] p-3.5 cursor-pointer hover:brightness-90
                        ${isActive ? 'bg-[var(--primary-blue)] text-white font-semibold'  
                                          : `${isOpen ? 'bg-white text-primary-black' 
                                                      :' bg-white text-primary-black font-semibold'}`}
                      `}
            >
              <item.icon size={24} />
              {isOpen && (
                <span className="text-base leading-none">
                  {item.name}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1">
        <div
          onClick={() => {
            setActivePage('My Profile');
            navigate("/profile");
          }}
          className={`
            flex items-center gap-[10px] p-3
            ${activePage === 'My Profile' ? 'bg-[var(--primary-blue)] text-white font-semibold'  
                                          : `${isOpen ? 'bg-white text-primary-black' 
                                                      :' bg-white text-primary-black font-semibold'}`}
            hover:brightness-90 cursor-pointer
          `}
        >
          <UserRoundPen size={24} />
          {isOpen && <span className="text-base leading-none">My Profile</span>}
        </div>

        <div
          onClick={toggleSidebar}
          className={`
            flex items-center gap-[10px] p-3
            ${isOpen ? 'bg-white text-primary-black' 
                     : 'text-primary-black font-semibold'}
            hover:brightness-90 cursor-pointer
            fixed
            top-0
            bg-white
            shadow-[1px_1px_0px_#00000033]
            z-99999999999999999
          `}
          style={{
            transform: `translateX(${isOpen ? '240px' : '52px'})` 
          }}
        >
          {isOpen ? (
            <>
              <X  size={24} />
              <span className="text-base leading-none hidden">Close</span>
            </>
          ) : (
            <Menu  size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
