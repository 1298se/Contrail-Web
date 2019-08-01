import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import { Subtract } from "utility-types";
import SnackbarContentWrapper from "../snackbar-content-wrapper/SnackbarContentWrapper";
import { snackbarVariant } from "../snackbar-content-wrapper/snackbarContentWrapper.types";
import * as types from "./snackbarComponent.types";

function withSnackbar<T extends types.ISnackbarInjectProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<Subtract<T, types.ISnackbarInjectProps>> {
        public state: types.IWithSnackbarState = {
            snackbarVariant: "error",
            snackbarMessage: null,
            shouldDisplaySnackbar: false,
        };

        public setSnackbarDisplay = (variant: keyof typeof snackbarVariant, message: any) => {
            this.setState({
                snackbarVariant: variant,
                snackbarMessage: message,
                shouldDisplaySnackbar: true,
            });
        }

        // For closing an opened Snackbar. Must be executed first before clearing the snackbar message.
        public handleSnackbarClose = () => {
            this.setState({
                ...this.state,
                shouldDisplaySnackbar: false,
            });
        }

        // Clears the snackbar message.
        public clearSnackbarMessage = () => {
            this.setState({
                ...this.state,
                snackbarMessage: null,
            });
        }

        public render() {
            return (
                <React.Fragment>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={this.state.shouldDisplaySnackbar}
                        onClose={this.handleSnackbarClose}
                        onExited={this.clearSnackbarMessage}
                    >
                        <SnackbarContentWrapper
                            message={String(this.state.snackbarMessage)}
                            variant={this.state.snackbarVariant}
                            onClose={this.handleSnackbarClose}
                        />
                    </Snackbar>
                    <Component {...this.props as T} setSnackbarDisplay={this.setSnackbarDisplay} />
                </React.Fragment>
            );
        }
    };
}

export default withSnackbar;
