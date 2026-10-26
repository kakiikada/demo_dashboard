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

 // サンプル注文の日付を今日に合わせて調整
const latestOrderDate = ordersData.reduce(
  (latest, order) =>
    order.orderDate > latest ? order.orderDate : latest,
  ordersData[0].orderDate
);

// 今日の日付（時刻を除く）
const today = new Date();
today.setHours(0, 0, 0, 0);

// 最新注文日と今日の差を計算
const latestDate = new Date(`${latestOrderDate}T00:00:00`);
const dayOffset = Math.round(
  (today.getTime() - latestDate.getTime()) /
    (1000 * 60 * 60 * 24)
);

// 注文内容はそのまま、日付だけ調整
const adjustedOrdersData = ordersData.map((order) => {
  const date = new Date(`${order.orderDate}T00:00:00`);
  date.setDate(date.getDate() + dayOffset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    ...order,
    orderDate: `${year}-${month}-${day}`,
  };
});
const salesByDate = adjustedOrdersData

// const salesByDate = ordersData

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
const filteredSalesData = (() => {
  if (period === "all") {
    return salesByDate;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result: { date: string; sales: number }[] = [];

  // 今日を含めて7日間・30日間の日付を作る
  for (let i = period - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    // その日に売上データがあるか探す
    const existing = salesByDate.find(
      (item) => item.date === dateString
    );

    result.push({
      date: dateString,
      sales: existing ? existing.sales : 0,
    });
  }

  return result;
})();
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
            直近30日間
        </button>
        <button
            onClick={() => setPeriod(7)}
            className={`btn ${period === 7 ? "active" : ""}`}
        >
            直近7日間
        </button>
    </div>
    <p>※こちらデモサイトのため、データは固定のものを用意し、データ内の日付を自動調整して常に最新が今日になるように変更修正しています。そのため、直近7日のデータは明日になっても同じ形のグラフが表示されます。</p>
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
