export interface Reservation {
  id: string
  start: string
  end: string
  room: Room
}

export interface Room {
  id: string
  name: string
  imageUrl: string
}
