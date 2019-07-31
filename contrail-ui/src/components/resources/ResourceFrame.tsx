import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchRootResources } from "../../store/actions/resourceActions";
import { IResourceFetchAllAction } from "../../store/actions/resourceActions.types";
import { IAppReduxState } from "../../store/store.types";
import ResourceListView from "./resource-list-view/ResourceListView";
import ResourceToolBar from "./resource-tool-bar/ResourceToolBar";
import * as types from "./resourceFrame.types";
import styles from "./resourceStyles";

class ResourceFrame extends Component<types.ResourceFrameProps, {}> {
    public componentDidMount() {
        this.props.fetchRootResources()
        .catch((error) => {
            // TODO: Handle error with Snackbar
        });
    }

    public render() {
        const { classes } = this.props;
        const { userResources } = this.props;

        return (
            <React.Fragment>
                <ResourceToolBar />
                <div className={classes.appBarSpacer} />
                <ResourceListView display={this.props.userResources.root}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResourceFrame));
