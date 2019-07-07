import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import styles from "../editStyles";

class MainEditUserView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Box>
              <Paper square={true}>
                <div>
                  <h1>
                    This is the page where you can edit your user profile!
                  </h1>
                </div>
              </Paper>
            </Box>
          </main>
        );
    }
}

export default withStyles(styles)(MainEditUserView);
