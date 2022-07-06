import React from "react";

import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Stockholm Palace",
    description:
      "Palace hosting the emperors and empresses of the Swedish Empire.",
    imageUrl:
      "https://media.istockphoto.com/photos/royal-palace-in-stockholm-hdr-picture-id641802618?k=20&m=641802618&s=612x612&w=0&h=axGbCNMymi9xavDpcmlXyPk8inWULfoWf3NIeF7PEkU=",
    address: "Kungliga slottet, 107 70 Stockholm, Sweden",
    location: {
      lat: 59.3268,
      lng: 18.0717,
    },
    creator: "u1",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
