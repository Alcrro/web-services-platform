import AdminSidebar from "@/components/organisms/AdminSidebar";
import ClientPanelLayout from "@/components/templates/controlPanel/ControlPanelLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<ClientPanelLayout>
			<div className="flex gap-4 max-lg:flex-col lg:items-start">
				<AdminSidebar />
				<div className="flex-1 min-w-0 max-lg:w-full">{children}</div>
			</div>
		</ClientPanelLayout>
	);
};

export default layout;
