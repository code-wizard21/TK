import { useState } from "react";
import { useCallback } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleOpen = (msg) => {
    setOpen(true);
    setMessage(msg);
  };

  const onAlertBtnClose = useCallback(() => {
    setOpen(false);
    setMessage(undefined);
  }, [setOpen]);

  return {
    open,
    message,
    openSnackbar: handleOpen,
    onClose: onAlertBtnClose,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },

    ContentProps: {
      "aria-describedby": "message-id",
    },
  };
};
