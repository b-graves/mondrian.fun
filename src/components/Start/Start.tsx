import * as React from 'react';

import "./Start.css";

import SavedPainting, { Details } from "../../types/SavedPainting";

import { Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';

import MondrianPortrait from "../../assets/mondrian-portrait.jpg"

import CompositionII from "../../assets/compositionii.jpeg"

interface Props {
  setTab: (tab: number, refresh: boolean) => void
}

interface State {

};

export default class Gallery extends React.Component<Props, State> {
  state: State = {

  };


  render() {
    return (
      <div>
        <img src={MondrianPortrait} className="start__portrait" />
        <img src={CompositionII} className="start__painting" />
        <div className="start__title">mondrian.fun</div>
        <div className="start__description">
          This site is a celebration of the artistic style of Piet Mondrian, a 20th century Dutch artist best known for his abstract works using vertical and horizontal lines and the primary colors. Here you can create your own masterpiece in the style of Mondrian and hang it in the virtual gallery alongside other people's work. Head to the studio to get started or visit the gallery for some inspiration... 
        </div>
        <div onClick={() => this.props.setTab(0, false)} className="gallery__leave">
          {"<- Go to studio"}
        </div>
        <div onClick={() => this.props.setTab(2, false)} className="studio__leave">
          Go to gallery ->
        </div>
      </div>
    );
  }
}