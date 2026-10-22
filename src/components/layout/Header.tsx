
import { useState } from "react";

type Page = "dashboard" | "products" | "orders";
type HeaderProps = {
  activePage: Page;
};

function Header({ activePage }: HeaderProps) {
  const titles: Record<Page, string> = {
    dashboard: "ダッシュボード",
    products: "商品管理",
    orders: "注文管理",
  };
  const text: Record<Page, string> = {
    dashboard: "売上データを分析し、商品の動きを把握できるダッシュボード",
    products: "商品一覧・価格・在庫などを確認するページ",
    orders: "注文履歴・金額・注文状況を確認するページ",
  };

  return (
    <header className="header">
      <h2 className="header_title">{titles[activePage]}</h2>
      <p className="header_subTitle">{text[activePage]}</p>
    </header>
  )
}

export default Header;