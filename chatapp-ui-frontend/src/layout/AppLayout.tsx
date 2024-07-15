import ChatList from "../specific/ChatList";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Header></Header>
        <div className="border h-full flex flex-row">
          <div className="flex-[0.7] bg-red-300">
            {/* <ChatList></ChatList> */}
          </div>
          <div className="flex-1">
            <WrappedComponent {...props} />
          </div>
          <div className="flex-1">Third</div>
        </div>
      </>
    );
  };
};

export default AppLayout;
