import React from "react";
import ChatEditor from "./ChatEditor";

export default function ChatComponent() {
  return (
    <div className="w-full bg-blue-950 h-full border-2 border-blue-950 rounded-sm text-white">
      <h1>User Mechanzi</h1>
      <div
        id="chat-inbox"
        className="border-t-2 border-blue-950 h-[80vh] bg-blue-300"
      >
        <div className="msgs w-full flex flex-col gap-2 p-5!">
          <div className="w-full flex justify-end">
            <div className=" bg-fuchsia-700 px-5! py-1! rounded-tr-full rounded-tl-full font-semibold rounded-bl-full text-center flex justify-center">
              <p className="send">Hello</p>
            </div>
          </div>
          <div className="w-full flex justify-start">
            <div className=" bg-blue-700 rounded-tr-full px-5! py-1! rounded-tl-full rounded-br-full font-semibold text-center">
              <p className="receive">Hello Bro!</p>
            </div>
          </div>
        </div>
      </div>
        <div
          id="chat-editor"
          className="border-t-2 w-full text-blue-950 font-semibold border-blue-950 bg-blue-300 py-2! px-5!"
        >
          <ChatEditor />
        </div>
    </div>
  );
}
