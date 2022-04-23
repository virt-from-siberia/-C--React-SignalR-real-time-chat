import { Button } from "react-bootstrap";
import { MessageContainer } from "./MessageContainer";
import { SendMessageForm } from "./SendMessageForm";

export const Chat = ({
  messages,
  sendMessage,
  closeConnection,
}) => {
  return (
    <>
      <div className="leave-room">
        <Button
          onClick={() => closeConnection}
          variant="danger"
        >
          Leave Room
        </Button>
      </div>
      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </>
  );
};
