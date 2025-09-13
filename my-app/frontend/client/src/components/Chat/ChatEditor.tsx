import React, { useState, useRef } from "react";

export default function ChatEditor({ chatRoomId }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatUrl = "http://localhost:4000/graphql";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // Reset height
    el.style.height = `${el.scrollHeight}px`; // Grow height to content
    setText(e.target.value); // Your state handler
  };

  const showChatMsg = () => {
    const sendMessage = async () => {
      const res = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation TextMessage($chatRoomId: String!, $content: String!) {
            textMessage(chatRoomId: $String!, content: $String!): Message! {
              id
              content
              sender {
                name
              }
              chatRoom {
                id
              }
            }
          }
        `,
          variables: { chatRoomId: chatRoomId, content: text },
        }),
      });

      const result = await res.json();

      if (result.errors) {
        console.log("Client Error");
      } else {
        console.log(result.data);
      }
    };

    sendMessage();
  };

  return (
    <div className="flex flex-col">
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={handleChange}
        className="w-full p-2! text-base leading-5 rounded-lg focus:border focus:border-gray-300 focus:outline-none resize-none overflow-hidden transition-all"
        placeholder="Type a message..."
      ></textarea>
      <button type="button" onClick={showChatMsg}>
        Send
      </button>
    </div>
  );
}
