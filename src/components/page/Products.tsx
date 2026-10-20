
import { useState } from "react";
import productsData from '../../data/products.json';
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
};

function Products() {
  // カテゴリ一覧を作成
  const categorize = [
    ...new Set(productsData.map((item) => item.category))
  ];
  return (
    <div className="products">
      <h2 className="title">商品検索欄</ h2>
      <div>
          <ul className="products_input">
            <li><p>商品名：</p><input type="text" placeholder="" /></li>
            <li>
              <p>カテゴリ：</p>
              <select defaultValue="">
                <option value="">すべてのカテゴリ</option>
                {categorize.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              </li>
            <li><p>価格：</p><input type="number" placeholder="" /></li>
            <li><p>在庫数：</p><input type="number" placeholder="" /></li>
            <li><button className="btn">追加</button></li>
        </ul>
      </div>

      <ul className="products_input space-s">
          <li><p>商品名：</p><input type="text" placeholder="" /></li>
          <li>
            <p>カテゴリ：</p>
            <select defaultValue="">
              <option value="">すべてのカテゴリ</option>
              {categorize.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            </li>
          <li>
          <button className="btn">検索</button></li>
      </ul>
      <table className="space-s">
        <tbody>
          <tr>
            <th>商品名</th>
            <th>カテゴリ</th>
            <th>価格</th>
            <th>在庫数</th>
            <th>ステータス</th>
          </tr>
        {productsData.map((item: Product) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>¥{item.price.toLocaleString("ja-JP")}</td>
            <td>{item.stock}</td>
            <td>
              {item.status === "active" ? "販売中" : "販売停止"}
            </td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  )
}
export default Products;