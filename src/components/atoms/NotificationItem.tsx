export interface NotificationItemProps {
  type: string;
  label: string;
  icon: React.ComponentType;
}
const NotificationItem = ({ icon: Icon }: NotificationItemProps) => {
  return (
    <div>
      <Icon />
    </div>
  );
};

export default NotificationItem;
