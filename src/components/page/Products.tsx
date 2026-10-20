
import { useState } from "react";

export default function Products() {
  return (
    <div className="products">
      <h2 className="title">商品検索欄</ h2>
      <div>
          <ul className="products_input">
            <li><p>商品名：</p><input type="text" placeholder="" /></li>
            <li>
              <p>カテゴリ：</p>
              <select name="" id="">
                <option value="">1aaaaaa</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
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
            <select name="" id="">
              <option value="">1aaaaaa</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
            </li>
          <li>
          <button className="btn">検索</button></li>
      </ul>
      <table className="space-s">
        <tr>
          <th>商品名</th>
          <th>カテゴリ</th>
          <th>価格</th>
          <th>在庫数</th>
        </tr>
        <tr>
          <td>アイテム1</td>
          <td>カテゴリ1</td>
          <td>10000</td>
          <td>2</td>
        </tr>
        <tr>
          <td>アイテム1</td>
          <td>カテゴリ1</td>
          <td>10000</td>
          <td>2</td>
        </tr>
      </table>
    </div>
  )
}