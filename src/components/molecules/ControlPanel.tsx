import ControlPanelItem from "../organisms/ControlPanelItem";

const ControlPanel = ({ item }: { item: { name: string; href: string } }) => {
  return <ControlPanelItem name={item.name} href={item.href} />;
};

export default ControlPanel;
