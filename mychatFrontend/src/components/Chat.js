import { MessageContainer } from "./MessageContainer";

export const Chat = ({ messages }) => {
  return (
    <div className="chat">
      <MessageContainer messages={messages} />
    </div>
  );
};
