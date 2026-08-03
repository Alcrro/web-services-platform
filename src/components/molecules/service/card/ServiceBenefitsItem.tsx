import { ServiceBenefitItem } from "@/shared/data/consts/servicePage/servicePageContent";
import Description from "@/shared/ui/Description";
import Title from "@/shared/ui/Title";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface ISerBenefProp {
	item: ServiceBenefitItem;
	Icon: LucideIcon;
}

const ServiceBenefitsItem: FC<ISerBenefProp> = ({ item, Icon }) => {
	return (
		<div className="flex flex-col items-start gap-4 p-6 rounded-2xl border border-(--color-border) bg-(--color-bg) hover:shadow-lg transition-shadow duration-200">
			<div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mx-auto">
				<Icon className="w-6 h-6 text-(--color-accent)" />
			</div>
			<Title
				as="h3"
				className="text-lg font-semibold text-(--color-text)"
			>
				{item.title}
			</Title>
			<Description
				as="p"
				className="text-sm text-(--color-text-secondary) leading-relaxed"
			>
				{item.description}
			</Description>
		</div>
	);
};

export default ServiceBenefitsItem;
