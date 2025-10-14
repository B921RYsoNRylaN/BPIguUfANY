// 代码生成时间: 2025-10-14 23:51:35
const { NextResponse } = require('next/server');

// 购物车类
class ShoppingCart {
  // 构造函数，初始化购物车内容
  constructor() {
    this.items = [];
  }

  // 添加商品到购物车
  addItem(product) {
    // 检查商品是否已存在于购物车中
    const existingProduct = this.items.find(item => item.id === product.id);
    if (existingProduct) {
      // 如果商品已存在，则增加其数量
      existingProduct.quantity += product.quantity;
    } else {
      // 如果商品不存在，则添加到购物车
      this.items.push(product);
    }
  }

  // 从购物车中移除商品
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  // 获取购物车中的商品列表
  getItems() {
    return this.items;
  }

  // 清空购物车
  clear() {
    this.items = [];
  }
}

// 购物车状态管理
const cart = new ShoppingCart();

// API端点，用于处理购物车相关请求
async function shoppingCartHandler(request) {
  const { method, url } = request;
  let response;
  switch (method) {
    // POST请求，添加商品到购物车
    case 'POST': {
      try {
        const product = await request.json();
        cart.addItem(product);
        response = new NextResponse('Product added to cart', { status: 200 });
      } catch (error) {
        response = new NextResponse('Error adding product to cart', { status: 500 });
      }
      break;
    }
    // DELETE请求，从购物车中移除商品
    case 'DELETE': {
      try {
        const productId = new URL(url).searchParams.get('id');
        cart.removeItem(productId);
        response = new NextResponse('Product removed from cart', { status: 200 });
      } catch (error) {
        response = new NextResponse('Error removing product from cart', { status: 500 });
      }
      break;
    }
    // GET请求，获取购物车中的商品列表
    case 'GET': {
      response = new NextResponse(JSON.stringify(cart.getItems()), { status: 200, headers: { 'Content-Type': 'application/json' } });
      break;
    }
    // 其他请求，返回405 Method Not Allowed
    default:
      response = new NextResponse('Method not allowed', { status: 405 });
  }
  return response;
}

// 导出API端点
export const config = { matcher: '/api/cart/*' };
export default shoppingCartHandler;