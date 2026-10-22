import { useState } from 'react'
import Header from './components/layout/Header.tsx'
import Sidebar from './components/layout/Sidebar.tsx'

import Dashboard from './components/page/Dashboard.tsx'
import Products from './components/page/Products.tsx'
import Orders from './components/page/Orders.tsx'
import './styles/App.css'

import HamburgerButton from "./components/common/HamburgerButton.tsx";
import  "./components/common/HamburgerButton.css";

type Page = "dashboard" | "products" | "orders";

function App() {
  const [activePage, setActivePage] =
    useState<Page>("dashboard");
      const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="sidebar-icon">
      <HamburgerButton
          isOpen={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
      />
    </div>
    <main>
      <div className="layout">
        <div className={`layout_left ${isOpen ? "active" : ""}`}>
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            setIsOpen={setIsOpen}
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
