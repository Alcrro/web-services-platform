import { useEffect, useState } from "react";

const useCarouselVisibleCard = () => {
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setVisibleCards(5);
      else if (w >= 1024) setVisibleCards(4);
      else if (w >= 768) setVisibleCards(3);
      else if (w >= 640) setVisibleCards(2);
      else setVisibleCards(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [visibleCards, setVisibleCards]);

  return visibleCards;
};

export default useCarouselVisibleCard;
