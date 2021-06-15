import React from 'react';
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
import './Article.css';
import ViewComments from '../components/ViewComments';
import BottomNavBar from '../components/BottomNav';
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
function CardDetail(props) {
  const { data, openPostComment, changeLike, signin } = props;
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
        <IconButton aria-label="comment" onClick={openPostComment}>
          <AddCommentOutlinedIcon />
        </IconButton>
        <IconButton aria-label="like" onClick={changeLike}>
          {mylike? <FavoriteIcon color={"primary"}/> : <FavoriteBorderOutlinedIcon /> }
        </IconButton>
        <Typography>{likelen}</Typography>
        <IconButton aria-label="star">
          <StarBorderOutlinedIcon />
        </IconButton>
      </CardActions>
    </>
  )
}

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, expanded: false, validsend: false, comment: "", uid: ""};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.visiblePostComment = this.visiblePostComment.bind(this);
    this.changePostComment = this.changePostComment.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.changeLike = this.changeLike.bind(this);
  }

  _isMounted = false;

  // Firestoreからデータ一覧を取得する
  async componentDidMount() {
    this._isMounted = true;
    // 記事の取得
    await db.collection("articles").doc(this.props.match.params.docid).onSnapshot(async (doc) => {
      if (doc.exists) {
        let article = doc.data();
        await doc.data().user.get().then((doc2) => {
          article.name = doc2.data().name;
          article.avatar = doc2.data().avatarUrl;
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
        this.setState({ data: article });
      } else {
        console.log("No such document!");
      }
    });
    // ユーザ認証情報の取得
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid});
      }
    });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  // コメントの投稿欄を表示/非表示する
  visiblePostComment() {
    if(this.state.expanded) {
      this.setState({expanded: false});
    } else {
      // ユーザ認証情報の取得
      auth.onAuthStateChanged((user) => {
        if (user) {
          let u = {};
          this.setState({uid: user.uid, expanded: true});
          console.log(u)
        } else {
          window.location.href = "/signin?redirect=/p/" + this.props.match.params.docid;
        }
      });
    }
  }

  changePostComment(event) {
    if(event.target.value.length > 0){
      this.setState({validsend: true, comment: event.target.value});
    } else {
      this.setState({validsend: false, comment: event.target.value});
    }
  }

  // コメントの投稿
  async sendComment() {
    if(this.state.validsend) {
      let comments = this.state.data.comments;
      comments.push({
        userid: this.state.uid,
        text: this.state.comment,
        ts: new Date(),
      });
      await db.collection("articles").doc(this.props.match.params.docid).update({
        comments: comments,
      }).then(async () => {
        await this.setState({validsend: false, comment: ""});
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
  }

  // いいねの登録・解除
  async changeLike() {
    // ユーザ認証情報の取得
    await auth.onAuthStateChanged(async (user) => {
      if (user) {
        let like = this.state.data.like;
        let requireAdd = true;
        for(let likeidx = 0; likeidx < like.length; likeidx++) {
          if(like[likeidx].userid === user.uid) {
            requireAdd = false;
            like.splice(likeidx, 1);
            break;
          }
        }
        if(requireAdd) {
          like.push({
            userid: user.uid,
            ts: new Date(),
          });
        }
        await db.collection("articles").doc(this.props.match.params.docid).update({
          like: like,
        }).then(async () => {
          console.log("Document successfully updated!" + like.length);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
      } else {
        window.location.href = "/signin?redirect=/p/" + this.props.match.params.docid;
      }
    });
  }

  render() {
    let data = this.state.data;
    let expanded = this.state.expanded;
    let validsend = this.state.validsend;
    let newcomment = this.state.comment;
    let uid = this.state.uid;
    console.log(data);
    return (
      <>
        <MediaQuery query="(max-width: 799.9px)">
          <div style={{padding: "20px"}}>
            <Card>
              <CardDetail data={data} openPostComment={this.visiblePostComment} changeLike={this.changeLike} signin={uid}></CardDetail>
              <List>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <form className={"postform"} noValidate autoComplete="off">
                      <TextField
                        id="standard-basic"
                        value={newcomment}
                        style={{width: "85%"}}
                        label="コメント"
                        onChange={this.changePostComment}
                        multiline rows={4}
                      />
                      <IconButton aria-label="send" disabled={!validsend} color={"primary"} onClick={this.sendComment}>
                        <SendIcon />
                      </IconButton>
                    </form>
                  </CardContent>
                </Collapse>
                {data.comments && data.comments.length > 0?
                  <>
                    <ViewComments data={data.comments}></ViewComments>
                  </>
                :
                  <div className={"nocomment"}>
                    <Typography>まだコメントはないようです。</Typography>
                    <Typography>さあ、一番乗りでコメントを送りましょう。</Typography>
                  </div>
                }
              </List>
            </Card>
          </div>
        </MediaQuery>
        <MediaQuery query="(min-width: 800px)">
          <div style={{padding: "20px"}}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Card>
                  <CardDetail data={data} openPostComment={this.visiblePostComment} changeLike={this.changeLike} signin={uid}></CardDetail>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <List>
                  <Collapse in={expanded} timeout="auto" style={{width: "100%", alignItems: "center", marginBottom: "10px"}} unmountOnExit>
                    <form className={"postform"} noValidate autoComplete="off">
                      <TextField
                        id="standard-basic"
                        value={newcomment}
                        style={{width: "85%"}}
                        label="コメント"
                        onChange={this.changePostComment}
                        multiline rows={4}
                      />
                      <IconButton aria-label="send" disabled={!validsend} color={"primary"} onClick={this.sendComment}>
                        <SendIcon />
                      </IconButton>
                    </form>
                  </Collapse>
                  {data.comments && data.comments.length > 0?
                    <ViewComments data={data.comments}></ViewComments>
                  :
                    <div className={"nocomment"}>
                      <Typography>まだコメントはないようです。</Typography>
                      <Typography>さあ、一番乗りでコメントを送りましょう。</Typography>
                    </div>
                  }
                </List>
              </Grid>
            </Grid>
          </div>
        </MediaQuery>
        <BottomNavBar page="" />
      </>
    )
  }
}