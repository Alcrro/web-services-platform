import DefaultIcon from "../../../shared/ui/icons/defaultIcon";
import { initials } from "@/shared/utils/initials";
import Description from "@/shared/ui/Description";

const TrustContactImage = ({ img, name }: { img?: string; name: string }) => {
  return !img ? (
    <DefaultIcon
      alt={"profile icon"}
      icon={
        <Description className="bg-gray-400 flex text-3xl justify-center items-center w-20 h-20 rounded-full">
          {initials(name)}
        </Description>
      }
    />
  ) : (
    <DefaultIcon src={img} alt={"profile icon"} />
  );
};

export default TrustContactImage;
