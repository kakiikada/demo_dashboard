import { useState } from "react";
import ordersData from "../../data/orders.json";
import productsData from "../../data/products.json";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const salesByDate = ordersData
// キャンセル削除
.filter((order) => order.status !== "cancelled")
  .reduce<{ date: string; sales: number }[]>((result, order) => {
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
      (item) => item.date === order.orderDate
    );

    if (existing) {
      existing.sales += sales;
    } else {
      result.push({
        date: order.orderDate,
        sales: sales,
      });
    }

    return result;
  }, [])
  //日付順に並び替え
  .sort((a, b) => a.date.localeCompare(b.date));
  
  
  function SalesChart() {
    //期間切り替え
    const [period, setPeriod] = useState<7 | 30 | "all">(7);
    const filteredSalesData =
    period === "all"
      ? salesByDate
      : salesByDate.slice(-period);
  return (
    <>
    <div className="graphBtnList">
        <button
            onClick={() => setPeriod("all")}
            className={`btn ${period === "all" ? "active" : ""}`}
        >
            全期間
        </button>
        <button
            onClick={() => setPeriod(30)}
            className={`btn ${period === 30 ? "active" : ""}`}
        >
            30日間
        </button>
        <button
            onClick={() => setPeriod(7)}
            className={`btn ${period === 7 ? "active" : ""}`}
        >
            7日間
        </button>
    </div>
    <div className="space-s" style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredSalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
                const[year,month,day] = value.split("-");
                return `${Number(year)}/${Number(month)}/${Number(day)}`;
            }}
          />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            labelFormatter={(value) => {
              if (typeof value !== "string") {
                return value;
              }
              const[year,month,day] = value.split("-");
              return `${Number(year)}/${Number(month)}/${Number(day)}`;
            }}
            formatter={(value) =>
                `${Number(value).toLocaleString()}円`
            }
          />
          <Line
            type="monotone"
            dataKey="sales"
            name="売上"
            stroke="#9cd64f"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </>
  );
}

export default SalesChart;
