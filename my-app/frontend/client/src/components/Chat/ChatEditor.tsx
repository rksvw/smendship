import { useState, useRef } from "react";

export default function ChatEditor() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // Reset height
    el.style.height = `${el.scrollHeight}px`; // Grow height to content
    setText(e.target.value); // Your state handler
  };

  // const [text, setText] = useState("");
  // const [image, setImage] = useState<File | null >(null);

  // const [sendMessage] = useMutation("SEND_MESSAGE")
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
    </div>
  );
}
