
import { useState } from "react";

type Page = "dashboard" | "products" | "orders";
type SidebarProps = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};
function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  return (
      <nav className="sidebar">
        <h1 className="sidebar_title">売上管理<span>ダッシュボード</span></h1>
        <ul className="sidebar_list">
            <li><button className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>Home</button></li>
            <li><button className={activePage === "products" ? "active" : ""} onClick={() => setActivePage("products")}>商品管理</button></li>
            <li><button className={activePage === "orders" ? "active" : ""} onClick={() => setActivePage("orders")}>注文管理</button></li>
            {/* <li>setting</li> */}
        </ul>
      </nav>
  )
}

export default Sidebar;