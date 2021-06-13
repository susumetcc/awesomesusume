import React from 'react';
import {  useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    maxWidth: 1920,
    minWidth: 400,
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
      <BottomNavigationAction label="お気に入り" value="favorites" icon={<FavoriteIcon />} component={Link} to="/" />
      <BottomNavigationAction label="投稿" value="post" icon={<AddBoxIcon color="primary" fontSize="large" />} component={Link} to="/post" />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}