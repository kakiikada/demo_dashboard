
import { useState } from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="title">売上合計</h2>
      <div>
        <ul className="dashboard_list">
          <li><h2>売上合計</h2><p>20<small>円</small></p></li>
          <li><h2>注文数</h2><p>20<small>件</small></p></li>
          <li><h2>平均注文額</h2><p>20<small>円</small></p></li>
          <li><h2>販売個数</h2><p>20<small>個</small></p></li>
        </ul>
      </div>
      <section className="space-s">
        <h2>売上推移</h2>
        <div className="defaultBox">
          <div className="dashboard_chart"></div>
        </div>
      </section>
      <section className="space-s">
        <h2>カテゴリ別売上</h2>
        <div className="defaultBox">
          <div className="dashboard_chart"></div>
        </div>
      </section>
    </div>
  )
}
export default Dashboard;