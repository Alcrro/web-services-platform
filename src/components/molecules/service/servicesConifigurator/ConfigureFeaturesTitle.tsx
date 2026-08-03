const ConfigureFeaturesTitle = ({ name }: { name: string }) => {
  return (
    <h2 className="text-xl font-semibold">
      Configure <span className="italic border-b ">{name}</span>
    </h2>
  );
};

export default ConfigureFeaturesTitle;
