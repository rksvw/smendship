import { Component } from "react";
import { FaHome, FaFacebookMessenger, FaBell, FaSearch } from "react-icons/fa";
import img from "../../assets/icons8-user-default-100.png";
import "./Header.css";

export default class HeaderComponenet extends Component {
  render() {
    return (
      <header className="header">
        <div className="_logo">
          <h2>#Facebook</h2>
        </div>
        <div className="_profile">
          <div className="_pic">
            <img src={img} alt="Profile" />
          </div>
          <div className="handle">
            <strong>Ritik Sharma</strong>
            <span>@ritik</span>
          </div>
        </div>
        <nav className="_nav">
          <ul>
            <li>
              <FaHome />
            </li>
            <li>
              <FaFacebookMessenger />
            </li>
            <li>
              <FaBell />
            </li>
            <li>
              <FaSearch />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
