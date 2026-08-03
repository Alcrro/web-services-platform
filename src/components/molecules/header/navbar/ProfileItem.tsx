export interface ProfileItemProps {
  label: string;
  icon: React.ComponentType;
}
const ProfileItem = ({ icon: Icon }: ProfileItemProps) => {
  return (
    <div>
      <Icon />
    </div>
  );
};

export default ProfileItem;
