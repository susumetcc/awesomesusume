import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardItem from '../components/ItemCard';
import BottomNavBar from '../components/BottomNav';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <>
      <CardItem />
      <BottomNavBar page="home" />
    </>
  );
}