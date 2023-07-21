import { useState } from "react";

import { close, cblogo, menu } from "../assets";
import { navLinks } from "../const";
import {Link, useNavigate} from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
    <div>
        <img src={cblogo} alt="heon" className="w-[150px] h-[80px]" />
        <p className="tracking-[5px] ml-4">Casablanca</p>
    </div>
      
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          return (
            nav.title === 'Sign Up' || nav.title === 'Login' || nav.title === 'Chat'?
            <Link 
              key={nav.id}
              className={`${localStorage.getItem('token') && (nav.title === "Sign Up" || nav.title === "Login")? "hidden" : ""} font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-black font-bold" : "text-black-gradient"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
              to={{pathname:`/${!localStorage.getItem('token') && nav.title === "Chat" ? 'login': nav.id}`}}>{nav.title}</Link>
            :
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-black font-bold" : "text-black-gradient"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          )
        }
        )}
        {
          localStorage.getItem('token')?
          <FaSignOutAlt className="text-red-700 cursor-pointer text-lg"
          onClick={()=>{
            navigate('/')
            localStorage.removeItem('token')
          }}
          />
          :
          null
        }
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => {
              return (
                nav.title === 'Sign Up' || nav.title === 'Login' || nav.title === 'Chat'?
                (
                  <Link 
                  key={nav.id}
                  className={`${localStorage.getItem('token') && (nav.title === "Sign Up" || nav.title === "Login")? "hidden" : ""} font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-black font-bold" : "text-black-gradient"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                  to={{pathname:`/${nav.id}`}}>{nav.title}</Link>
                )
                :
                (<li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-black font-bold" : "text-black-gradient"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>)
              )
            } 
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;