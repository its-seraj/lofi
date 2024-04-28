import { useState, useEffect, useRef } from "react";

const getRandomIndex = (range, dp) => {
  const rand = Math.floor(Math.random() * range);
  if (dp[rand]) {
    return getRandomIndex(range, dp);
  }
  dp[rand] = 1;
  return rand;
};
const Player = ({ playlistId }) => {
  const dp = [];
  const [musics, setMusics] = useState([
    "/assets/BLACKPINK - 'Kill This Love' MV.mp3",
    "/assets/BLACKPINK - 뚜두뚜두 (DDU-DU DDU-DU) MV.mp3",
    "/assets/BLACKPINK - 'Lovesick Girls' MV.mp3",
    "/assets/BLACKPINK - 'Ice Cream (with Selena Gomez)' MV.mp3",
  ]);
  const playerRef = useRef(null);

  const playNextSong = () => {
    if (dp.length === dp.reduce((a, b) => a + b, 0)) {
      dp.length = 0;
    }
    const randomIndex = getRandomIndex(musics?.length ?? 0, dp);
    playerRef.current.src = musics[randomIndex];
    playerRef.current.play();
  };

  const handleListener = (event) => {
    if (playerRef.current.paused) {
      const randomIndex = getRandomIndex(musics?.length ?? 0, dp);
      playerRef.current.src = musics[randomIndex];

      playerRef.current.volume = 0.02;
      return playerRef.current.play();
    }

    if (event.shiftKey && event.key === "N") {
      playNextSong();
    } else if (event.shiftKey && event.key === "P") {
      if (dp.length === dp.reduce((a, b) => a + b, 0)) {
        dp.length = 0;
      }
      const randomIndex = getRandomIndex(musics?.length ?? 0, dp);
      playerRef.current.src = musics[randomIndex];
      playerRef.current.play();
    }
    if (event.key === "ArrowUp") {
      const vol = playerRef.current.volume;
      if (vol >= 1) return;
      console.log("vol", vol + 0.01);
      playerRef.current.volume = Math.max(0, vol + 0.01);
    } else if (event.key === "ArrowDown") {
      const vol = playerRef.current.volume;
      if (vol <= 0) return;
      console.log("vol", vol - 0.01);
      playerRef.current.volume = Math.max(0, vol - 0.01);
    } else if (event.key === "ArrowLeft") {
      playerRef.current.currentTime -= 30;
    } else if (event.key === "ArrowRight") {
      playerRef.current.currentTime += 30;
    }
  };
  useEffect(() => {
    playerRef.current.addEventListener("ended", playNextSong);

    document.addEventListener("click", handleListener);
    document.addEventListener("keydown", handleListener);

    return () => {
      document.addEventListener("click", handleListener);
      document.addEventListener("keydown", handleListener);
    };
  }, [playerRef]);

  return (
    <div>
      <audio ref={playerRef} autoPlay>
        <source src="/assets/BLACKPINK - 'Kill This Love' MV.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
