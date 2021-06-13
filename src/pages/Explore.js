import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CardItem from '../components/ItemCard';
import BottomNavBar from '../components/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function TabPanel(props) {
  const { value, index } = props;

  return (
    <div>
      <CardItem />
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ImgMediaCard() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
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
          <CardItem tab={"home"} />
        </div>
        <div value={value} index={1} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"club"} />
        </div>
        <div value={value} index={2} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"game"} />
        </div>
        <div value={value} index={3} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"video"} />
        </div>
        <div value={value} index={4} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"menscosmetic"} />
        </div>
        <div value={value} index={5} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"sport"} />
        </div>
        <div value={value} index={6} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"stationery"} />
        </div>
        <div value={value} index={7} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"restaurant"} />
        </div>
        <div value={value} index={8} style={{justifyContent: "center", padding: "2px"}}>
          <CardItem tab={"lecture"} />
        </div>
      </SwipeableViews>
      <BottomNavBar page="home" />
    </>
  );
}