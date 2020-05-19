import * as React from 'react';

import SavedPainting, { Details } from "../../types/SavedPainting";

import Canvas from "./../Canvas/Canvas";


interface Props {
  rooms: Room[],
  userPaintings: SavedPainting[]
}

interface Room {
  paintings: SavedPainting[]
}

interface State {

};


export default class Wall extends React.Component<Props, State> {
  state: State = {

  };

  render() {




    return (

      <div id="gallery__wall" className="gallery__wall" >
      {this.props.userPaintings.map(painting =>
          <div className="gallery__hanging">
                <Canvas gallery={true} painting={painting.painting} />
                <div className="hanging__label">
                  <div className="handing__artist">{painting.details.artist}</div>
                  <div className="handing__title">{painting.details.title}</div>
                  <div className="handing__year">{painting.details.year}</div>
                </div>
              </div>
      )}
        {this.props.rooms.map(room =>
          room.paintings.map(painting =>
            painting !== null ?
              <div className="gallery__hanging">
                <Canvas gallery={true} painting={painting.painting} />
                <div className="hanging__label">
                  <div className="handing__artist">{painting.details.artist}</div>
                  <div className="handing__title">{painting.details.title}</div>
                  <div className="handing__year">{painting.details.year}</div>
                </div>
              </div>
              : null
          )
        )}
        <div className="gallery__continue--wall">
        {"Exhibition continues this way ->"}
      </div>
      </div>
    );
  }
}