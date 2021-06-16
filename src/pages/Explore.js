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

function TabPanel(props) {
  const { value, index } = props;

  return (
    <div>
      <ItemPanel />
    </div>
  );
}

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
          <Tab label="サーチ" {...a00yProps(2)} />
        </Tabs>
      </Paper>
      <ModePanel value={mode} index={0} style={{justifyContent: "center", paddingBottom: "16px"}} >
        <p>パネル1</p>
        <FollowPanel tab={"home"} />
      </ModePanel>
      <ModePanel value={mode} index={1} style={{justifyContent: "center", paddingBottom: "16px"}}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="Category"
          >
            <Tab label="ホーム" {...a11yProps(0)} />
            <Tab label="サークル" {...a11yProps(1)} />
            <Tab label="ゲーム" {...a11yProps(2)} />
            <Tab label="映画/動画/アニメ" {...a11yProps(3)} />
            <Tab label="メンズコスメ" {...a11yProps(4)} />
            <Tab label="スポーツ" {...a11yProps(5)} />
            <Tab label="文房具/アクセサリ" {...a11yProps(6)} />
            <Tab label="飲食店" {...a11yProps(7)} />
            <Tab label="講義" {...a11yProps(8)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div value={value} index={0} style={{justifyContent: "center", padding: "2px"}} >
            <ItemPanel tab={"home"} />
          </div>
          <div value={value} index={1} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"club"} />
          </div>
          <div value={value} index={2} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"game"} />
          </div>
          <div value={value} index={3} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"video"} />
          </div>
          <div value={value} index={4} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"menscosmetic"} />
          </div>
          <div value={value} index={5} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"sport"} />
          </div>
          <div value={value} index={6} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"stationery"} />
          </div>
          <div value={value} index={7} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"restaurant"} />
          </div>
          <div value={value} index={8} style={{justifyContent: "center", padding: "2px"}}>
            <ItemPanel tab={"lecture"} />
          </div>
        </SwipeableViews>
      </ModePanel>
      <ModePanel value={mode} index={2} style={{justifyContent: "center", padding: "2px"}} ></ModePanel>
      <BottomNavBar page="home" />
    </>
  );
}