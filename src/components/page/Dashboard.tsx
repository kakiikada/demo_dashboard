
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
          <h2 className="dashboard_cardList_title">売上合計</h2>
          <p className="dashboard_cardList_text">売上対象の注文金額の合計</p>
          <p className="dashboard_cardList_data">&#165;{totalSales.toLocaleString()}</p>
        </li>
        <li>
          <h2 className="dashboard_cardList_title">注文数</h2>
          <p className="dashboard_cardList_text">対象となる注文の件数</p>
          <p className="dashboard_cardList_data">{validOrders.length}<small>件</small></p>
        </li>
        <li>
          <h2 className="dashboard_cardList_title">平均注文額</h2>
          <p className="dashboard_cardList_text">売上合計 ÷ 注文数</p>
          <p className="dashboard_cardList_data">&#165;{ averageOrderAmount.toLocaleString() }</p>
        </li>
        <li>
          <h2 className="dashboard_cardList_title">販売個数</h2>
          <p className="dashboard_cardList_text">販売対象の数量の合計</p>
          <p className="dashboard_cardList_data">{totalQuantity}<small>個</small></p>
        </li>
      </ul>
      <div className="dashboard_contentLayout">
        <section className="dashboard_contentLayout_content-1 space-m">
          <div className="defaultBox">
            <h2 className="dashboard_title">売上推移</h2>
            <SalesChart />
          </div>
        </section>
        <section className="dashboard_contentLayout_content-2">
          <div className="defaultBox">
          <h2 className="dashboard_title">カテゴリ別売上</h2>
            <CategorySalesChart />
          </div>
        </section>
        <section className="dashboard_contentLayout_content-3">
          <div className="defaultBox">
          <h2 className="dashboard_title">注文ステータス</h2>
            <OrderStatusChart />
          </div>
        </section>
      </div>
    </div>
  )
}
export default Dashboard;