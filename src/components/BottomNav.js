import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import StarIcon from '@material-ui/icons/Star';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
  root: {
    maxWidth: 1920,
    width: "100%",
    minWidth: 400,
    position: "fixed",
    bottom: 0,
  },
});

export default function BottomNavBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.page);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="ホーム" value="home" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="お気に入り" value="favorites" icon={<StarIcon />} component={Link} to="/" />
      <BottomNavigationAction label="投稿" value="post" icon={<AddBoxIcon color="primary" fontSize="large" />} component={Link} to="/post" />
      <BottomNavigationAction label="やりとり" value="message" icon={<EmailIcon />} />
      <BottomNavigationAction label="MyAccount" value="myaccount" icon={<AccountBoxIcon />} />
    </BottomNavigation>
  );
}