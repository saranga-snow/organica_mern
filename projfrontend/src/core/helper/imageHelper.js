import React from "react"
import { API } from "../../backend"

const ImageHelper = ({ product }) => {
  let imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://image.shutterstock.com/image-vector/invalid-seal-print-corroded-texture-260nw-1232017768.jpg`
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  )
}

export default ImageHelper
