import * as React from 'react';

import { Split, Block } from "../../types/Painting"

import SplitSection from "./SplitSection";
import BlockSection from "./BlockSection";

import "./Section.css"


interface Props {
  section: Split | Block;
  updateSection?: (section: Split | Block) => void;
}

interface State {
};

export default class Section extends React.Component<Props, State> {
  state: State = {

  };

  render() {
    const { section, updateSection } = this.props;
    return (
      section.isSplit ?
        updateSection ?
          <SplitSection split={section} updateSection={updateSection} />
          :
          <SplitSection split={section} />
        :
        updateSection
          ?
          <BlockSection block={section} updateSection={updateSection} />
          :
          <BlockSection block={section} />
    );
  }
}