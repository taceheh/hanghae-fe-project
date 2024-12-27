import React, { useEffect, useState } from 'react'
import supabase from '../../../supabase'

const ProductCardComponent =  () => {
    const [data, setData]=useState([])
    const fetchData =async()=>{
        const { data, error } = await supabase
        .from('products')
        .select()
        setData(data);
        console.log(data)
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
  <>
  {data.map((item)=>(
     <div className='w-[48%]' key={item.id}>
     <img src="" alt="원두사진" className=''/>
     <div>{item.name}</div>
     <div>{item.flavor}</div>
     <div>{item.price}</div>
     <div>
       <div>찜 아이콘 개수</div>
       <div>리뷰 아이콘 개수</div>
     </div>
     {/* <button onClick={fetchData}>확인</button> */}
   </div>
  ))}
  </>
  )
}

export default ProductCardComponent
