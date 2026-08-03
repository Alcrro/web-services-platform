import ServiceConfiguratorStepper from "./ServiceConfiguratorStepper";

const ServiceHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Service Configurator</h1>
        <p className="text-slate-600">
          Build a scoped quote and configuration for your next web project.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ServiceConfiguratorStepper />
      </div>
    </header>
  );
};

export default ServiceHeader;
