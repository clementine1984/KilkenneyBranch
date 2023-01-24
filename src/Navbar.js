import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/Logo-2020-kilkenny.png";
function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src={logo} alt="" />

          <a className="navbar-brand" href="/">
            Acuities
          </a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
          {/* <div className="offcanvas offcanvas-end"  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"> */}
          {/* <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div> */}
          {/* <div className="offcanvas-body"> */}
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/department">
              Department
            </Link>

            <Link className="nav-link" to="./charts">
              FlowExperienceOverview
            </Link>
            <Link className="nav-link" to="./charts2">
              FlowExperienceOverview2
            </Link>
            <Link className="nav-link" to="./retailpulse">
              Retail Pulse
            </Link>

            {/* <Link className="nav-link" to="./tables">
                Tables
              </Link>
           
              <Link className="nav-link" to="./moretables">
                More Tables
              </Link>

              <Link className="nav-link" to="./telesales">
              Telesales
              </Link>
            
              <Link className="nav-link" to="./Marketing">
              Marketing
              </Link>
              
         
              <Link className="nav-link" to="./buying">
                Buying
              </Link>
            
              <Link className="nav-link" to="./finance">
                Finance
              </Link> */}
          </ul>
          {/* </div> */}
          {/* </div> */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
