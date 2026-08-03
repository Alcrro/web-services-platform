import { modifyIdForIcon } from "../../../../shared/utils/modifyIdForIcons";
import { servicesV11 } from "@/shared/data/consts/cardServices/cardServicesData";
import { IService } from "../types/service.types";

export class Services {
  constructor(private readonly service: IService) {
    this.service = service;
  }

  addDescriptionFromInternal() {
    const findInternalService = servicesV11.find(
      (f) => f.id === this.service.uniqueId
    );

    if (findInternalService) {
      this.service.serviceFeatures = this.service.serviceFeatures.map(
        (feature) => {
          const internalFeature = findInternalService.serviceFeatures.find(
            (f) => f.id === modifyIdForIcon(f.id, feature.uniqueId)
          );

          return {
            ...feature,
            description:
              internalFeature?.description || feature.description || "",
          };
        }
      );
    }

    return this.service;
  }

  toJSON(): IService {
    this.addDescriptionFromInternal();
    return {
      ...this.service,
    };
  }
}
