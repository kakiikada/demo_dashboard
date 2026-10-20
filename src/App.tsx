import { useState } from 'react'
import Header from './components/layout/Header.tsx'
import Sidebar from './components/layout/Sidebar.tsx'

import Dashboard from './components/page/Dashboard.tsx'
import Products from './components/page/Products.tsx'
import Orders from './components/page/Orders.tsx'
import './styles/App.css'

type Page = "dashboard" | "products" | "orders";

function App() {
  const [activePage, setActivePage] =
    useState<Page>("dashboard");
  return (
    <>
    <main>
      <div className="layout">
        <div className="layout_left">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
        <div className="layout_right">
          <Header activePage={activePage} />
          <div className="contents">
            {/* ダッシュボード */}
            {activePage === "dashboard" && 
            <section className="section">
              <Dashboard />
            </section>
            }
            {/* 商品管理 */}
            {activePage === "products" && 
            <section className="section">
              <Products />
            </section>
            }
            {/* 注文管理 */}
            {activePage === "orders" && 
            <section className="section">
              <Orders />
            </section>
            }
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
