import React from "react"
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#f6f5f4"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="0" y="10" rx="10" ry="10" width="194" height="244" />
  </ContentLoader>
)

export default MyLoader


