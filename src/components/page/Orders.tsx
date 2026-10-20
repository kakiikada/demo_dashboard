
import { useState } from "react";

export default function Orders() {
  return (
    <div className="orders">
      <h2 className="title">注文数</ h2>
      <section>
      <ul className="products_input">
          <li><p>注文番号検索欄：</p><input type="number" placeholder="" /></li>
          <li><p>注文状況：</p>
            <select name="" id="">
              <option value="">1aaaaaa</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </li>
          <li><button className="btn">検索</button></li>
      </ul>
        <table className="space-s">
          <tr>
            <th>注文番号</th>
            <th>注文日</th>
            <th>商品数</th>
            <th>合計金額</th>
            <th>状況</th>
          </tr>
          <tr>
            <td>注文番号</td>
            <td>2026/10/10</td>
            <td>3</td>
            <td>20000</td>
            <td>販売中</td>
          </tr>
          <tr>
            <td>注文番号</td>
            <td>2026/10/10</td>
            <td>3</td>
            <td>20000</td>
            <td>販売中</td>
          </tr>
        </table>
      </section>
    </div>
  )
}