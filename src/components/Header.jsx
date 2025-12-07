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
    <main className="sticky top-0 px-[clamp(50px,50%,150px)] py-[5px] border-[var(--light-grey)] border-b-2 h-[50px] select-none bg-white max-md:px-0 w-[100%] z-[2]">
      <section className="w-full flex justify-end items-center bg-white">
        <div
          ref={dropdownRef}
          onClick={() => setIsClicked(!isClicked)}
          className="flex items-center justify-center gap-[10px] bg-white px-[10px] transition-all duration-200 ease-in-out relative cursor-pointer"
        >
          <div className="w-[45px] h-[40px] bg-[#f0f0f0] rounded-full flex items-center justify-center">
            <img src={pfp} alt="pfp" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="flex flex-col gap-1 ">
            <h3 className="text-[var(--main-blue)] font-semibold text-[medium] leading-none">{user?.first_name + " " + user?.last_name}</h3>
            <p className="text-[var(--primary-grey)] font-light text-[smaller] leading-none">{user?.email}</p>
          </div>
          <div className="translate-y-[5px] h-fit mb-2">
            {isClicked?<ChevronUp/>:<ChevronDown />}
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