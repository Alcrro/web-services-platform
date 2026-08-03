import style from "@/components/styles/servicesCards.module.scss";
import { ServicesAction } from "@/modules/services/application/services.action";

const ServiceCardSkeleton = async () => {
  const servicesActions = new ServicesAction();
  const services = await servicesActions.getAllServices({});

  return (
    <div className={`${style.service_card_container}`}>
      {services.map((service) => (
        <div
          className={`flex flex-col h-[640px] animate-pulse rounded-xl shadow bg-gray-200 dark:bg-gray-700 p-2 `}
          key={service.id}
        >
          <div className="mx-auto mb-2 animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
            {service.name}
          </div>
          <div className="mx-auto b-4 animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
            {service.description}
          </div>

          <div className="flex flex-col gap-2 justify-between p-4 overflow-hidden">
            {service.serviceFeatures.map((feature) => (
              <div className="flex gap-2" key={feature.id}>
                <div className="animate-pulse rounded-full bg-gray-400 text-transparent w-6 h-6"></div>
                <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
                  {feature.feature?.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-500 my-4 mt-auto">
            <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
              {/* {service.tech} */}
            </div>
            <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
              {/* {service.domain} */}
            </div>
            <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
              {/* {service.hosting} */}
            </div>
          </div>
          <div className="footer p-4 pt-0">
            <div className="flex justify-between items-center">
              <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
                {service.pricingConfig?.displayPrice ?? null}
              </div>
              <div className="animate-pulse rounded-xl bg-gray-400 text-transparent w-fit">
                {service.slug}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSkeleton;
