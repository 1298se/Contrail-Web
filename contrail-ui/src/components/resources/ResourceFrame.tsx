import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { fetchRootResources } from "../../store/actions/resourceActions";
import { IResourceFetchAllAction } from "../../store/actions/resourceActions.types";
import { IAppReduxState } from "../../store/store.types";
import withSnackbar from "../feedback/snackbar-component/SnackbarComponent";
import ResourceListView from "./resource-list-view/ResourceListView";
import ResourceToolBar from "./resource-tool-bar/ResourceToolBar";
import * as types from "./resourceFrame.types";
import styles from "./resourceStyles";

class ResourceFrame extends Component<types.ResourceFrameProps, {}> {

    public componentDidMount() {
        this.props.fetchRootResources()
            .catch((error) => {
                this.props.setSnackbarDisplay("error", "Failed to load resources: " + error.response);
            });
    }

    public render() {
        const { classes } = this.props;
        const { userResources } = this.props;
        const { match } = this.props;
        const sharedResources = userResources.sharedBy.concat(userResources.sharedTo);

        const renderRootResources = () => <ResourceListView display={userResources.root} />;
        const renderFavouriteResources = () => <ResourceListView display={userResources.favourites} />;
        const renderSharedResources = () => <ResourceListView display={sharedResources} />;
        const renderTrashResources = () => <ResourceListView display={userResources.trash} />;

        return (
            <React.Fragment>
                <ResourceToolBar />
                <div className={classes.appBarSpacer} />
                <Router>
                    <Route path={`${match.path}/files`} render={renderRootResources} />
                    <Route path={`${match.path}/favourites`} render={renderFavouriteResources} />
                    <Route path={`${match.path}/shared`} render={renderSharedResources} />
                    <Route path={`${match.path}/trash`} render={renderTrashResources} />
                </Router>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IResourceFrameStateProps => {
    return {
        isFetchingResources: state.appUiState.appLoadState.isFetchingRootResources,
        userResources: state.resourceState.userResources,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IResourceFetchAllAction>) => {
    return {
        fetchRootResources: () => dispatch(fetchRootResources()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ResourceFrame)));
