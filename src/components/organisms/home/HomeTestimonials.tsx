"use client";
import { IHomeTestimonial } from "@/shared/data/consts/homePage/homePageContent";
import style from "@/components/styles/testimonials.module.scss";
import TestimonialCard from "../../molecules/Cards/testimonials/TestimonialCard";
import TestimonialCarouselV2 from "./TestimonialCarouselV2";
import { animStyle, useInView } from "@/shared/hooks/useInView";

const HomeTestimonials = ({
  testimonials,
}: {
  testimonials: IHomeTestimonial;
}) => {
  const { reviews, title } = testimonials;
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView({ once: false });
  const { ref: carouselRef, inView: carouselIn, fromAbove: carouselAbove } = useInView({ once: false, threshold: 0.05 });

  return (
    <div className={style.testimonials}>
      <div
        ref={titleRef}
        className="font-semibold text-2xl my-4 max-sm:text-center"
        style={animStyle(titleIn, titleAbove)}
      >
        {title}
      </div>

      <div ref={carouselRef} style={animStyle(carouselIn, carouselAbove, 100)}>
        <TestimonialCarouselV2>
          {reviews.map((review) => (
            <TestimonialCard review={review} key={review.name + review.role} />
          ))}
        </TestimonialCarouselV2>
      </div>
    </div>
  );
};

export default HomeTestimonials;
