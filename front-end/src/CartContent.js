import React, { createContext, useState, useContext } from 'react';

// 创建购物车上下文
export const CartContext = createContext();

// 购物车提供者组件
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 添加课程到购物车
  const addToCart = (course) => {
    // 检查该课程是否已在购物车中
    const existingItemIndex = cart.findIndex(item => item.title === course.title);
    if (existingItemIndex > -1) {
      // 如果已在购物车中，增加数量
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += course.quantity;
      setCart(updatedCart);
    } else {
      // 如果不在购物车中，添加新课程
      setCart(prevCart => [...prevCart, course]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 自定义 hook，用于在组件中更方便地访问购物车上下文
export const useCart = () => {
  return useContext(CartContext);
};
