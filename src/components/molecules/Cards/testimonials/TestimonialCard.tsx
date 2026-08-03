import Image from "next/image";
import { ITestimonialReview } from "@/shared/data/consts/homePage/homePageContent";

const TestimonialCard = ({ review }: { review: ITestimonialReview }) => {
  return (
    <>
      <div className="w-35 h-35 rounded-full overflow-hidden mx-auto">
        <Image
          src={review.image}
          alt={review.name}
          width={140}
          height={140}
          className="object-cover w-full h-full bg-gray-300"
          priority
        />
      </div>
      <div>{review.name}</div>
      <div>{review.role}</div>
      <div className="text-center text-gray-500 text-sm">{review.text}</div>
    </>
  );
};

export default TestimonialCard;
