import Button from "@/shared/ui/Button";
import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { IServiceOrder } from "@/modules/orders/domain/types/order.types";
import { IService } from "@/modules/services/domain/types/service.types";
import {
  MinusCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
  CheckCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { IPriceCalculated } from "./ConfigureReviewList";
import { sendConfigurator } from "@/lib/services/makeAnOrder";
import { IClient } from "@/modules/clients/domain/types/client.types";
import { selectedOptionMapper } from "@/lib/mapper/serviceOrderMapper";
import LoadingSpinner from "../../shared/ui/LoadingSpinner";
import { useErrorStore } from "@/context/useErrorStore";
import { useParams, useRouter } from "next/navigation";

const FutureConfiguratorNavButtons = ({
  service,
  price,
}: {
  service: IService;
  price: IPriceCalculated;
}) => {
  // const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const { errors, setErrors, clearError } = useErrorStore((store) => store);
  const {
    step,
    setStep,
    contactInfo,
    setContactInfo,
    selectedOptions,
    setSelectedOptions,
  } = useServiceConfiguratorStore((store) => store);
  const MAX_STEP = 2;

  const stepToPath: Record<number, string> = useMemo(() => {
    return {
      0: "features",
      1: "client-details",
      2: "summary",
    };
  }, []);

  const router = useRouter();
  const params = useParams(); // params.configurator = ["configurator","features"]

  const serviceOptionOrderItems = selectedOptions.map(selectedOptionMapper);
  const serviceIncludedOrderItems = service.serviceFeatures
    .filter((f) => f.type === "STANDARD")
    .map(selectedOptionMapper);

  const payload: Omit<IServiceOrder, "orderNo"> = {
    client: contactInfo as IClient,
    serviceId: service.id,
    items: [...serviceIncludedOrderItems, ...serviceOptionOrderItems],
    id: service.id,
    clientId: "",
    projectName: "",
    initialPrice: service.pricingConfig?.displayPrice ?? 0,
    totalPrice: price.total,
    status: "NEW",
    createdAt: new Date(),
    isDeleted: false,
  };

  const handleNext = async () => {
    if (step < MAX_STEP) {
      const nextStep = step + 1;
      setStep(step + 1);
      router.replace(
        `/services/${service.slug}/configurator/${stepToPath[nextStep]}`
      );
    } else {
      const response = await sendConfigurator(payload);

      if (!response.success) {
        const errors = response.errors ?? {}; // fallback la obiect gol
        Object.entries(errors).forEach(([field, message]) => {
          if (typeof message === "string" || Array.isArray(message)) {
            setErrors(field, message);
          }
        });
        return;
      }

      console.log(response);

      setStep(0);
      setContactInfo({ name: undefined, email: undefined, phone: undefined });
      setSelectedOptions([]);
      return;
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      router.replace(
        `/services/${service.slug}/configurator/${stepToPath[prevStep]}`
      );
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => {
      Object.entries(errors).forEach(([field, message]) => {
        if (
          typeof message === "string" ||
          (typeof message === "string" && !message) ||
          Array.isArray(message)
        ) {
          clearError(field); // ✅ now TypeScript is happy
        }
      });
    }, 3000);

    return () => clearTimeout(timer); // proper cleanup
  }, [errors, clearError]);

  useCallback(() => {
    const currentStep = params.configurator?.[1]; // features | client-details | summary
    if (!currentStep) return;

    const stepIndex = Object.values(stepToPath).indexOf(currentStep);
    if (stepIndex >= 0 && stepIndex !== step) {
      setStep(stepIndex); // sync store with URL
    }
  }, [params.configurator, step, setStep, stepToPath]);

  return (
    <>
      <div className="navigation_btns flex justify-between">
        <Button
          className={`flex justify-center m-auto ${errors && ""}`}
          onClick={handlePrev}
        >
          {step === 0 ? (
            <MinusCircle className="w-10 h-10 text-gray-400" />
          ) : (
            <ArrowLeftCircle
              className={`w-10 h-10 hover:text-green-400 cursor-pointer ${
                Object.keys(errors).length > 0 && "text-gray-400"
              }`}
            />
          )}
        </Button>

        <Button
          className="flex justify-center m-auto"
          disabled={Object.entries(errors).length > 0}
          onClick={handleNext}
        >
          {step < MAX_STEP ? (
            <ArrowRightCircle className="w-10 h-10 hover:text-green-400 cursor-pointer" />
          ) : Object.keys(errors).length > 0 ? (
            <LoadingSpinner />
          ) : (
            <CheckCircle
              className={`w-10 h-10 text-green-500 cursor-pointer`}
            />
          )}
        </Button>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="text-center">
          {Object.entries(errors).map(([field, msgs]) =>
            (Array.isArray(msgs) ? msgs : [msgs]).map((msg, i) => (
              <p className="text-red-500 animate-bounce" key={`${field}-${i}`}>
                {msg}
              </p>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default FutureConfiguratorNavButtons;
