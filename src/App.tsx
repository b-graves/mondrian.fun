import React from 'react';
import logo from './logo.svg';
import './App.css'

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import SavedPainting from "./types/SavedPainting"

import Studio from "./components/Studio/Studio";
import Gallery from "./components/Gallery/Gallery";
import Start from "./components/Start/Start";

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

// create S3 instance
const s3 = new AWS.S3({ region: 'eu-west-2' });

interface Props { }

interface State {
  currentTab: number,
  gallery: Room[],
  paintingFiles: AWS.S3.ObjectList,
  userPaintings: SavedPainting[]
};

interface Room {
  paintings: SavedPainting[]
}

export default class App extends React.Component<Props, State> {

  state: State = {
    currentTab: 1,
    gallery: [],
    paintingFiles: [],
    userPaintings: []
  }

  setTab = (tab: number, refresh: boolean) => {
    if (refresh) {
      this.getFileNames();
    }
    this.setState({ currentTab: tab })
  }

  addUserPainting(userPainting: SavedPainting) {
    let userPaintings = this.state.userPaintings;
    userPaintings = [userPainting].concat(userPaintings)
    this.setState({ userPaintings })
  }

  downloadFile = (fileName: string, room: number, index: number) => {
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET as string,
      Key: fileName
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      if (data.Body !== undefined) {
        let objectData = JSON.parse(data.Body.toString()) as SavedPainting
        let gallery = this.state.gallery;
        gallery[room].paintings[index] = objectData
        this.setState({ gallery })

      }
    });
  };

  getPaintings(room: number) {
    let gallery = this.state.gallery;
    gallery.push({
      paintings: new Array(1000).fill(null)
    })
    this.setState({ gallery })
    let paintingsToGet = this.state.paintingFiles.slice(room * 1000, (room + 1) * 1000)
    paintingsToGet.sort((a: AWS.S3.Object, b: AWS.S3.Object) => {
      if (a.LastModified !== undefined && b.LastModified !== undefined) {
        return b.LastModified.getTime() - a.LastModified.getTime()
      } else {
        return 0
      }
    })
    // paintingsToGet = paintingsToGet.filter((painting: AWS.S3.Object) => this.state.userPainting === null || painting.Key !== this.state.userPainting.details.artist + this.state.userPainting.details.date + ".json")
    paintingsToGet.forEach((painting: AWS.S3.Object, index: number) => {
      if (painting.Key !== undefined) {
        this.downloadFile(painting.Key, room, index);
      }
    })
  }

  getFileNames = () => {
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET as string,
      Delimiter: '/'
    };

    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      if (data.Contents !== undefined) {
        this.setState({ paintingFiles: data.Contents })
      }
      this.getPaintings(0)
    });
  };

  componentDidMount = () => {
    this.getFileNames();
  }

  render = () => {
    return (
      <div className="App">
        <AwesomeSlider mobileTouch={false} buttons={false} selected={this.state.currentTab} infinite={false} fillParent >
          <div>
            <Studio setTab={(tab: number, refresh: boolean) => this.setTab(tab, refresh)} setUserPainting={(userPainting: SavedPainting) => this.addUserPainting(userPainting)} />
          </div>
          <div>
            <Start setTab={(tab: number, refresh: boolean) => this.setTab(tab, refresh)} />
          </div>
          <div className="gallery-page">
            <Gallery userPaintings={this.state.userPaintings} rooms={this.state.gallery} setTab={(tab: number, refresh: boolean) => this.setTab(tab, refresh)} />
          </div>
        </AwesomeSlider>
      </div >
    );
  }
}

