import { Component } from "react";
import HeaderComponenet from "../components/Header/HeaderComponenet";
import EditorComponent from "../components/Editor/EditorComponent";

export default class IndexPage extends Component {
  render() {
    return (
      <>
        <div>
          <HeaderComponenet />
        </div>
        <div
          style={{
            width: "100%",
            padding: "0px 80px",
          }}
        >
          <EditorComponent />
        </div>
      </>
    );
  }
}
