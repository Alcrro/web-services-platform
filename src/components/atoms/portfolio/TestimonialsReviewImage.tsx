import DefaultIcon from "@/shared/ui/icons/defaultIcon";

const TestimonialsReviewImage = ({ image }: { image: string }) => {
  return (
    <DefaultIcon
      src={image}
      alt="review-image"
      className="w-12 h-12 rounded-full object-cover"
    />
  );
};

export default TestimonialsReviewImage;
