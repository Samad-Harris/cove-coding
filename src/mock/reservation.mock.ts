import type { Reservation } from "../@types/reservation.type";

export const reservationMock: Reservation[] = [
  {
    id: "d4297a67-cfde-4841-81a8-aa90f719255b",
    start: "2023-02-03T15:30:00.000Z",
    end: "2023-02-03T15:45:00.000Z",
    room: {
      id: "401662b9-b110-4159-a4f2-ebd955f3b1f4",
      name: "Room A",
      imageUrl:
        "https://api.stg.cove.is/parse/files/hRKEvW2lN74k5nCg6p2XtmiWRNHycE2pHpXpELMX/f96efd3f11aadb34135bb1f0aecf9667_Quincy%20Room.jpg",
    },
  },
  {
    id: "306df302-d117-4257-80df-856bba2cd644",
    start: "2022-06-22T15:15:00.000Z",
    end: "2022-06-22T16:30:00.000Z",
    room: {
      id: "70866847-3a55-407e-9973-841ac4c16a29",
      name: "Room B",
      imageUrl:
        "https://api.stg.cove.is/parse/files/hRKEvW2lN74k5nCg6p2XtmiWRNHycE2pHpXpELMX/d0d19da4aa88734291279f5fe7a836e7_Wakefield%20Room.jpg",
    },
  },
];
