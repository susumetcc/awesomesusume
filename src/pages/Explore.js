import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ItemPanel from '../components/ItemPanel';
import FollowPanel from '../components/FollowPanel';
import BottomNavBar from '../components/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

function ModePanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

function a00yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function ImgMediaCard() {
  const classes = useStyles();
  const theme = useTheme();
  const [mode, setMode] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const modeChange = (event, newValue) => {
    setMode(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={mode}
          onChange={modeChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="Mode"
          centered
        >
          <Tab label="フォロー中" {...a00yProps(0)} />
          <Tab label="カテゴリ" {...a00yProps(1)} />
        </Tabs>
      </Paper>
      <ModePanel value={mode} index={0} style={{justifyContent: "center", paddingBottom: "16px"}} >
        <p>タイムライン</p>
        <div value={value} index={0} style={{justifyContent: "center", padding: "2px"}} >
          <FollowPanel tab={"home"} />
        </div>
      </ModePanel>
      <ModePanel value={mode} index={1} style={{justifyContent: "center", paddingBottom: "16px"}}>
        <div value={value} index={0} style={{justifyContent: "center", padding: "2px"}} >
          <ItemPanel tab={"home"} />
        </div>
      </ModePanel>
      <BottomNavBar page="home" />
    </>
  );
}