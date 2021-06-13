import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
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
    this.state = {title: "", text: "", detail: "", category: ""};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeDetail = this.changeDetail.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  handleOnSubmit = () => {
    const docId = db.collection("articles").doc().id;
    db.collection("articles").doc(docId).set({
      docId: docId,
      title: this.state.title,
      text: this.state.text,
      detail: this.state.detail,
      category: this.state.category,
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

  changeCategory(e) {
    this.setState({ category: e.target.value });
  }

  render() {
    return (
      <>
        <p>投稿</p>
        <form className={useStyles.root} onSubmit={this.handleOnSubmit} noValidate autoComplete="off" style={{justifyContent: "center"}}>
          <Button component="label">
            ファイル送信ボタンです
            <input
              type="file"
              className="inputFileBtnHide"
            />
          </Button>
          <TextField id="input-title" label="タイトル" onChange={this.changeTitle} />
          <TextField id="imput-text" label="リード文" onChange={this.changeText} variant="outlined" />
          <InputLabel id="input-category">カテゴリ</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.category}
            onChange={this.changeCategory}
          >
            <MenuItem value={"club"}>サークル</MenuItem>
            <MenuItem value={"game"}>ゲーム</MenuItem>
            <MenuItem value={"video"}>映画/動画/アニメ</MenuItem>
            <MenuItem value={"menscosmetic"}>メンズコスメ</MenuItem>
            <MenuItem value={"sport"}>スポーツ</MenuItem>
            <MenuItem value={"stationery"}>文房具・アクセサリ</MenuItem>
            <MenuItem value={"restaurant"}>飲食店</MenuItem>
            <MenuItem value={"lecture"}>講義</MenuItem>
          </Select>
          <TextField id="input-detail" label="本文" onChange={this.changeDetail} variant="outlined" />
          <Button type="submit">投稿</Button>
        </form>
        <BottomNavBar page="post" />
      </>
    );
  }
}

export default ImgMediaCard;