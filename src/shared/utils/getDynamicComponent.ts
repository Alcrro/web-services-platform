type AnyComponent = React.FC<Record<string, unknown>>;

interface IDynamicComponentType {
  [key: string]: AnyComponent | IDynamicComponentType;
}

interface DynamicResult {
  component: AnyComponent | null;
  idProp?: string;
}
export function getDynamicComponent(
  mapper: IDynamicComponentType,
  keys: string[]
): DynamicResult {
  //initializam cu mapperul din parametrul functiei iar obligatoriu sa aibe formatele asignate let -ului
  let current: IDynamicComponentType | AnyComponent | null = mapper;
  let idProp: string | undefined;
  //iteram prin fiecare string ex [string1, string2]
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!current) break;

    //daca current exista si este de timpul function
    if (typeof current === "function") {
      //returnam componenta
      return { component: current, idProp };
    }

    // verificam daca keya mapperul exista in mapper
    if (current[key]) {
      //asgnam componenta aceeiei key
      current = current[key];

      // special handling for "id"
      if (key === "id" && i + 1 < keys.length) {
        idProp = keys[i + 1]; // next key is the id value
        if (typeof current === "function") {
          return { component: current, idProp };
        }
        // stop here if current is not a function? optional
        break;
      }
    } else {
      idProp = key;
      break;
    }
  }
  //returnam componenta daca exista sau nu
  return { component: typeof current === "function" ? current : null, idProp };
}
