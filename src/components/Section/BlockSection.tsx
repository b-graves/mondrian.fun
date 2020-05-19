import * as React from 'react';

import { Split, Block } from "../../types/Painting"

import { FaPaintBrush } from 'react-icons/fa';

import { RiLayoutColumnLine, RiLayoutRowLine } from 'react-icons/ri';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';


interface Props {
  block: Block
  updateSection?: (section: Split | Block) => void;
}

interface State {
  popoverOpen: boolean
};

export default class BlockSection extends React.Component<Props, State> {
  state: State = {
    popoverOpen: false
  };

  togglePopover = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  setPopoverOpen = (popoverOpen: boolean) => {
    this.setState({ popoverOpen })
  }

  nextColor: () => any = () => {
    const colors = ["white", "yellow", "red", "blue", "black"];
    const colorIdx = colors.indexOf(this.props.block.color);
    return colors[(colorIdx + 1) % colors.length]
  }


  render() {
    const { block, updateSection } = this.props;

    let controls = null;

    if (updateSection) {
      controls = <div className="painting__controls">
        <RiLayoutColumnLine
          className={"painting__control painting__control--split painting__control--" + block.color}
          onClick={() => {
            updateSection({
              direction: "vertical",
              position: 50,
              id: new Date().getTime() + "SPLIT",
              sectionA: {
                color: block.color,
                isSplit: false,
                id: new Date().getTime() + "A"
              },
              sectionB: {
                color: block.color,
                isSplit: false,
                id: new Date().getTime() + "B"
              },
              isSplit: true
            })
          }} />
        <RiLayoutRowLine
          className={"painting__control painting__control--split painting__control--" + block.color}
          onClick={() => {
            updateSection({
              direction: "horizontal",
              position: 50,
              id: new Date().getTime() + "SPLIT",
              sectionA: {
                color: block.color,
                isSplit: false,
                id: new Date().getTime() + "A"
              },
              sectionB: {
                color: block.color,
                isSplit: false,
                id: new Date().getTime() + "B"
              },
              isSplit: true
            })
          }} />
        <FaPaintBrush
          className={"painting__control painting__control--paint painting__control--" + block.color}
          onClick={() => {
            const paintedBlock = { ...block, color: this.nextColor() }
            updateSection(paintedBlock)
          }} />
      </div>
    }

    return (
      <div
        className={"painting__block painting__block--" + block.color}
        onClick={() => {
          this.setPopoverOpen(true);
        }}
        onMouseOver={() => {
          this.setPopoverOpen(true);
        }}
        onMouseLeave={() => {
          this.setPopoverOpen(false);
        }}
      >
        <div className="block__centre" id={"target--" + block.id} />
        {updateSection ?
        <Popover className={"popover--" + block.color} placement="bottom" isOpen={this.state.popoverOpen} target={"target--" + block.id} toggle={this.togglePopover}>
          <PopoverBody className={"popover--" + block.color}>{controls}</PopoverBody>
        </Popover>
        : null }
      </div>


    );
  }
}