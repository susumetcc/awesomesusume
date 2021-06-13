import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase, { db, storage } from '../firebase';
import './Post.css'
import BottomNavBar from '../components/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// Firebase


class ImgMediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "", text: "", detail: ""};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeDetail = this.changeDetail.bind(this);
  }

  handleOnSubmit = () => {
    const docId = db.collection("articles").doc().id;
    db.collection("articles").doc(docId).set({
      docId: docId,
      title: this.state.title,
      text: this.state.text,
      detail: this.state.detail,
      userid: 'test',
      imageUrl: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //登録後、Topに移動
    this.props.history.push("/");
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }
  changeText(e) {
    this.setState({ text: e.target.value });
  }
  changeDetail(e) {
    this.setState({ detail: e.target.value });
  }

  render() {
    return (
      <>
        <p>投稿</p>
        <form className={useStyles.root} onSubmit={this.handleOnSubmit} noValidate autoComplete="off">
          <Button component="label">
            ファイル送信ボタンです
            <input
              type="file"
              className="inputFileBtnHide"
            />
          </Button>
          <TextField id="input-title" label="タイトル" onChange={this.changeTitle} />
          <TextField id="imput-text" label="リード文" onChange={this.changeText} variant="outlined" />
          <TextField id="input-detail" label="本文" onChange={this.changeDetail} variant="outlined" />
          <Button type="submit">投稿</Button>
        </form>
        <BottomNavBar page="post" />
      </>
    );
  }
}

export default ImgMediaCard;