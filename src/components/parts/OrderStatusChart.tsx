import { useState } from "react";
import ordersData from "../../data/orders.json";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const statusLabels: Record<string, string> = {
  completed: "完了",
  pending: "処理中",
  shipped: "発送済み",
  cancelled: "キャンセル",
};

const statusColors: Record<string, string> = {
  completed: "#2A9D8F",
  pending: "#F4A261",
  shipped: "#6C8AE4",
  cancelled: "#B07CC6",
};
const statusCounts = ordersData.reduce<
  { name: string; value: number }[]
>((result, order) => {
  const name = statusLabels[order.status];

  const existing = result.find(
    (item) => item.name === name
  );

  if (existing) {
    existing.value += 1;
  } else {
    result.push({
      name,
      value: 1,
    });
  }

  return result;
}, []);


function OrderStatusChartChart() {
  const totalOrders = statusCounts.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusCounts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}

            label={(props ) => {
              const { name, value, x, y, cx, cy } = props;

              const dx = x - cx;
              const dy = y - cy;
              const length = Math.sqrt(dx * dx + dy * dy);

              const offset = 10;

              const labelX = x + (dx / length) * offset;
              const labelY = y + (dy / length) * offset;

              const percentage = totalOrders > 0
                ? Math.round((Number(value) / totalOrders) * 100)
                : 0;

              return (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={dx >= 0 ? "start" : "end"}
                  dominantBaseline="central"
                  fill={
                    statusColors[
                      Object.entries(statusLabels).find(
                        ([key, label]) => label === name
                      )?.[0] ?? ""
                    ] ?? "#333333"
                  }
                  fontSize={14}
                >
                {`${name} ${percentage}%`}
                </text>
              );
            }}
          >
            {statusCounts.map((item) => (
              <Cell
                key={item.name}
                fill={
                  Object.entries(statusLabels).find(
                    ([, label]) => label === item.name
                  )
                    ? statusColors[
                        Object.keys(statusLabels).find(
                          (key) => statusLabels[key] === item.name
                        )!
                      ]
                    : "#999999"
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </>
  );
}

export default OrderStatusChartChart;
