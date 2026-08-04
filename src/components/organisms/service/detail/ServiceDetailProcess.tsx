import { serviceProcess } from "@/shared/data/consts/servicePage/serviceDetailData";

const ServiceDetailProcess = () => {
  return (
    <div>
      <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-widest mb-4">
        How it works
      </p>
      <div className="flex flex-col gap-0">
        {serviceProcess.map((item, i) => (
          <div key={item.step} className="flex gap-4">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-(--color-accent)/10 border border-(--color-accent)/30 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-(--color-accent)">{item.step}</span>
              </div>
              {i < serviceProcess.length - 1 && (
                <div className="w-px flex-1 bg-(--color-border) my-1" />
              )}
            </div>
            {/* Content */}
            <div className={`pb-6 ${i === serviceProcess.length - 1 ? "pb-0" : ""}`}>
              <p className="text-sm font-semibold text-(--color-text) mb-0.5">{item.title}</p>
              <p className="text-sm text-(--color-text-secondary) leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailProcess;
