import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { MdAddCircle, MdSpaceDashboard } from "react-icons/md";
import { BiLogIn, BiLogOut } from "react-icons/bi";
// import { BsFillBookmarksFill } from "react-icons/bs";
import {
  GrClose,
  GrTwitter,
  GrFacebook,
  GrInstagram,
  GrLinkedin,
} from "react-icons/gr";

// LOGO
import { Logo } from "../../assets";

// CONTEXT
import { useStateContext } from "../../context";

const Navbar = () => {
  const navigate = useNavigate();
  const { open, setOpen, user, setSelectedTab } = useStateContext();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav id="nav">
        <div className="navBar">
          <VscMenu className="openMenu" onClick={() => setOpen(true)} />
          <div
            className={
              open ? "rightBoxOverlay show-overlay" : "rightBoxOverlay"
            }
            onClick={() => setOpen(false)}
          ></div>
          <div className={open ? "nav-items show-nav" : "nav-items"}>
            <GrClose className="closeMenu" onClick={() => setOpen(false)} />
            <div
              className="flex items-center md:ml-12 gap-3"
              onClick={() => setOpen(false)}
            >
              <GrTwitter
                className="w-4 h-4 text-icons
              cursor-pointer hover:text-black duration-300
              "
                onClick={() =>
                  window.open("https://twitter.com/findfreeaitools")
                }
              />
              <GrLinkedin
                className="w-4 h-4 text-icons
              cursor-pointer hover:text-black duration-300
              "
                onClick={() =>
                  window.open("https://www.linkedin.com/in/findfreeaitools/")
                }
              />
            </div>

            <li className="mobile">
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                mt-4"
              >
                {user && (
                  <>
                    <div
                      className="flex flex-col
                    "
                    >
                      <p>{user?.displayName}</p>
                    </div>
                  </>
                )}
              </div>
            </li>

            <li className="mobile">
              <div
                onClick={() => {
                  setOpen(false);
                  setSelectedTab("Add Tool");
                  navigate("/dashboard/addtool");
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                mt-4"
              >
                {user && user?.role === "admin" && (
                  <>
                    <div
                      className="flex items-center
                    "
                    >
                      <p
                        className="text-icons
                      hover:text-black duration-300
                      "
                      >
                        Admin Dashboard
                      </p>
                      <MdSpaceDashboard
                        className="text-icons
                      hover:text-black duration-300 w-5 h-5
                      "
                      />
                    </div>
                  </>
                )}
              </div>
            </li>

            <li className="mobile">
              <div
                onClick={() => {
                  setOpen(false);
                  window.open("https://ie9up57530s.typeform.com/to/dmKfL2ZX");
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
              >
                <p
                  className="cursor-pointer
                mt-4
                "
                >
                  SUBMIT PROJECT
                </p>
                <MdAddCircle
                  className="w-4 h-4
                cursor-pointer
                "
                />
              </div>
            </li>

            <li className="mobile">
              {/* <div
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
              >
                {!user && (
                  <>
                    <p className="cursor-pointer">SIGN IN</p>
                    <BiLogIn
                      className="w-4 h-4
                cursor-pointer
                "
                    />
                  </>
                )}
              </div> */}
              <div
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
              >
                {user && (
                  <>
                    <p className="cursor-pointer">SIGN OUT</p>
                    <BiLogOut
                      className="w-4 h-4
                cursor-pointer
                "
                    />
                  </>
                )}
              </div>
            </li>
          </div>

          <div
            className="flex items-center md:ml-[10%]
          lg:ml-[15%]
          "
          >
            <div
              className="desktop-logo flex justify-center
            "
            >
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            {/* <h1
              className="xl:block hidden
            font-Helvetica tracking-widest 
            lg:text-[24px] text-[18px]
            font-[600] cursor-pointer
            "
            >
              FindFreeAiTools
            </h1> */}
          </div>

          <div className="flex justify-center items-center">
            <div className="mobile-logo">
              <section className="flex flex-col justify-center items-center">
                <Link to="/">
                  <img src={Logo} alt="logo" className="w-16 h-auto" />
                </Link>
                {/* <h1
                  className="font-Helvetica tracking-widest text-[14px]
            font-[600] cursor-pointer hidden"
                >
                  FindFreeAiTools
                </h1> */}
              </section>
            </div>
          </div>

          <div className="btn mr-12">
            {user && user?.role === "admin" && (
              <li>
                <div
                  onClick={() => {
                    setOpen(false);
                    setSelectedTab("Add Tool");
                    navigate("/dashboard/addtool");
                  }}
                  className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
                >
                  <p className="cursor-pointer">Dashboard</p>
                  <MdSpaceDashboard
                    className="w-4 h-4
                cursor-pointer
                "
                  />
                </div>
              </li>
            )}

            <li>
              <div
                onClick={() => {
                  setOpen(false);
                  window.open("https://ie9up57530s.typeform.com/to/dmKfL2ZX");
                }}
                className="flex items-center gap-2
                  text-icons cursor-pointer
                  hover:text-black duration-500
                  "
              >
                <p className="cursor-pointer">SUBMIT PROJECT</p>
                <MdAddCircle
                  className="w-4 h-4
                  cursor-pointer
                  "
                />
              </div>
            </li>

            {/* {user && (
              <div
                className="flex 
              justify-center items-center 
              mx-2 gap-2
              text-icons
              hover:text-black duration-300
              cursor-pointer
              "
              >
                <p>BOOKMARKS</p>
                <BsFillBookmarksFill className="w-4 h-4" />
              </div>
            )} */}
            <div
              className="flex flex-col 
              justify-center mx-2
              "
            >
              <p className="text-icons">{user?.displayName}</p>
            </div>

            <li>
              {/* <div
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
              >
                {!user && (
                  <>
                    <p className="cursor-pointer">SIGN IN</p>
                    <BiLogIn
                      className="w-4 h-4
                cursor-pointer
                "
                    />
                  </>
                )}
              </div> */}
              <div
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2
                text-icons cursor-pointer
                hover:text-black duration-500
                "
              >
                {user && (
                  <>
                    <p className="cursor-pointer">SIGN OUT</p>
                    <BiLogOut
                      className="w-4 h-4
                cursor-pointer
                "
                    />
                  </>
                )}
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
