import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Files.css";

class Files extends Component {

    public render() {
      const redirect  = false;

      if (redirect) {
        return <Redirect to="/auth"/>;
      }

      return (
       <h1>Files</h1>
      );
    }
}

export default Files;
