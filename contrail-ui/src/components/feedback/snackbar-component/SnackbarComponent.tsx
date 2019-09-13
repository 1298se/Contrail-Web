import Snackbar from "@material-ui/core/Snackbar";
import React, { SyntheticEvent } from "react";
import { Subtract } from "utility-types";
import SnackbarContentWrapper from "../snackbar-content-wrapper/SnackbarContentWrapper";
import { snackbarVariant } from "../snackbar-content-wrapper/snackbarContentWrapper.types";
import * as types from "./snackbarComponent.types";

function withSnackbar<T extends types.ISnackbarInjectProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<Subtract<T, types.ISnackbarInjectProps>> {
        public queue = React.createRef<types.ISnackbarMessage[]>();

        public state: types.IWithSnackbarState = {
            shouldDisplaySnackbar: false,
            currentMessage: null,
        };

        public processQueue = () => {
            if (this.queue.current && this.queue.current.length > 0) {
                this.setState({
                    currentMessage: this.queue.current.shift(),
                    shouldDisplaySnackbar: true,
                });
            }
        }

        public setSnackbarDisplay = (variant: keyof typeof snackbarVariant, message: any) => {
            if (this.queue.current) {
                this.queue.current.push({
                    snackbarVariant: variant,
                    snackbarMessage: message,
                });
            }

            if (this.state.shouldDisplaySnackbar) {
                this.setState({
                    shouldDisplaySnackbar: false,
                });
            } else {
                this.processQueue();
            }
        }

        // For closing an opened Snackbar. Must be executed first before clearing the snackbar message.
        public handleSnackbarClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
            if (reason === "clickaway") {
                return;
            }

            this.setState({
                ...this.state,
                shouldDisplaySnackbar: false,
            });
        }

        // Clears the snackbar message.
        public handleExited = () => {
            this.processQueue();
        }

        public render() {
            const currentSnackbarMessage =
                this.state.currentMessage ? String(this.state.currentMessage.snackbarMessage) : undefined;

            return (
                <React.Fragment>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={this.state.shouldDisplaySnackbar}
                        onClose={this.handleSnackbarClose}
                        onExited={this.handleExited}
                        autoHideDuration={5000}
                    >
                        <SnackbarContentWrapper
                            message={currentSnackbarMessage}
                            variant={this.state.currentMessage ? this.state.currentMessage.snackbarVariant : "info"}
                        />
                    </Snackbar>
                    <Component {...this.props as T} setSnackbarDisplay={this.setSnackbarDisplay} />
                </React.Fragment>
            );
        }
    };
}

export default withSnackbar;
