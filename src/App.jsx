import { useEffect } from "react";
import { Carousel } from "./components/carousel";
import Player from "./components/player";
import { Layer } from "./components/layer";

function App() {
  return (
    <>
      <Layer />
      <Carousel />
      <Player playlistId="PLLAMwRZRuf96wOzSSR6enHNPJW0-IdJ-K" />
    </>
  );
}

export default App;
