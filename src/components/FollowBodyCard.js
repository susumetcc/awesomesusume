import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import firebase, { auth, db, storage } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import '../pages/Article.css';
import ViewComments from './ViewComments';
import BottomNavBar from './BottomNav';
import NoImg from '../img/noimg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'secondery',
  },
  author: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    paddingLeft: '4px',
  }
}));

// 詳細情報の表示
function BodyCardDetail(props) {
  const { data, signin } = props;
  const classes = useStyles();
  let likelen = 0;
  let mylike = false;
  console.log(data.like)
  if(data.like) {
    likelen = data.like.length;
    if (signin !== "") {
      for(let likeidx2 = 0; likeidx2 < data.like.length; likeidx2++) {
        if(data.like[likeidx2].userid === signin) {
          mylike = true;
          break;
        }
      }
    }
  }

  return (
    <>
      <CardHeader
        avatar={
          <div style={{display: "flex"}}>
            <Avatar aria-label="recipe" className={classes.avatar} src={data.avatar}>
            </Avatar>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.author}>
              {data.name}
            </Typography>
          </div>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader={data.text}
      />
      {data.imageUrl && data.imageUrl.length > 0?
        <CardMedia
            className={classes.media}
            image={data.imageUrl[0]}
            title="画像"
        />
      :
      <CardMedia
        style={{height: "360px"}}
        image={NoImg}
        title="画像"
      />
      }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.detail}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          {mylike? <FavoriteIcon color={"primary"}/> : <FavoriteBorderOutlinedIcon /> }
        </IconButton>
        <Typography>{likelen}</Typography>
        <IconButton aria-label="star">
          <StarBorderOutlinedIcon />
        </IconButton>
        <Link to={"/p/" + data.docId}>記事のページへ</Link>
      </CardActions>
    </>
  )
}

export default function FollowCardDetail(props) {
  const { list, column, signin } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {list.map((item) => (
        <BodyCardDetail key={item.docId} data={item} signin={signin}></BodyCardDetail>
      ))}
    </div>
  );
}