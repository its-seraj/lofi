import Lottie from "lottie-react";
import visualBar from "../assets/visualBar.json";

const Layer = () => {
  return (
    <div className="layer-root">
      <Lottie className="visual-bar" animationData={visualBar} />
    </div>
  );
};

export { Layer };
