import React from 'react';
import MediaQuery from 'react-responsive';
import { db, storage } from '../firebase';
import NoImg from '../img/noimg.jpg';

import BodyCard from './BodyCard'

// 初期表示用アイテム
const cardContents = [
  {
    docId: "test0",
    title: "タイトル1",
    text: "サブヘッダー1",
    name: "サブヘッダー1",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test1",
    title: "タイトル2",
    name: "サブヘッダー2",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test2",
    title: "タイトル3",
    name: "サブヘッダー3",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
  {
    docId: "test3",
    title: "タイトル4",
    name: "サブヘッダー4",
    avatarUrl: NoImg,
    imageUrl: [NoImg]
  },
]

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: cardContents};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // Firestoreからデータ一覧を取得する
  async componentDidMount() {
    const querySnapshot = await db.collection("articles").orderBy('createdAt', 'desc').get()
    const items = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      if(data.imageUrl.length === 0) {
        data.imageUrl[0] = NoImg;
      }
      items.push(data);
    });

    this.setState({ list: items });
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
      </>
    )
  }
}

export default Content