import React from 'react'
import './newProduct.scss'

const NewProduct = () => {
  return (
    <div className='newProduct'>
        <span className="addProductTitle">New Product</span>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id='file' />
          </div>
          <div className="addProductItem">
            <label >Name</label>
            <input type="text" placeholder='HP Computer' className='addProductItemInput'/>
          </div>
          <div className="addProductItem">
            <label >Stock</label>
            <input type="number" placeholder='1200' className='addProductItemInput'/>
          </div>
          <div className="addProductItem">
            <label>Active</label>
            <select name="active" id="active" className="addProductSelect">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button className="addProductButton">Create</button>
        </form>
    </div>
  )
}

export default NewProduct