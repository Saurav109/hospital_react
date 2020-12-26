import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyDialogue(props) {
  return (
    <div>
      <Dialog
        open={props.isShowing}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            {props.buttonCloseText ? props.buttonCloseText : "cancle"}
          </Button>
          <Button onClick={props.handleConfirm} color="primary">
            {props.buttonConfirmText ? props.buttonConfirmText : "ok"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
