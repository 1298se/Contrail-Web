import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
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
import FileCopy from '@material-ui/icons/FileCopy';
import Group from '@material-ui/icons/Group';
import Setttings from '@material-ui/icons/Settings';

import theme from '../theme';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function MainFrame() {
  const classes = useStyles();
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
              <ListItemIcon> <FileCopy /> </ListItemIcon>
              <ListItemText primary='Files' />
            </ListItem>
            <ListItem button key='Groups'>
              <ListItemIcon> <Group /> </ListItemIcon>
              <ListItemText primary='Groups' />
            </ListItem>
            <ListItem button key='Files'>
              <ListItemIcon> <FileCopy /> </ListItemIcon>
              <ListItemText primary='Adminstration' />
            </ListItem>
            <ListItem button key='Settings'>
              <ListItemIcon>  <Setttings /> </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
          </List>
        </Drawer>
        <Paper>
          <Container maxWidth="md" theme={theme}>


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
