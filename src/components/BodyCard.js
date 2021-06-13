import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import NoImg from '../img/noimg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  gridList: {
    minWidth: 300,
    minHeight: 350,
  },
  title: {
    fontSize: 14,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  avater: {
    height: 24,
    width: 24,
  },
}));

export default function BodyCard(props) {
  const { list, column } = props;
  const classes = useStyles();
  console.log(list)
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={2} cols={column} className={classes.gridList} style={{width: "100vw"}}>
        {list.map((item) => (
          <GridListTile key={item.docId}>
            <img src={item.imageUrl[0]} alt={"Contemplative Reptile"} title="Contemplative Reptile" />
            <GridListTileBar
              title={item.title}
              subtitle={
                <span>
                  {item.text}
                  <br />
                  <Avatar alt="avater-image" src="" className={classes.avater}></Avatar>
                  {item.name}
                </span>
              }
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}