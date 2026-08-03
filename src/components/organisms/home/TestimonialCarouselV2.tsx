"use client";
import { ReactNode, useRef, useState } from "react";
import styles from "@/components/styles/testimonialCarouselV2.module.scss";
import NavigationButton from "@/components/atoms/buttons/NavigationButton";
import { FaArrowAltCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useCarousel from "@/shared/hooks/useCarousel";


const TestimonialCarouselV2 = ({ children }: { children: ReactNode[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);

  const { handleNext, handlePrev } = useCarousel({
    trackRef,
    setCardWidth,
    cardWidth,
    setCanPrev,
    setCanNext,
    styles,
  });

  return (
    <div className={styles.wrapper}>
      <NavigationButton
        className={`${
          styles.left
        } absolute top-1/2 -translate-y-1/2 rounded-full ${
          !canPrev
            ? "text-gray-400/50 cursor-auto"
            : "text-gray-400 hover:text-(--color-text) cursor-pointer"
        }`}
        isDisabled={!canPrev}
        handleMove={handlePrev}
        aria-label="Previous testimonial"
      >
        <FaArrowAltCircleLeft className="text-2xl" aria-hidden="true" />
      </NavigationButton>
      <div className={styles.track} ref={trackRef}>
        {children.map((child, index) => (
          <div key={index} className={styles.card}>
            {child}
          </div>
        ))}
        <NavigationButton
          className={`${
            styles.right
          } absolute right-0 top-1/2 -translate-y-1/2 rounded-full ${
            !canNext
              ? "text-gray-400/50 cursor-auto"
              : "text-gray-400 hover:text-(--color-text) cursor-pointer"
          }`}
          isDisabled={!canNext}
          handleMove={handleNext}
          aria-label="Next testimonial"
        >
          <FaArrowCircleRight className="text-2xl" aria-hidden="true" />
        </NavigationButton>
      </div>
    </div>
  );
};

export default TestimonialCarouselV2;
