
import { useState } from "react";

type Page = "dashboard" | "products" | "orders";
type SidebarProps = {
  activePage: Page;
  setActivePage: (page: Page) => void;
  setIsOpen: (isOpen: boolean) => void;
};
function Sidebar({
  activePage,
  setActivePage,
  setIsOpen,
}: SidebarProps) {
  return (
    <>
      <nav className="sidebar">
        <h1 className="sidebar_title">SalesBoard<span>Management System</span></h1>
        <ul className="sidebar_list">
            <li><button
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() =>{
                setActivePage("dashboard");
                setIsOpen(false);
              }}>ダッシュボード
            </button></li>
            <li><button
              className={activePage === "products" ? "active" : ""}
              onClick={() =>{
                setActivePage("products");
                setIsOpen(false);
              }}>商品管理
            </button></li>
            <li><button
              className={activePage === "orders" ? "active" : ""}
              onClick={() =>{
                setActivePage("orders");
                setIsOpen(false);
              }}>注文管理
            </button></li>
            {/* <li>setting</li> */}
        </ul>
      </nav>
      </>
  )
}

export default Sidebar;