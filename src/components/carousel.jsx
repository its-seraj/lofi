import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useEffect, useState } from "react";
import { Spinner } from "../assets/Spinner";

const Carousel = () => {
  const [imgArr, setImgArr] = useState(["https://images.hdqwalls.com/download/makoto-shinkai-anime-cityscape-5k-z8-2560x1440.jpg"]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let url = `${window._env_.CODE_SNIPPETS_BACKEND}/lofi/image`;
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === true) {
          setImgArr(data.data);
        }
      })
      .catch((error) => {
        console.error("Error occured while fetching images", error);
      });

    const lastImage = document.querySelector(".carousel-item:last-child img");

    const checkImageLoaded = setInterval(() => {
      if (lastImage?.complete) {
        clearInterval(checkImageLoaded);
        setImagesLoaded(true);
      }
    }, 1000);
  }, []);

  return (
    <>
      {!imagesLoaded && (
        <>
          <Spinner />
        </>
      )}
      {imgArr && (
        <CCarousel transition="crossfade" interval={5000} pause={false} style={{ display: imagesLoaded ? "block" : "none" }}>
          {imgArr.map((curr, index) => (
            <CCarouselItem key={index}>
              <CImage className="d-block w-100" src={curr} alt="slide" />
            </CCarouselItem>
          ))}
        </CCarousel>
      )}
    </>
  );
};

export { Carousel };
