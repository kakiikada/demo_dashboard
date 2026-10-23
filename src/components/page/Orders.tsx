
import { useState, useEffect } from "react";
import ordersData from '../../data/orders.json';
import productsData from "../../data/products.json";

type Orders = {
  id: string;
  orderDate: string;
  productId: string;
  quantity: number;
  status: "completed" | "shipped" | "pending" | "cancelled";
};
function Orders() {
  // 絞り込み
  const [searchId, setSearchId] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  // ソート
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const filteredOrders = ordersData.filter((item) => {
    const matchId = item.id
      .toLowerCase()
      .includes(searchId.toLowerCase());

    const matchStatus =
      searchStatus === "" || item.status === searchStatus;

    return matchId && matchStatus;
  });
  const sortedOrders = [...filteredOrders].sort((a, b) => {

    if (sortOrder === "dateDesc") {
      return b.orderDate.localeCompare(a.orderDate);
    }

    if (sortOrder === "dateAsc") {
      return a.orderDate.localeCompare(b.orderDate);
    }

    const productA = productsData.find(
      (product) => product.id === a.productId
    );

    const productB = productsData.find(
      (product) => product.id === b.productId
    );

    const priceA = (productA?.price ?? 0) * a.quantity;
    const priceB = (productB?.price ?? 0) * b.quantity;

    if (sortOrder === "priceDesc") {
      return priceB - priceA;
    }

    if (sortOrder === "priceAsc") {
      return priceA - priceB;
    }

    return 0;
  });
  // ページネーション
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; //1ページ当たりの表示数
  const totalPages = Math.ceil(
    sortedOrders.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedOrders = sortedOrders.slice(
    startIndex, startIndex + itemsPerPage
  );
  // 検索・並び替えが行われた際、ページネーションを1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [searchId, searchStatus, sortOrder]);
  return (
    <div className="orders">
      <section>
        <ul className="orders_input">
          <li>
            <div className="orders_input_item">
              <p>注文番号検索欄：</p>
              <input
                type="text"
                placeholder="ORD-001"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className="orders_input_item">
              <p>注文状況：</p>
              <select
                value={searchStatus}
                onChange={
                  (e) => setSearchStatus(e.target.value)
                  
                }
              >
                <option value="">すべて</option>
                <option value="pending">未対応</option>
                <option value="shipped">発送済み</option>
                <option value="completed">完了</option>
                <option value="cancelled">キャンセル</option>
              </select>
            </div>
          </li>
        </ul>
        <div className="orders_sort space-s">
          <div className="orders_sort_tortal">
            <div className="orders_sort_tortal_item">
              <p>並び順：</p>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="dateDesc">注文日の新しい順</option>
                <option value="dateAsc">注文日の古い順</option>
                <option value="priceDesc">合計金額の高い順</option>
                <option value="priceAsc">合計金額の安い順</option>
              </select>
              </div>
          </div>
          <p className="orders_sort_tortal">全 {sortedOrders.length} 件の商品</p>
        </div>
        <table className=" space-ss">
          <tbody>
            <tr>
              <th>注文番号</th>
              <th>注文日</th>
              <th>商品数</th>
              <th>合計金額</th>
              <th>状況</th>
            </tr>
            {sortedOrders.length > 0 ? (
              paginatedOrders.map((item) => {
                const product = productsData.find(
                  (product) => product.id === item.productId
                );
                const totalPrice = product ? product.price * item.quantity : '0';
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{new Date(item.orderDate).toLocaleDateString("ja-JP")}</td>
                    <td>{item.quantity}</td>
                    <td>¥{totalPrice.toLocaleString("ja-JP")}</td>
                    <td>
                      {
                        item.status === "completed" ? "完了" :
                        item.status === "shipped" ? "発送済み" :
                        item.status === "pending" ? "注文受付" : "キャンセル"
                      }
                    </td>
                  </tr>
                );

              })
            ) : (
              <tr>
                <td colSpan={6}>
                  該当する商品はありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination space-ss">
          {/* ページネーション */}
          <button className={`btn ${currentPage === 1 ? "disabled" : ""} `}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            前へ
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button className={`btn ${currentPage >= totalPages ? "disabled" : "" } `}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            次へ
          </button>
        </div>
      </section>
    </div>
  )
}
export default Orders;