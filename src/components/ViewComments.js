import React from 'react';
import { db } from '../firebase';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// コメントの表示
class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment: props.comment, name: "", avatar: ""};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    if(this.state.comment.userid !== "") {
      console.log(this.state.comment.userid);
      await db.collection("users").doc(this.state.comment.userid).get().then((doc) => {
        this.setState({name: doc.data().name, avatar: doc.data().avatar});
      });
    }
  }

  componentWillUnmount = () => {
  }
  
  render() {
    const comment = this.state.comment;
    const name = this.state.name;
    const avatar = this.state.avatar;
    let datetime = new Date(comment.ts.seconds * 1000);
    if(!comment.ts.seconds) {
      datetime = comment.ts;
    }
    console.log(comment)
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {comment.text}
              </Typography>
              <br />
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {datetime.toLocaleString('ja')}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    )
  }
}


export default class ViewComments extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data)
    this.state = {data: props.data};
  }
  
  render() {
    const data = this.state.data;
    console.log(data)
    let ary = [];
    for(let key_idx = 0; key_idx < data.length; key_idx++){
      ary.unshift(<CommentItem key={'comment' + key_idx} comment={data[key_idx]} />)
      ary.unshift(<Divider key={'divider' + key_idx} variant="inset" />)
    }
    return (
      <>
        {ary}
      </>
    )
  }
}