"use client";
import TestimonialsTitle from "@/components/atoms/portfolio/TestimonialsTitle";
import TestimonialReviewsItem from "@/components/molecules/portfolio/TestimonialReviewsItem";
import { PortfolioTestimonials } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import { animStyle, useInView } from "@/shared/hooks/useInView";

const TestimonialsSection = ({
  testimonials,
}: {
  testimonials: PortfolioTestimonials;
}) => {
  const { ref: titleRef, inView: titleIn, fromAbove: titleAbove } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05 });

  return (
    <>
      <div ref={titleRef} className="text-center mb-12 space-y-2" style={animStyle(titleIn, titleAbove)}>
        <span className="text-sm font-semibold text-(--color-accent) uppercase tracking-widest">
          Client Reviews
        </span>
        <TestimonialsTitle title={testimonials.title} />
      </div>
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.reviews.map((review, idx) => (
          <div key={review.name} style={animStyle(gridInView, false, idx * 100)}>
            <TestimonialReviewsItem review={review} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TestimonialsSection;
