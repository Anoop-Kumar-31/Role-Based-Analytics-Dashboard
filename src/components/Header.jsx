import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import img from '../assets/images/default_pfp_3d.png';
import DropdownMenu from './DropdownMenu';

import { useSelector } from "react-redux";


const Header = ({ setActivePage, setPopup, setIsLoggedIn }) => {
  const [isClicked, setIsClicked] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const pfp = user?.user_profile_image || img;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    }
    if (isClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClicked]);

  return (
    <main className="sticky top-0 px-6 py-2 h-[60px] select-none bg-white/80 backdrop-blur-xl border-b border-[var(--border)] z-[2] flex items-center max-md:px-3 w-full">
      <section className="w-full flex justify-end items-center">
        <div
          ref={dropdownRef}
          onClick={() => setIsClicked(!isClicked)}
          className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-[var(--filler)] transition-all duration-200 relative cursor-pointer"
        >
          <div className="w-[38px] h-[38px] rounded-full p-[2px] bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center">
            <img src={pfp} alt="pfp" className="w-full h-full rounded-full object-cover border-2 border-white" />
          </div>
          <div className="flex flex-col gap-0.5 max-md:hidden">
            <h3 className="text-[var(--text-primary)] font-semibold text-sm leading-none">{user?.first_name + " " + user?.last_name}</h3>
            <p className="text-[var(--text-tertiary)] font-normal text-xs leading-none">{user?.email}</p>
          </div>
          <div className={`transition-transform duration-200 text-[var(--text-tertiary)] ${isClicked ? 'rotate-180' : ''}`}>
            <ChevronDown size={18} />
          </div>
          {isClicked && (
            <DropdownMenu setActivePage={setActivePage} closeDropdown={() => setIsClicked(false)} setPopup={setPopup} setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Header;
