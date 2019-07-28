import React from "react";
import ResourceListView from "./resource-list-view/ResourceListView";
import ResourceToolBar from "./resource-tool-bar/ResourceToolBar";
import useStyles from "./resourceStyles";

const ResourceFrame = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ResourceToolBar />
            <div className={classes.appBarSpacer} />
            <ResourceListView />
        </React.Fragment>
    );
};

export default ResourceFrame;
