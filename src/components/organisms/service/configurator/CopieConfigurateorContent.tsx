import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";

const CopieConfiguratorContent = () => {
  const quantity = useServiceConfiguratorStore((store) => store.quantity);

  const setQuantity = useServiceConfiguratorStore((store) => store.setQuantity);

  return (
    <label className="flex items-center gap-2">
      <span className="text-sm">Copies / Instances</span>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-20 p-1 border rounded"
      />
    </label>
  );
};

export default CopieConfiguratorContent;
