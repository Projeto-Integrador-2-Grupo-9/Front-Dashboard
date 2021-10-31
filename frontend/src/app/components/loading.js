import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
class Loading extends Component {
  wait() {
    var start = new Date().getTime();
    var end = start;
    while (end < start + 3000) {
      end = new Date().getTime();
    }
    this.props.close();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.close}
        style={{
          width: "350px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        PaperProps={{
          style: { borderRadius: "10px" },
        }}
        disableBackdropClick={true}
      >
        <h5 className="card-title mt-2 p-3 pb-0">Carregando Informações...</h5>

        <DialogContent
          style={{
            alignSelf: "center",
            paddingBottom: "24px",
          }}
        >
          <Loader type="Circle" color="#F9BB69" height={120} width={120} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default Loading;