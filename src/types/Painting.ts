interface Canvas {
  shape: "square" | "portrait" | "landscape"
}

export interface Split {
  direction: "vertical" | "horizontal",
  position: number,
  sectionA: Split | Block,
  sectionB: Split | Block,
  isSplit: true,
  id: string
}

export interface Block {
  color: "white" | "red" | "yellow" | "blue" | "black",
  id: string,
  isSplit: false
}

export default interface Painting {
  canvas: Canvas,
  rootSection: Split | Block,
}
