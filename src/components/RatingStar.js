import React from 'react'
import { IoIosStar } from "react-icons/io";

export default function RatingStar({rating}) {
    const array=[];
    for(let i=0;i<rating;i++){
        array.push(i);
    }
    console.log(array);
  return (
    <div>
        {array.map(star=><IoIosStar style={{width:'20px'}}/>)}
    </div>
  )
}
