import { useState } from "react";
import ordersData from "../../data/orders.json";
import productsData from "../../data/products.json";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const categorySales = ordersData
// キャンセル削除
.filter((order) => order.status !== "cancelled")
  .reduce<{ category: string; sales: number }[]>((result, order) => {
    // 商品価格を探す
    const product = productsData.find(
      (item) => item.id === order.productId
    );
    // 値段がなかった場合
    if (!product) {
      return result;
    }
    // 各履歴の購入額合計の計算
    const sales = product.price * order.quantity;

    const existing = result.find(
      (item) => item.category === product.category
    );

    if (existing) {
      existing.sales += sales;
    } else {
      result.push({
        category: product.category,
        sales: sales,
      });
    }

    return result;
  }, [])

  //売上順に並べる
  .sort((a, b) => b.sales - a.sales);
  // バーの色の追加
  const categoryColors: Record<string, string> = {
  食品: "#F4A261",
  美容: "#2A9D8F",
  インテリア: "#6C8AE4",
  文房具: "#B07CC6",
  雑貨: "#cfe069",
};

  function CategorySalesChart() {
  return (
    <>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categorySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString()
            }
          />
          <Tooltip
            formatter={(value) =>
              `${Number(value).toLocaleString()}円`
            }
          />
          <Bar
            dataKey="sales"
            name="売上"

            radius={[2, 2, 0, 0]}
          >
            {categorySales.map((item) => (
              <Cell
                key={item.category}
                fill={categoryColors[item.category] ?? "#4f7cac"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  );
}

export default CategorySalesChart;
