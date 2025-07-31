import "./App.css";
import LoginComponent from "./components/Auth/LoginComponent";
import { Route, Routes } from "react-router-dom";
import SignupComponent from "./components/Auth/SignupComponent";
import IndexPage from "./pages/IndexPage";
import ChatBoxComponent from "./components/Chat/ChatBoxComponent";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="auth/login" element={<LoginComponent />} />
          <Route path="auth/signup" element={<SignupComponent />} />
          <Route path="" element={<IndexPage />} />
          <Route path="chat" element={<ChatBoxComponent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
