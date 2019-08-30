import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchRootResources, setResourceListener } from "../../store/actions/resourceActions";
import { ResourceActions } from "../../store/actions/resourceActions.types";
import withSnackbar from "../feedback/snackbar-component/SnackbarComponent";
import ResourceListView from "./resource-list-view/ResourceListView";
import ResourceToolBar from "./resource-tool-bar/ResourceToolBar";
import * as types from "./resourceFrame.types";
import styles from "./resourceStyles";

class ResourceFrame extends Component<types.ResourceFrameProps, types.IResourceFrameState> {
    public state = {
        unsubscribeListener: () => null,
    };

    public componentDidMount() {
        this.props.fetchRootResources()
            .catch((error) => {
                this.props.setSnackbarDisplay("error", "Failed to load resources: " + error);
            });
        this.props.setResourceListener()
            .then((unsubscribe) => {
                this.setState({
                    unsubscribeListener: unsubscribe,
                });
            })
            .catch((error) => {
                this.props.setSnackbarDisplay("error", "Failed to sync resources: " + error);
            });
    }

    public componentWillUnmount() {
        this.state.unsubscribeListener();
    }

    public render() {
        const { classes } = this.props;
        const { match } = this.props;

        const renderRootResources = () => {
            return renderResourcesWrapper(types.ResourcePages.FILES);
        };

        const renderFavouriteResources = () => {
            return renderResourcesWrapper(types.ResourcePages.FAVOURITES);
        };

        const renderSharedResources = () => {
            return renderResourcesWrapper(types.ResourcePages.SHARED);
        };

        const renderTrashResources = () => {
            return renderResourcesWrapper(types.ResourcePages.TRASH);
        };

        const renderResourcesWrapper = (page: string) => {
            return (
                <React.Fragment>
                    <ResourceToolBar titleText={page} />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView page={page} />
                </React.Fragment>
            );
        };

        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${match.path}/files`} component={renderRootResources} />
                    <Route path={`${match.path}/favourites`} component={renderFavouriteResources} />
                    <Route path={`${match.path}/shared`} component={renderSharedResources} />
                    <Route path={`${match.path}/trash`} component={renderTrashResources} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ResourceActions>) => {
    return {
        fetchRootResources: () => dispatch(fetchRootResources()),
        setResourceListener: () => dispatch(setResourceListener()),
    };
};

export default connect(null, mapDispatchToProps)(withSnackbar(withStyles(styles)(ResourceFrame)));
