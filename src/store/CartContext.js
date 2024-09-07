import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  deleteItem: () => {},
  plusItem: ()=>{},
  minusItem: ()=>{},
  filterItem:()=>{},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });
  const[searchItem, setSearchItem]=useState('');
  function handleAddItem(id, image, title, price) {
    setShoppingCart((prevCart) => {
      const products = [...prevCart.items];
      const existingItem = products.findIndex((item) => item.id == id);
      const existingProduct = products[existingItem];

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        products[existingItem]=updatedProduct;
      }
      //products=[...existingItem];
      else {
        products.push({
          id: id,
          image: image,
          name: title,
          price: price,
          quantity: 1,
        });
      }
      //console.log(existingItem);

      return {
        items: products,
      };
    });
  }
  console.log(shoppingCart.items);
  function handleDeleteItem(id) {
    setShoppingCart(prevCart=>{
        const products=[...prevCart.items];
        const updatedProducts=products.filter(item=>item.id!==id);
        return{
            items: updatedProducts,
        };
    });
  }
  function handlePlusItem(id){
    setShoppingCart((prevCart) => {
        const products = [...prevCart.items];
        const existingItem = products.findIndex((item) => item.id == id);
        const existingProduct = products[existingItem];
  
        if (existingProduct) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };
          products[existingItem]=updatedProduct;
        }
        //products=[...existingItem];
  
        return {
          items: products,
        };
      });
  }
  function handleMinusItem(id){
    setShoppingCart((prevCart) => {
        const products = [...prevCart.items];
        const existingItem = products.findIndex((item) => item.id == id);
        const existingProduct = products[existingItem];
  
        if (existingProduct) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          };
          products[existingItem]=updatedProduct;
        }
        //products=[...existingItem];
  
        return {
          items: products,
        };
      });
  }
  function handleFilterItem(){}
  const CartCxt = {
    items: shoppingCart.items,
    addItem: handleAddItem,
    deleteItem: handleDeleteItem,
    plusItem: handlePlusItem,
    minusItem: handleMinusItem,
    filterItem: handleFilterItem,
    searchItem,
    setSearchItem
  };
  return (
    <CartContext.Provider value={CartCxt}>{children}</CartContext.Provider>
  );
}
