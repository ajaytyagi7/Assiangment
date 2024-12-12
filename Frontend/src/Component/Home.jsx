import React from 'react'
import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {
  const [selFile, setSelFile] = useState('');


  //Add Product Form Code

  const ProductForm = useFormik({
    initialValues: {

      name: '',
      price: '',
      description: '',
      image: '',

    },

    onSubmit: async (values, { setSubmitting }) => {
      values.image = selFile;
      console.log(values);

      const res = await fetch('http://localhost:3000/product/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-Type': 'application/json'
        }
      });

      setSubmitting(false)
      console.log(res.status);

      if (res.status == 200) {
        enqueueSnackbar('Product Add Successfuly ', { variant: 'success' });

      } else if (res.status == 401) {
        enqueueSnackbar('Invalid Email', { variant: 'error' });
       
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });

      }



    },
  }
  );

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:3000/util/uploadfile", {
        method: "POST",
        body: fd,
    }).then((res) => {
        if (res.status === 200) {
            console.log("file uploads");
        }
    });
};


// Product List And Delete Code

const [productList, setproductList] = useState('')

const fetchProductData = async () => {
  const res = await fetch('http://localhost:3000/product/getall')
  const data = await res.json()
setproductList(data)
}

const displayproductData=()=>{
  if(productList){
    return productList.map((product)=>{
      return(
        <div className="col-md-4 mt-3" key={product._id}>
          <div className="shadow-2xl ">
            <div className="card-body">
              <div>
              <img  src={`http://localhost:3000/${product.image}`} className="w-100 h-64" alt="" />

              </div>
              <div className='p-4'>
              <h1 className=' text-lg font-semibold'>{product.name}</h1>
              <h1 className=' font-semibold'>₹ {product.price}</h1>
              <h1 className='mt-2'>{product.description}</h1>
              <button className="bg-red-500  w-100 p-2 mt-3 text-white font-semibold" onClick={()=>deleteProduct(product._id)}>
              <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
             
              </button>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
 
}
useEffect(() => {
  fetchProductData();
}, [])


//Delete Product Code

const deleteProduct = async (id) => {
  const res=await fetch('http://localhost:3000/product/delete/'+id,{
      method:'DELETE',
      headers:{
          'Content-Type':'application/json'
      }
  });
  const data=await res.json();
  console.log(data)
  fetchProductData();
   
  if(res.status===200){
      enqueueSnackbar('Product Deleted Successfully',{variant:'success'})
  }else{
      enqueueSnackbar('Something went wrong',{variant:'error'})
  }
}


  return (
    <div>
      <div className=''>
        <h1 className='text-center text-4xl font-bold mt-4 underline'>Product Management System </h1>
      </div>

      {/* Add Product Form Code */}

      <div>
        <div className="col-md-5 mx-auto py-5 ">
          <div className="p-5 shadow-2xl">
            <div className="card-body">
              <form onSubmit={ProductForm.handleSubmit}>
                <h1 className='text-center text-2xl font-semibold '>Add Product</h1><hr />
                <input type="text" className='mb-3 mt-3 p-2 form-control border-2 font-semibold' id='name' placeholder='Enter Product Name ' onChange={ProductForm.handleChange} value={ProductForm.values.name} />
                <input type="text" className='mb-3 mt-3 p-2 form-control  border-2 font-semibold' id='price' placeholder='Enter Price ' onChange={ProductForm.handleChange} value={ProductForm.values.price} />
                <input type="text" className='mb-3 mt-3 p-2 form-control  border-2 font-semibold' id='description'  placeholder='Enter Description ' onChange={ProductForm.handleChange} value={ProductForm.values.description} />
                <input type="file" className='mb-3 mt-3 p-2 form-control  border-2 font-semibold'id='image' placeholder='Enter Description ' onChange={uploadFile}/>

                <button className='w-100 bg-violet-500 p-2 mt-3 text-white font-semibold'>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-3xl text-center mt-4 font-semibold underline'>Product List</h1>
      </div>

      {/* Product List Code */}
      <div className="p-5 row ">
                {displayproductData()}
      </div>

    </div>
  )
}

export default Home