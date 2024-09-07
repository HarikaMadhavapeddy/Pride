import { useParams, useRouteLoaderData, json } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { useSelector } from "react-redux";

export default function ProductPage(){
    //const data=useRouteLoaderData('products-data');// can access the loader data in parent route
    const params=useParams();
    const {data}=useSelector(state=>state.shoppingProducts);
    
    const result=data.findIndex((item)=>item.id===Number(params.productId));
    const productDetails=data[result];
    //console.log(data,params.productId, result, productDetails);
    

    //const productsData = productsD.products;
    //const productDetails=productsData.filter((item)=>item.id==params.productId);
    return <ProductDetails item={productDetails}/>
}