import React from 'react';
import MediaQuery from 'react-responsive';
import { auth, db, storage } from '../firebase';
import NoImg from '../img/noimg.jpg';

import FollowBodyCard from './FollowBodyCard'

// 初期表示用アイテム
const cardContents = [
  {
    docId: "test0",
    title: "",
    text: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test1",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test2",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test3",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test4",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test5",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test6",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test7",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test8",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test9",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test10",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test11",
    title: "",
    name: "",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
]

class FollowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: cardContents, tab: props.tab, uid: ""};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  _isMounted = false; //unmountを判断（ローディング判定用）

  // Firestoreからデータ一覧を取得する
  async componentDidMount() {
    // ユーザ認証情報の取得
    let uid = "";
    await auth.onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        this.setState({uid: user.uid});
      }
    });

    let follow = [""];
    if(uid !== "") {
      await db.collection("users").doc(uid).get().then((doc) => {
        follow = doc.data().follow;
      })
      console.log(follow)
    }

    const items = [];
    let usershot = [];
    await db.collection("users").get().then((snapshot) => {
      usershot = snapshot;
    })
    let articlesDb = db.collection("articles");
    articlesDb = articlesDb.where("userid", "in", follow);
    await articlesDb.orderBy('createdAt', 'desc').get().then(async(querySnapshot) => {
      await querySnapshot.forEach((doc) => {
        console.log(doc.data())
        let data = doc.data();
        data.docId = doc.id;
        if(data.imageUrl.length === 0) {
          data.imageUrl[0] = NoImg;
        }
        usershot.forEach(userdoc => {
          if(userdoc.id === data.userid) {
            data.avatarUrl = userdoc.data().avatarUrl;
            data.username = userdoc.data().name;
          }
        });
        items.push(data);
      });
    })

    this._isMounted = true;
    this.setState({ list: items });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  render() {
    let list = this.state.list;
    console.log(list);
    return (
      <>
        <MediaQuery query="(max-width: 767px)">
          <FollowBodyCard list={list} column={2} />
        </MediaQuery>
        <MediaQuery query="(min-width: 768px)">
          <MediaQuery query="(max-width: 1023px)">
            <FollowBodyCard list={list} column={3} />
          </MediaQuery>
          <MediaQuery query="(min-width: 1024px)">
            <FollowBodyCard list={list} column={4} />
          </MediaQuery>
        </MediaQuery>
      </>
    )
  }
}

export default FollowPanel;