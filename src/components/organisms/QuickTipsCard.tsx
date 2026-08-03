import { FC } from "react";

interface IQuickTipsCard {
  title: string;
  tips: string[];
}
const QuickTipsCard: FC<IQuickTipsCard> = ({ title, tips }) => {
  return (
    <div className="p-4 border rounded">
      <h4 className="font-semibold">{title}</h4>
      <ul className="list-disc ml-5 mt-2 text-sm text-slate-600">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuickTipsCard;
