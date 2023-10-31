import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 430"
    backgroundColor="#cccccc"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="51" y="110" rx="0" ry="0" width="1" height="0" /> 
    <rect x="9" y="1" rx="31" ry="31" width="260" height="260" /> 
    <rect x="10" y="275" rx="8" ry="8" width="257" height="20" /> 
    <rect x="7" y="307" rx="13" ry="13" width="260" height="68" /> 
    <rect x="119" y="381" rx="10" ry="10" width="150" height="45" /> 
    <rect x="6" y="381" rx="10" ry="10" width="105" height="45" />
  </ContentLoader>
)

export default Skeleton;