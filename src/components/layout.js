import * as React from 'react'
import { Link } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText} id="home">
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}  page_name={document.title}
              button_id="RW_HP_Top_Banner_Athlete_EHEALTH"
              button_name="立即预约"
              onClick={()=>{
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                event: "buttonClick1",
                page_name: document.title,
                button_name: "buttonName",
                button_ID: "button2222"
                })}}
              >
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/blog" className={navLinkText}>
              Blog
            </Link>
          </li>
          <a 
            id="other" 
            href="/other"
          >
            <span>Other</span>
          </a>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}
export const Head = () => <title>Home Page</title>

export default Layout