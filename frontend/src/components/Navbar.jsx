import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Navbar.css";
function Navbar() {
  //images
  const [isImage1Visible, setImage1Visible] = useState(true);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = () => {
    navigate(`gigs?search=${input}`);
  };

  const menuItems = [
    { path: "/gigs?cat=design", label: "Graphics & Design" },
    { path: "/gigs?cat=writing", label: "Writing & Translation" },
    { path: "/gigs?cat=ai", label: "AI Services" },
    { path: "/gigs?cat=web", label: "Programming & Tech" },
    { path: "/gigs?cat=business", label: "Business" },
    { path: "/gigs?cat=ai", label: "AI Services" },
    { path: "/gigs?cat=web", label: "Programming & Tech" },
    { path: "/gigs?cat=business", label: "Business" },
    { path: "/", label: "Lifestyle" },
  ];

  const transitionVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setImage1Visible((prevVisible) => !prevVisible);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <>
      <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
          <div className="logo">
            <Link to="/" className="link">
              <span className="text">Bricolli</span>
            </Link>
            <span className="dot">.</span>
          </div>
          <div className="links">
            {!currentUser && (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
            {!currentUser && (
              <button>
                <Link className="link" to="/register">
                  Register
                </Link>
              </button>
            )}
            {currentUser && (
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src={
                    currentUser?.img ||
                    "https://ionicframework.com/docs/img/demos/avatar.svg"
                  }
                  alt="user"
                />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
                    {currentUser?.isSeller && (
                      <>
                        <Link className="link" to="/mygigs">
                          Gigs
                        </Link>
                        <Link className="link" to="/add">
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="messages">
                      Messages
                    </Link>
                    <Link className="link">Logout</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {(active || pathname !== "/") && (
          <>
            <hr />
            <SubMenu items={menuItems} />
            <hr />
          </>
        )}
      </div>
      <div className="featured">
        <div className="container">
          <div className="left">
            <h1>
              {" "}
              Discover the Ideal<i> Freelance </i> Services to Boost Your
              Business
            </h1>
            <div className="search">
              <div className="searchInput">
                <img src="search.png" alt="" />
                <input
                  text="text"
                  placeholder="Try building mobile app"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit}>Search</button>
            </div>
            <div className="popular">
              <span>Popular: </span>
              <button>
                <Link className="link" to="/gigs?cat=design">
                  Web Design
                </Link>{" "}
              </button>
              <button>
                <Link className="link" to="/gigs?cat=web">
                  Wordpress
                </Link>
              </button>
              <button>
                <Link className="link" to="/gigs?cat=design">
                  Logo Design
                </Link>
              </button>
              <button>
                <Link className="link" to="/gigs?cat=ai">
                  AI services
                </Link>
              </button>
            </div>
          </div>
          <div className="right">
            <AnimatePresence mode="wait">
              {isImage1Visible ? (
                <motion.img
                  key="image1"
                  src="/2.png"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={transitionVariants}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <motion.img
                  key="image2"
                  src="/7.png"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={transitionVariants}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
