"use client";
import { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import EChartsReact from "echarts-for-react";

interface IServiceOptionProps {
  data: IServiceDataProps[];
  onSelectService?: (serviceName: string) => void; // callback to parent
}

interface IServiceDataProps {
  name: string;
  value: number;
}

const ServiceSummaryV2 = ({ data, onSelectService }: IServiceOptionProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  // const textColor = isDark ? "#fff" : "#000";
  const chartRef = useRef<EChartsReact>(null);
  // 🟢 Get your CSS variables
  const textColor = isDark ? "#f0f0f0" : "#333";

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
      textStyle: { color: "#000" },
    },
    dataset: {
      source: data.map((d) => [d.name, d.value]),
      dimensions: ["Service", "Orders"],
    },
    series: [
      {
        type: "pie",
        radius: ["0", "50%"], // donut
        center: ["50%", "44%"], // center of chart
        startAngle: 180, // half-circle
        encode: { value: "Orders", tooltip: "Orders", itemName: "Service" },
        label: {
          color: textColor,
        },
      },
    ],
    media: [
      {
        query: {
          minWidth: 800,
        },
        option: {
          legend: {
            orient: "vertical",
            left: "right",
            top: "top",
            textStyle: { color: textColor },
            padding: 10,
          },
        },
      },
      {
        query: {
          maxWidth: 800,
        },
        option: {
          legend: {
            orient: "horizontal", // stack horizontally
            left: "center",
            top: "top",
            padding: 20,
          },
        },
      },
    ],
  };

  const onEvents = {
    click: (params: IServiceDataProps) => {
      if (onSelectService) {
        onSelectService(params.name);
      }
    },
  };
  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance().resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ReactECharts
      className="w-full h-150"
      ref={chartRef}
      option={option}
      onEvents={onEvents}
    />
  );
};

export default ServiceSummaryV2;
