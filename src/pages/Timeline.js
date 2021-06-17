import React from 'react';
import MediaQuery from 'react-responsive';
import { db, storage } from '../firebase';
import NoImg from '../img/noimg.jpg';

import BottomNavBar from '../components/BottomNav';
import BodyCard from '../components/BodyCard'

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

class ItemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: cardContents, tab: props.tab};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  _isMounted = false; //unmountを判断（ローディング判定用）

  // Firestoreからデータ一覧を取得する
  async componentDidMount() {
    let articlesDb = db.collection("articles");
    articlesDb = articlesDb.where("userid", "==", this.props.match.params.userid);
    const articlesSnapshot = await articlesDb.orderBy('createdAt', 'desc').get()
    let usershot = [];
    await db.collection("users").get().then((snapshot) => {
      usershot = snapshot;
    })
    const items = [];
    articlesSnapshot.forEach(doc => {
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
          <BodyCard list={list} column={2} />
        </MediaQuery>
        <MediaQuery query="(min-width: 768px)">
          <MediaQuery query="(max-width: 1023px)">
            <BodyCard list={list} column={3} />
          </MediaQuery>
          <MediaQuery query="(min-width: 1024px)">
            <BodyCard list={list} column={4} />
          </MediaQuery>
        </MediaQuery>
        <BottomNavBar page="" />
      </>
    )
  }
}

export default ItemPanel