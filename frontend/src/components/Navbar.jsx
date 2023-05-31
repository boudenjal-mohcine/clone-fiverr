import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [isImage1Visible, setImage1Visible] = useState(true);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const { cats, status } = categories;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const sellerid = currentUser?.user?.seller?._id


  const handleSubmit = () => {
    navigate(`gigs?search=${input}`);
  };

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

  const handelLogout = () => {
   
    navigate('/login');
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    if (localStorage.getItem("seller")) localStorage.removeItem("seller");
    if (localStorage.getItem("user_gigs")) localStorage.removeItem("user_gigs");
  };

  console.log(currentUser);
  return (
    <>
      <div
        className={
          active || pathname !== "/"
            ? "navbar active bg-indigo-600"
            : "navbar bg-indigo-600"
        }
      >
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
            {currentUser && !currentUser?.user?.isSeller ? (
              <button>
                <Link className="link" to="/user/beseller">
                  Become a seller
                </Link>
              </button>
            ) : (
              <div></div>
            )}
            {currentUser && (
              <div className="user" onClick={() => setOpen(!open)}>
                <img
                  src={`http://localhost:8000/profiles/${currentUser?.user?.profilePicture}`}
                  alt="user"
                />
                <span>{currentUser.user.username}</span>
                {open && (
                  <div className="options">
                    {currentUser && currentUser?.user?.isSeller ? (
                      <>
                        <Link className="link" to={`/seller/${sellerid}`}>
                          Gigs
                        </Link>
                      </>
                    ) : (
                      <div></div>
                    )}
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="messages">
                      Messages
                    </Link>
                    <Link className="link" onClick={handelLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {(active || pathname !== "/") && (
          <>
            <hr />
            <SubMenu />
            <hr />
          </>
        )}
      </div>
      {pathname === "/" && (
        <div className="featured bg-indigo-600">
          <div className="container">
            <div className="left">
              <h1>
                {" "}
                Discover the Ideal<i> Freelance </i> Services to Boost Your
                Business
              </h1>
              <div className="search">
                <div className="searchInput">
                  <img src="images/search.png" alt="" />
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
                {status === "successful" ? (
                  cats.slice(0, 4).map((cat, index) => (
                    <button key={index}>
                      <Link className="link" to={`/cat/${cat.id}`}>
                        {cat.label}
                      </Link>
                    </button>
                  ))
                ) : (
                  <div>Loading ...</div>
                )}
              </div>
            </div>
            <div className="right">
              <AnimatePresence mode="wait">
                {isImage1Visible ? (
                  <motion.img
                    key="person1"
                    src="images/person1.png"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.img
                    key="person3"
                    src="images/person3.png"
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
      )}
    </>
  );
}

export default Navbar;
