import { Component } from "react";
import { FaHome, FaFacebookMessenger, FaBell } from "react-icons/fa";
import img from "../../assets/icons8-user-default-100.png";
import "./Header.css";
import { MdExplore } from "react-icons/md";

export default class HeaderComponenet extends Component {
  render() {
    return (
      <header className="flex justify-around w-full h-16 items-center">
        <div id="logo" className="text-3xl w-2/5 font-semibold border-r-2 border-blue-950">
          #Smendship
        </div>
        <div
          id="nav"
          className="flex self-center justify-between h-14 w-[800px] items-center bg-blue-950 rounded-full"
        >
          <div id="profile" className="flex w-14 justify-center items-center ">
            <div id="img" className="cursor-pointer hover:w-13 w-12">
              <img src={img} alt="default" />
            </div>
          </div>
          <div
            id="Home"
            className="icons"
          >
            <FaHome />
          </div>
          <div id="chat" className="icons">
            <FaFacebookMessenger />
          </div>
          <div id="notify" className="icons">
            <FaBell />
          </div>
          <div id="explore" className="icons mr-2!">
            <MdExplore />
          </div>
        </div>
      </header>
    );
  }
}
