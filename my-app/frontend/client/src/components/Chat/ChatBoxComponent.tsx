import HeaderComponenet from "../Header/HeaderComponenet";
import ChatComponent from "./ChatComponent";

export default function ChatBoxComponent() {
  return (
    <div className="">
      <div>
        <HeaderComponenet />
      </div>
      <div className="flex justify-around w-fullitems-center">
        <div className=" w-2/5">
          <p>Working!</p>
        </div>
        <div className="flex w-[800px]  h-full justify-center items-center">
          <div className="flex w-full h-full justify-end">
            <ChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
