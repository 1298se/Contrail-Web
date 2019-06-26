import React, {Component} from "react";
import MainAppBar from "./main-app-bar/MainAppBar";
import MainDrawer from "./main-drawer/MainDrawer";
import MainView from "./main-view/MainView";

class MainFrame extends Component {
    public render() {
        return (
            <div>
            <MainAppBar />
            <MainDrawer />
            <MainView />
            </div>
        );
    }
}
export default MainFrame;
