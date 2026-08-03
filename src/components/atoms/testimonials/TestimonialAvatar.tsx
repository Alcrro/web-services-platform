import Image from "next/image";

interface TestimonialAvatarProps {
  image: string;
  name: string;
}

const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({
  image,
  name,
}) => (
  <Image
    src={image}
    alt={name}
    width={1000}
    height={1000}
    className="w-12 h-12 rounded-full object-cover"
  />
);

export default TestimonialAvatar;
