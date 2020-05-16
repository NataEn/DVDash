import React, { Component, useState, useEffect } from "react";

export default function Map() {
  const { mapType, setMapType } = useState();
  //useEffect on recieving data from picking a different location
  return (
    <div>
      <img mapType={`${mapType}.jpg`}></img>
    </div>
  );
}
