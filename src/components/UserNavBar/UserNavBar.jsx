import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./UserNavBar.css";
import { selectTypeQuery } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import logo from "../../assets/doctor1.jpg";
import { useEffect, useState } from "react";
import { useGetProfileMutation } from "../../features/auth/authApiSlice";
import { selectUser } from "../../features/auth/authSlice";
import { setProfile } from "../../features/auth/authSlice";
import { selectProfile } from "../../features/auth/authSlice";
function UserNavBar() {
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const userType = useSelector(selectTypeQuery);
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const [getProfile, { isLoading }] = useGetProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("none");
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  useEffect(() => {
    const helper = async () => {
      console.log(user);
      let response = await getProfile({ type: userType, id: user.profile_id });
      dispatch(setProfile(response.data));
    };
    user && helper();
  }, [user]);

  // useEffect(() => {
  //   function handleScroll() {
  //     var navbar = document.querySelector("nav");
  //     if (window.pageYOffset >= 20) {
  //       navbar.classList.add("sticked");
  //     } else {
  //       navbar.classList.remove("sticked");
  //     }
  //     if (window.pageYOffset > window.lastScrollTop) {
  //       setScrollDirection("down");
  //       setNavbarOpacity(0);
  //     } else if (window.pageYOffset < window.lastScrollTop) {
  //       setScrollDirection("up");
  //       setNavbarOpacity(1);
  //     } else {
  //       setScrollDirection("none");
  //     }
  //     window.lastScrollTop = window.pageYOffset;
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div>
      <Navbar expand="lg" sticky="top" style={{ opacity: navbarOpacity }}>
        <Container fluid>
          <Link to={"/"} className="navbar-brand">
            <h1>HMS</h1>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="align-nav">
              <Nav className="me-auto">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
                <Link to={"/booking"} className="nav-link">
                  Booking
                </Link>
                {/* <NavDropdown title="Services" id="basic-nav-dropdown">
              <Link to={"/service"} className='dropdown-item'>Service</Link>
              <Link to={"/servicedetails"} className='dropdown-item'>
                Service Details
              </Link>
            </NavDropdown> */}
                <Link to={"/doctors"} className="nav-link">
                  Our Doctors
                </Link>
                <Link to={"/Contact"} className="nav-link">
                  Contact Us
                </Link>
              </Nav>
              <Nav className="justify-content-center">
                {profile && !profile?.is_complete && (
                  <div className="nav-link nav-link-buttons-margin">
                    <Link to="complete_profile">
                      <button type="button">
                        Complete Profile
                        <span>
                          <IoIosArrowForward />
                        </span>
                      </button>
                    </Link>
                  </div>
                )}
                <NavDropdown
                  title={
                    <img
                      className="thumbnail-image rounded-circle img-profile"
                      src={logo}
                      alt="user pic"
                    />
                  }
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <button onClick={handleLogout} type="button">
                    Logout
                  </button>
                </NavDropdown>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UserNavBar;