import * as React from 'react';

import "./Studio.css";

import Canvas from "./../Canvas/Canvas";

import Painting from "../../types/Painting";

import SavedPainting, { Details } from "../../types/SavedPainting";

import { Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';

import { GoPin } from "react-icons/go"
import { GiSquare } from "react-icons/gi"

import AWS from 'aws-sdk';

import MondrianLeftPortrait from "../../assets/left-portrait.jpg"

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

// create S3 instance
const s3 = new AWS.S3({ region: 'eu-west-2' });



interface Props {
  setTab: (tab: number, refresh: boolean) => void
  setUserPainting: (userPainting: SavedPainting) => void
}

interface State {
  painting: Painting
  details: Details
};

export default class Studio extends React.Component<Props, State> {
  state: State = {
    painting: {
      canvas: {
        shape: "square"
      },
      rootSection: {
        color: "white",
        isSplit: false,
        id: new Date().getTime().toString()
      },
    },
    details: {
      artist: "",
      title: "",
      year: new Date().getFullYear(),
      date: new Date().getTime()
    }
  };

  uploadFile = (paintingToSave: SavedPainting) => {
    const params = {
      ACL: 'public-read',
      Body: JSON.stringify(paintingToSave),
      Bucket: process.env.REACT_APP_S3_BUCKET as string,
      ContentType: "application/json",
      Key: paintingToSave.details.artist + paintingToSave.details.date + ".json"
    };
    return s3.putObject(params, (err: any, data: any) => {
      this.clear()
      console.log(JSON.stringify(err) + " " + JSON.stringify(data));
    })
  };

  updatePainting = (painting: Painting) => {
    this.setState({ painting })
  }

  save = () => {
    const paintingToSave = this.state;
    if (paintingToSave.details.artist === "") {
      paintingToSave.details.artist = "Anonymous"
    }
    if (paintingToSave.details.title === "") {
      paintingToSave.details.title = "Untitled"
    }
    this.uploadFile(paintingToSave)
    this.props.setUserPainting(paintingToSave)
    this.props.setTab(2, false)

  }

  clear = () => {
    this.setState({
      painting: {
        canvas: {
          shape: this.state.painting.canvas.shape
        },
        rootSection: {
          color: "white",
          isSplit: false,
          id: new Date().getTime().toString()
        },
      },
      details: {
        artist: this.state.details.artist,
        title: "",
        year: new Date().getFullYear(),
        date: new Date().getTime()
      }
    })
  }

  render() {



    return (
      <div>
        <div className="studio__clear" onClick={() => this.clear()} >New Canvas</div>
        <div className="studio__title">Studio</div>
        <div onClick={() => this.props.setTab(2, false)} className="studio__leave">
          ->
        </div>
        <div onClick={() => this.props.setTab(2, false)} className="studio__leave--sideways">
          Go to gallery
       </div>
        <div className="studio__peeking-mondrian-container">
          <img className="studio__peeking-mondrian" src={MondrianLeftPortrait} />
        </div>
        <div className="studio__canvas-options">
          <div>
            Canvas
        </div>
          <ButtonGroup vertical>
            <Button className={"studio__canvas-button studio__square-button " + (this.state.painting.canvas.shape === "square" ? "studio__canvas-button--active" : "")}
              onClick={() => {
                this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "square" } } })
              }}
            />
            <Button className={"studio__canvas-button studio__landscape-button " + (this.state.painting.canvas.shape === "landscape" ? "studio__canvas-button--active" : "")}
              onClick={() => {
                this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "landscape" } } })
              }}
            />

            <Button className={"studio__canvas-button studio__portrait-button " + (this.state.painting.canvas.shape === "portrait" ? "studio__canvas-button--active" : "")}
              onClick={() => {
                this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "portrait" } } })
              }}
            />
          </ButtonGroup>

        </div>
        <div className="studio-container">
          <div className="studio">
            <Canvas painting={this.state.painting} paint={this.updatePainting.bind(this)} />
            <div className="studio__label">
              <Form>
                <FormGroup>
                <div className={"name__hint"}>Label your painting:</div>
                  <Input autocomplete="off" className="studio__input studio__input--artist" type="text" name="artist" placeholder="Anonymous" value={this.state.details.artist}
                    onChange={(e) => this.setState({ details: { ...this.state.details, artist: e.target.value } })} />
                  <Input autocomplete="off" className="studio__input studio__input--title" type="text" name="painting-title" placeholder="Untitled" value={this.state.details.title}
                    onChange={(e) => this.setState({ details: { ...this.state.details, title: e.target.value } })} />
                  <div className={"name__hint"}>(mondrian puns actively encouraged)</div>
                </FormGroup>
              </Form>
            </div>
            <div className="studio__save" onClick={() => this.save()} >
              <GoPin className={"icon"} /> Hang in the gallery
      </div>
            <div className="studio__canvas-options--mobile">
              <div>
                Canvas
        </div>
              <ButtonGroup >
                <Button className={"studio__canvas-button--mobile studio__square-button " + (this.state.painting.canvas.shape === "square" ? "studio__canvas-button--active" : "")}
                  onClick={() => {
                    this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "square" } } })
                  }}
                />
                <Button className={"studio__canvas-button--mobile studio__landscape-button " + (this.state.painting.canvas.shape === "landscape" ? "studio__canvas-button--active" : "")}
                  onClick={() => {
                    this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "landscape" } } })
                  }}
                />

                <Button className={"studio__canvas-button--mobile studio__portrait-button " + (this.state.painting.canvas.shape === "portrait" ? "studio__canvas-button--active" : "")}
                  onClick={() => {
                    this.setState({ painting: { ...this.state.painting, canvas: { ...this.state.painting.canvas, shape: "portrait" } } })
                  }}
                />
              </ButtonGroup>

            </div>
          </div>
        </div>



      </div>
    );
  }
}