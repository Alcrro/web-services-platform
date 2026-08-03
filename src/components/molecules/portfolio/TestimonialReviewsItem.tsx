import TestimonialsReviewDescription from "@/components/atoms/portfolio/TestimonialsReviewDescription";
import TestimonialsReviewImage from "@/components/atoms/portfolio/TestimonialsReviewImage";
import TestimonialsReviewTitle from "@/components/atoms/portfolio/TestimonialsReviewTitle";
import { PortfolioReview } from "@/shared/data/consts/portfololioPage/portfolioPageContent";
import { FC } from "react";

interface ITestimonialReviewItemProps {
  review: PortfolioReview;
}

const TestimonialReviewsItem: FC<ITestimonialReviewItemProps> = ({ review }) => {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-(--color-border) bg-(--color-bg-section) hover:border-(--color-accent)/30 hover:shadow-lg transition-all duration-300">
      <span className="text-4xl leading-none text-(--color-accent) font-serif select-none" aria-hidden>
        ❝
      </span>

      <p className="text-(--color-text-secondary) flex-1 leading-relaxed">{review.text}</p>

      <div className="flex gap-0.5 text-yellow-400 text-sm" aria-label="5 din 5 stele">
        {Array(5).fill("★").join("")}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-(--color-border)">
        <TestimonialsReviewImage image={review.image} />
        <div>
          <TestimonialsReviewTitle title={review.name} />
          <TestimonialsReviewDescription role={review.role} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialReviewsItem;
