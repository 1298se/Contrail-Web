import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GroupIcon from '@material-ui/icons/Group';
import SetttingsIcon from '@material-ui/icons/Settings';
import { withStyles } from "@material-ui/styles";
import theme from '../../../theme';
import styles from "../../auth/styles";

class MainFrame extends Component<any,any> {
    public render(){
    const { classes } = this.props;
    return (
        
        <body>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Contrail Web
            </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem button key='Files'>
                            <ListItemIcon> 
                                <FileCopyIcon /> 
                            </ListItemIcon>
                            <ListItemText primary='Files' />
                        </ListItem>
                        <ListItem button key='Groups'>
                            <ListItemIcon> 
                                <GroupIcon /> 
                            </ListItemIcon>
                            <ListItemText primary='Groups' />
                        </ListItem>
                        <ListItem button key='Files'>
                            <ListItemIcon> 
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary='Adminstration' />
                        </ListItem>
                        <ListItem button key='Settings'>
                            <ListItemIcon> 
                                 <SetttingsIcon /> 
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </ListItem>
                    </List>
                </Drawer>
                <Paper>
                    <Container maxWidth="md">
                        <Box mt="5rem">
                            <div>
                                <h1> Welcome to the MainFrame!</h1>
                            </div>
                        </Box>
                    </Container>
                </Paper>

            </div>
        </body>


    );
   }
}
export default withStyles(styles)(MainFrame)