import React from 'react';
import MediaQuery from 'react-responsive';
import { db, storage } from '../firebase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BottomNavBar from '../components/BottomNav';
import NoImg from '../img/noimg.jpg';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  _isMounted = false;

  // Firestoreからデータ一覧を取得する
  async componentDidMount() {
    this._isMounted = true;
    // 記事の取得
    await db.collection("articles").doc(this.props.match.params.docid).get().then(async (doc) => {
      if (doc.exists) {
        let article = doc.data();
        await doc.data().user.get().then((doc2) => {
          article.name = doc2.data().name;
          article.avater = doc2.data().avaterUrl;
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
        this.setState({ data: article });
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
        <div style={{padding: "20px"}}>
          <MediaQuery query="(max-width: 767px)">
            <h2>小さい</h2>
          </MediaQuery>
          <MediaQuery query="(min-width: 768px)">
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={data.avater}>
                  </Avatar>
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
                    style={{height: "360px"}}
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
            </Card>
          </MediaQuery>
        </div>
        <BottomNavBar page="" />
      </>
    )
  }
}