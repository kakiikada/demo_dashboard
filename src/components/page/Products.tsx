
import { useState, useEffect } from "react";
import productsData from '../../data/products.json';
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
};

type SortKey = "none" | "id" | "name" | "price" | "stock";
type SortOrder = "asc" | "desc";
type StockFilter = "all" | "inStock" | "lowStock" | "outOfStock";

function Products() {
  // カテゴリ一覧を作成
  const categorize = [
    ...new Set(productsData.map((item) => item.category))
  ];

  // 絞り込み
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  // ソート
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // 処理
  const filteredProducts = productsData.filter((item) => {
    const matchesName = item.name.includes(searchWord);

    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "inStock" && item.stock >= 10) ||
      (stockFilter === "lowStock" &&
        item.stock >= 1 &&
        item.stock < 10) ||
      (stockFilter === "outOfStock" && item.stock === 0);

    return matchesName && matchesCategory && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortKey === "none") {
      return 0;
    }
    if (sortKey === "id") {
      return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
    if (sortKey === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name, "ja")
        : b.name.localeCompare(a.name, "ja");
    }

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    return sortOrder === "asc"
      ? aValue - bValue
      : bValue - aValue;
  });

  // ページネーション
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; //1ページ当たりの表示数
  const totalPages = Math.ceil(
    sortedProducts.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex, startIndex + itemsPerPage
  );
  // 検索・並び替えが行われた際、ページネーションを1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [sortKey, searchWord, selectedCategory, stockFilter, sortOrder]);
  return (
    <div className="products">
        {/* 絞り込み */}
      <div className="products_input">
        <div className="products_input_item">
          <p>商品名：</p>
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="商品名で検索"
          />
        </div>
        <div className="products_input_item">
          <p>カテゴリ：</p>
          <select
            defaultValue=""
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">すべてのカテゴリ</option>
            {categorize.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="products_input_item">
          <p>ステータス：</p>
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value as StockFilter)
            }
          >
            <option value="all">すべての在庫状態</option>
            <option value="inStock">在庫あり</option>
            <option value="lowStock">在庫少</option>
            <option value="outOfStock">在庫切れ</option>
          </select>
        </div>
      </div>
      {/* 並び順 */}
      <div className="products_sortBox space-s">
        <div className="products_sortBox_item">
          <div className="products_input">
            <div className="products_input_item">
              <p>並び順：</p>
            </div>
            <div className="products_input_item">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
              >
                <option value="id">登録順</option>
                <option value="name">商品名</option>
                <option value="price">価格</option>
                <option value="stock">在庫数</option>
              </select>
            </div>
            <div className="products_input_item">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as sortOrder)}
              >
                <option value="asc">昇順</option>
                <option value="desc">降順</option>
              </select>
            </div>
          </div>
        </div>
        <div className="products_sortBox_item">
          <p>全 {productsData.length} 件の商品</p>
        </div>
      </div>
      <table className="space-ss">
        <tbody>
          <tr>
            <th>商品名</th>
            <th>カテゴリ</th>
            <th>価格</th>
            <th>在庫数</th>
            <th>ステータス</th>
          </tr>
            {sortedProducts.length > 0 ? (
              paginatedProducts.map((item: Product) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>¥{item.price.toLocaleString("ja-JP")}</td>
                  <td>{item.stock}</td>
                  <td>
                    {item.status === "active" ? "販売中" : "販売停止"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  該当する商品はありません。
                </td>
              </tr>
            )}
        </tbody>
      </table>
      {/* ページネーション */}
      <div className="pagination space-ss">
        <button className={`pagination_prev ${currentPage === 1 ? "disabled" : ""} `}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          前へ
        </button>

        <span className="pagination_current">
          {currentPage} / {totalPages || 1}
        </span>

        <button className={`pagination_next ${currentPage >= totalPages ? "disabled" : "" } `}
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          次へ
        </button>
      </div>
    </div>
  )
}
export default Products;