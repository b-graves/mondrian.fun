import Painting from "./Painting";

export interface Details {
  title: string,
  artist: string,
  year: number,
  date: number
}

export default interface SavedPainting {
  painting: Painting,
  details: Details
}
