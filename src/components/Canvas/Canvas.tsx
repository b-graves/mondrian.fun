import * as React from 'react';

import "./Canvas.css"

import Painting, { Split, Block } from "../../types/Painting"

import Section from "../Section/Section"

interface Props {
  painting: Painting;
  gallery?: boolean;
  paint?: (painting: Painting) => void;
}

interface State {
};

export default class Canvas extends React.Component<Props, State> {
  state: State = {

  };

  render() {
    const { painting, paint, gallery } = this.props;
    return (
      <div className={gallery ? "canvas__container canvas__container--gallery" : "canvas__container"}>
        <div className={gallery ? "canvas canvas--gallery canvas--" + painting.canvas.shape : "canvas canvas--" + painting.canvas.shape}>
          {paint ? 
          <Section section={painting.rootSection} updateSection={(rootSection: Split | Block) => paint({ ...painting, rootSection })} />
          :
          <Section section={painting.rootSection} />
          }
        </div>
      </div>
    );
  }
}