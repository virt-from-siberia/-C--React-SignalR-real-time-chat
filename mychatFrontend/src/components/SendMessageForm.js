import React from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";

export const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="enter your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div>
          <Button
            variant="primary"
            type="submit"
            disabled={!message}
          >
            send
          </Button>
        </div>
      </InputGroup>
    </Form>
  );
};
