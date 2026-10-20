import { useState } from 'react'
import Header from './components/layout/Header.tsx'
import Sidebar from './components/layout/Sidebar.tsx'

import Dashboard from './components/page/Dashboard.tsx'
import Products from './components/page/Products.tsx'
import Orders from './components/page/Orders.tsx'
// import reactLogo from './assets/react.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <div className="layout">
        <div className="layout_left">
          <Sidebar />
        </div>
        <div className="layout_right">
          <Header />
          <div className="contents">
            <section className="section">
              {/* ダッシュボード */}
              <Dashboard />
            </section>
            <section className="section">
              {/* 商品管理 */}
              <Products />
            </section>
            <section className="section">
              {/* 注文管理 */}
              <Orders />
            </section>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
