
import { useState } from "react";
import SalesChart from "../parts/SalesChart.tsx";
import CategorySalesChart from "../parts/CategorySalesChart.tsx";
import OrderStatusChart from "../parts/OrderStatusChart.tsx";
import ordersData from "../../data/orders.json";
import productsData from "../../data/products.json";

// キャンセル以外の注文を取り出す
const validOrders = ordersData.filter(
  (order) => order.status !== "cancelled"
);
// 合計金額
const totalSales = validOrders.reduce((total, order) => {
  // 商品一覧から値段を探す
  const product = productsData.find(
    (item) => item.id === order.productId
  );

  return total + (product ? product.price * order.quantity : 0);
}, 0);
// 均注文額
const averageOrderAmount = validOrders.length > 0
  ? Math.ceil(totalSales / validOrders.length)
  : 0;
// 販売個数
const totalQuantity = validOrders.reduce((total, order) => {
  return total + order.quantity
}, 0);
function Dashboard() {
  return (
    <div className="dashboard">
      <ul className="dashboard_cardList">
        <li>
          <h2>売上合計</h2>
          <p className="dashboard_cardList_data">&#165;{totalSales.toLocaleString()}</p>
          <p>売上対象の注文金額の合計</p></li>
        <li>
          <h2>注文数</h2>
          <p className="dashboard_cardList_data">{validOrders.length}<small>件</small></p>
          <p>対象となる注文の件数</p></li>
        <li>
          <h2>平均注文額</h2>
          <p className="dashboard_cardList_data">&#165;{ averageOrderAmount.toLocaleString() }</p>
          <p>売上合計 ÷ 注文数</p></li>
        <li>
          <h2>販売個数</h2>
          <p className="dashboard_cardList_data">{totalQuantity}<small>個</small></p>
          <p>販売対象の数量の合計</p></li>
      </ul>
      <div className="dashboard_contentLayout">
        <section className="dashboard_contentLayout_content-1 space-m">
          <h2>売上推移</h2>
          <div className="defaultBox">
            <SalesChart />
          </div>
        </section>
        <section className="dashboard_contentLayout_content-2">
          <h2>カテゴリ別売上</h2>
          <div className="defaultBox">
            <CategorySalesChart />
          </div>
        </section>
        <section className="dashboard_contentLayout_content-3">
          <h2>注文ステータス</h2>
          <div className="defaultBox">
            <OrderStatusChart />
          </div>
        </section>
      </div>
    </div>
  )
}
export default Dashboard;