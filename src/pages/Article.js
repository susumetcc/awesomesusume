import React from 'react';
import MediaQuery from 'react-responsive';
import { db, storage } from '../firebase';
import NoImg from '../img/noimg.jpg';

export default class Article extends React.Component {
    constructor(props) {
      super(props);
      this.state = {data: {}, author: {}};
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    _isMounted = false;
  
    // Firestoreからデータ一覧を取得する
    async componentDidMount() {
      this._isMounted = true;
      // 記事の取得
      await db.collection("articles").doc(this.props.match.params.docid).get().then((doc) => {
        if (doc.exists) {
          this.setState({ data: doc.data() });
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }

    componentWillUnmount = () => {
      this._isMounted = false;
    }
  
    render() {
      let data = this.state.data;
      console.log(data);
      return (
        <>
          <MediaQuery query="(max-width: 767px)">
            <h2>小さい</h2>
          </MediaQuery>
          <MediaQuery query="(min-width: 768px)">
            <h2>大きい</h2>
          </MediaQuery>
        </>
      )
    }
  }