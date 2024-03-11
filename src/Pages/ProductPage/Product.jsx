import React from 'react'
import './product.scss'
import { CalendarMonth, Call, Email, FileUpload, PermIdentity, Place, Publish } from '@mui/icons-material'
import { Navigate, useNavigate } from 'react-router-dom'
import Charts from '../../Components/Charts/Charts'
import { productdata } from '../../DummyData'

const Product = () => {
    const navigate = useNavigate();
    const handleCreate = ()=>{
        navigate('/newProduct')
    }

  return (
    <div className='product'>
        <div className="productTitleContainer">
            <span className="productTitle">Edit Product</span>
            <button className="productAddButton" onClick={
                handleCreate
            }>Create</button>
        </div>

        <div className="productTop">
            <div className="productTopLeft">
                <Charts title="Product Sales" data={productdata} dataKey="Sales" />
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                <img src="https://i5.walmartimages.com/asr/653317d7-6b3c-45a3-96b1-c7650b10485b_1.4478b47c9db6ca2fa92b656b30a8f48f.jpeg" alt="" className="productInfoImg" />
                <span className="productName">HP Computer</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">
                            id:
                        </span>
                        <span className="productInfoValue">
                            123
                        </span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">
                            active:
                        </span>
                        <span className="productInfoValue">
                            Yes
                        </span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">
                            in stock:
                        </span>
                        <span className="productInfoValue">
                            no
                        </span>
                    </div>
                </div>
                
            </div>

        </div>

        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Product Name</label>
                    <input type="text" placeholder='HP Computer'/>
                    <label>In Stock</label>
                    <select name='instock' id='instock'>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <label>Active</label>
                    <select name='active' id='active'>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src="https://i5.walmartimages.com/asr/653317d7-6b3c-45a3-96b1-c7650b10485b_1.4478b47c9db6ca2fa92b656b30a8f48f.jpeg" alt="" className="productUploadImg" />
                        <label for='file'>
                            <FileUpload />
                            </label>
                            <input type="file" className="fileInput" id='file' style={{display:'none'}}/>
                            </div>
                            <button className="productButton">Update</button>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Product