"use client";
import Button from "@/shared/ui/Button";
// import DownloadInvoicePdf from "@/components/organisms/invoice/DownloadInvoicePdf";
import { AnimatedCell } from "@/components/ui/AnimatedText";
import { Eye } from "lucide-react";
import { FC } from "react";

interface ActionHeaderProps {
  id: string;
  isLoading: boolean | false;
}

export const ActionHeaderColumn: FC<ActionHeaderProps> = ({
  id,
  isLoading,
}) => {
  return (
    <div
      className="flex items-center gap-2 justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatedCell isLoading={isLoading} placeholderWidth="4">
        <Button
          href={`${process.env.NEXT_PUBLIC_API}/invoices/pdf/${id}`}
          target="_blank"
        >
          <Eye
            size={18}
            className={"text-gray-400 hover:text-(--color-text) cursor-pointer"}
          />
        </Button>
      </AnimatedCell>

      <AnimatedCell isLoading={isLoading} placeholderWidth="4">
        {/* <DownloadInvoicePdf id={id} /> */}
        pdfD
      </AnimatedCell>
    </div>
  );
};
