import { Component } from "react";
import HeaderComponenet from "../components/Header/HeaderComponenet";

export default class IndexPage extends Component {
  render() {
    return (
      <>
        <div
          style={{
            width: "100%",
            padding: "0px 120px",
            backgroundColor: "cadetblue",
          }}
        >
          <HeaderComponenet />
        </div>
      </>
    );
  }
}
