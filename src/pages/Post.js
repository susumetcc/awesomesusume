import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import firebase, { db, storage, auth } from '../firebase';
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

    this.state = {title: "", text: "", detail: "", category: "", uid: "", file: [], docId: db.collection("articles").doc().id};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeDetail = this.changeDetail.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  handleOnSubmit = async () => {
    const docId = this.state.docId;
    let imgUrl = [];
    console.log(docId);
    if(this.state.file.length > 0) {
      for(let fileIdx = 0; fileIdx < this.state.file.length; fileIdx++) {
        const storageRef = storage.ref().child(this.state.file[fileIdx]); //画像保存パス
        await storageRef.getDownloadURL().then(function(url) {
          imgUrl.push(url);
          console.log(url)
        });
      }
    }
    db.collection("articles").doc(docId).set({
      title: this.state.title,
      text: this.state.text,
      detail: this.state.detail,
      category: this.state.category,
      tag: [],
      user: db.collection("users").doc(this.state.uid),
      userid: this.state.uid,
      imageUrl: imgUrl,
      like: [],
      star: 0,
      comments: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      alert("Error writing document: ", error);
    });

    //登録後、Topに移動
    this.props.history.push("/");
  }

  async componentDidMount() {
    // ユーザ認証情報の取得
    auth.onAuthStateChanged((user) => {
      if (user) {
        let u = {};
        u['profile'] = user.providerData;
        this.setState({uid: user.uid});
        console.log(u)
      }
    });
  }

  componentWillUnmount = () => {
  }

  async changeFile(e) {
    let nowfile = this.state.file;
    const path = 'userdata/' + this.state.uid + '/' + this.state.docId + '/' + (nowfile.length) + '.jpg';
    const storageRef = storage.ref().child(path); //画像保存パス
    await storageRef.put(e.target.files[0], {contentType: 'image/jpeg',}).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    nowfile.push(path);
    this.setState({ file: nowfile });
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
        <div className={"postDiv"}>
          <p>投稿</p>
          <form className={useStyles.root + " postForm"} onSubmit={this.handleOnSubmit} noValidate autoComplete="off">
            <Button className={"inputbox"} component="label">
              ファイル送信ボタンです
              <input
                type="file"
                className="inputFileBtnHide"
                onChange={this.changeFile}
              />
            </Button>
            <TextField id="input-title" className={"inputbox"} label="タイトル" onChange={this.changeTitle} />
            <TextField id="imput-text" className={"inputbox"} label="リード文" onChange={this.changeText} variant="outlined" />
            <InputLabel id="input-category" className={"inputbox"} style={{textAlign: "left"}}>カテゴリ</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className={"inputbox"}
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
            <TextField id="input-detail" className={"inputbox"} label="本文" onChange={this.changeDetail} variant="outlined" />
            <Button type="button" onClick={this.handleOnSubmit} className={"inputbox"}>投稿</Button>
          </form>
        </div>
        <BottomNavBar page="post" />
      </>
    );
  }
}

export default ImgMediaCard;