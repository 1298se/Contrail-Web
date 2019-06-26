import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import styles from "../mainStyles";

class MainView extends Component<any, any> {
    public render() {
        return (
        <Paper>
            <Container maxWidth="md">
                <Box mt="5rem">
                    <div>
                        <h1> Welcome to the MainFrame!</h1>
                    </div>
                </Box>
            </Container>
        </Paper>
        );
    }
}
export default withStyles(styles)(MainView);
