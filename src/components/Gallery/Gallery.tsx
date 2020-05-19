import * as React from 'react';

import "./Gallery.css";

import SavedPainting, { Details } from "../../types/SavedPainting";

import { Button, Form, FormGroup, Label, Input, FormText, ButtonGroup } from 'reactstrap';


import Wall from "./Wall"


interface Props {
  setTab: (tab: number, refresh: boolean) => void
  rooms: Room[],
  userPaintings: SavedPainting[]
}

interface Room {
  paintings: SavedPainting[],
}

interface State {
  scrollRight: boolean
  scrollLeft: boolean
  scrollInterval: any
};

export default class Gallery extends React.Component<Props, State> {
  state: State = {
    scrollRight: false,
    scrollLeft: false,
    scrollInterval: null
  };

  isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  
  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    console.log("scrolling")
    if (this.isBottom(wrappedElement)) {
      console.log('header bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };

  // scrollRight = () => {
  //   const elements = document.getElementsByClassName("awssld__content");
  //   const element = elements[1] as HTMLElement;
  //   if (element) {
  //     element.scrollLeft = element.scrollLeft + 3
  //   }
  // }

  // handleKeyPress = (event: any) => {
  //   console.log(event)
  //   if(event.key === 'Enter'){
  //     console.log('enter press here! ')
  //   }
  // }

  // reachedEnd = () => {
  //   const elements = document.getElementsByClassName("awssld__content");
  //   const element = elements[1] as HTMLElement;
   
  //   if (element) {
  //     console.log(element)
  //     console.log(element.scrollLeft)
  //     console.log(element.scrollWidth)
  //     return element.scrollLeft + element.clientWidth === element.scrollWidth
  //   } else {
  //     return false
  //   }
  // }

  // scrollLeft = () => {
  //   const elements = document.getElementsByClassName("awssld__content");
  //   const element = elements[1] as HTMLElement;
  //   if (element) {
  //     element.scrollLeft = element.scrollLeft - 3
  //   }
  // }

  // getScroll = () => {
  //   const elements = document.getElementsByClassName("awssld__content");
  //   const element = elements[1] as HTMLElement;
  //   if (element) {
  //     return element.scrollLeft
  //   } else {
  //     return 0
  //   }
  // }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (this.state.scrollRight && !prevState.scrollRight) {
  //     let scrollInterval = window.setInterval(this.scrollRight, 1)
  //     this.setState({ scrollInterval })
  //   } else if (!this.state.scrollRight && prevState.scrollRight) {
  //     clearInterval(this.state.scrollInterval)
  //   }

  //   if (this.state.scrollLeft && !prevState.scrollLeft) {
  //     let scrollInterval = window.setInterval(this.scrollLeft, 1)
  //     this.setState({ scrollInterval })
  //   } else if (!this.state.scrollLeft && prevState.scrollLeft) {
  //     clearInterval(this.state.scrollInterval)
  //   }
  // }

  // componentDidMount() {
  //   const element = document.getElementById("gallery");
  //   // const element = elements[1] as HTMLElement;
  //   if (element) {
  //     console.log("FOCUS")
  //     return element.focus()
  //   } else {
  //     return 0
  //   }
  // }


  render() {
    return (
      <div className="gallery_container-1">
        <div id="gallery">
          <div className="gallery__title">Gallery</div>
          <Wall userPaintings={this.props.userPaintings} rooms={this.props.rooms} />
        </div>
        
        <div onClick={() => this.props.setTab(0, false)} className="gallery__leave">
          {"<- Go to studio"}
        </div>

      </div>
    );
  }
}