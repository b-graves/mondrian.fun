import * as React from 'react';

import { Split, Block } from "../../types/Painting"

import Section from "./Section";

import SplitPane from 'react-split-pane';


interface Props {
  split: Split,
  updateSection?: (section: Split | Block) => void;
}

interface State {
  lock: boolean,
  lockPosition: number
};

export default class SplitSection extends React.Component<Props, State> {
  state: State = {
    lock: false,
    lockPosition: 0
  };



  componentDidUpdate() {
    const elements = document.getElementsByClassName(this.props.split.id)

    if (this.state.lock) {
      if (elements.length > 0) {
        const element = elements[0] as HTMLElement
        const width = element.clientWidth;
        const height = element.clientHeight;

        if (this.state.lock) {
          if (this.props.split.direction === "vertical") {
            const pos = (this.props.split.position / 100) * width
            if (Math.abs(pos - this.state.lockPosition) > 1) {
              this.setState({ lockPosition: (this.props.split.position / 100) * width })
            }
          } else {
            const pos = (this.props.split.position / 100) * height
            if (Math.abs(pos - this.state.lockPosition) > 1) {
              this.setState({ lockPosition: (this.props.split.position / 100) * height })
            }
          }
        }
      }
    }
  }

  updateSplitPosition(pixelPosition: number, final: boolean) {
    const elements = document.getElementsByClassName(this.props.split.id);
    const element = elements[0] as HTMLElement;
    const width = element.clientWidth;
    const height = element.clientHeight;

    if (typeof pixelPosition === "number") {

      if (this.props.split.direction === "vertical") {
        if (this.props.updateSection) {
          const pos = (pixelPosition / width) * 100
          if (Math.abs(pos - this.props.split.position) > 1 || final) {
            this.props.updateSection({ ...this.props.split, position: pos })
          }
        }
      } else {
        if (this.props.updateSection) {
          const pos = (pixelPosition / height) * 100
          if (Math.abs(pos - this.props.split.position) > 1 || final) {
            this.props.updateSection({ ...this.props.split, position: pos })

          }
        }
      }
    }
    if (final) {
      this.setState({ lock: true })
    }

  }

  render() {
    const { split, updateSection } = this.props;
    return (
      updateSection ?
        <SplitPane
          className={split.id}
          split={split.direction}
          size={this.state.lock ? this.state.lockPosition : split.position + "%"}
          allowResize={updateSection !== undefined}
          minSize={0}
          maxSize={"80vw"}
          onChange={(pixelPosition) => this.updateSplitPosition(pixelPosition, false)}
          onDragFinished={(pixelPosition) => this.updateSplitPosition(pixelPosition, true)}
          onDragStarted={() => this.setState({ lock: false })}
        >
          <Section section={split.sectionA} updateSection={(sectionA: Split | Block) => {
            updateSection({ ...split, sectionA })
          }} />
          <Section section={split.sectionB} updateSection={(sectionB: Split | Block) => {
            updateSection({ ...split, sectionB })
          }} />
        </SplitPane>
        :
        <SplitPane allowResize={false} split={split.direction} size={split.position + "%"} minSize={0} maxSize={"80vw"} >
          <Section section={split.sectionA} />
          <Section section={split.sectionB} />
        </SplitPane>
    );
  }
}