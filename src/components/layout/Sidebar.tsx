
import { useState } from "react";

export default function Sidebar() {
  return (
      <div className="sidebar">
        <h1 className="sidebar_title">売上管理<span>ダッシュボード</span></h1>
        <ul className="sidebar_list">
            <li><button className="active">Home</button></li>
            <li><button>商品管理</button></li>
            <li><button>注文管理</button></li>
            {/* <li>setting</li> */}
        </ul>
      </div>
  )
}