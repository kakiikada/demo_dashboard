
import { useState } from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="header_layout">
        <div className="header_layout_left">
            <h2 className="header_title">ダッシュボード</h2>
            {/* <h2>商品管理</ h2>
            <h2>注文管理</ h2> */}
            <p className="header_subTitle">売上データを分析し、商品の動きを把握できるダッシュボード</p>
            {/* 商品一覧・価格・在庫などを確認するページ
            注文履歴・金額・注文状況を確認するページ */}
        </div>
        <div className="header-layout_right">
            <ul className="header_list">
                <li className="header_search">
                    <button><i class="ri-search-line"></i></button>
                    <input type="text" placeholder="" />
                </li>
                <li className="header_notice"><button class=""><i class="ri-notification-2-fill"></i></button></li>
                <li className="header_user"><button class=""><i class="ri-user-fill"></i></button></li>
            </ul>
        </div>
      </div>
    </header>
  )
}