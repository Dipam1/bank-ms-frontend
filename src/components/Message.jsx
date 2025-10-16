import { Snackbar } from "@mui/material";
import React from "react";

const Message = ({
  open = true,
  handleClose = () => {},
  message,
  action = () => {},
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default Message;
