import * as React from "react"
import Layout from '../components/layout'

const IndexPage = () => {
  const isSSR = typeof document === "undefined"
  return (
    !isSSR && <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <a 
        class="twitter-share-button"
        target="_blank"
        id="hhhhh"
        href="https://www.youtube.com/"
        pageName={document?.title}
        buttonId="RW_HP_Top_Banner_Athlete_EHEALTH"
        name="立即预约"
        onClick={()=>{
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
          event: "share",
          page_name: document?.title,
          button_name: "buttonName",
          button_ID: "button2222"
          })}}
        
      >
        <span>Twitter</span>
      </a>
      <button id="button1" name="buttonName" className="button1" onClick={()=>{
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
        event: "click",
        page_name: document?.title,
        button_name: "buttonName",
        button_ID: "button2222"
        })}}>button</button>
    </Layout>
  )
}

// You'll learn about this in the next task, just copy it for now

// Step 3: Export your component
export default IndexPage