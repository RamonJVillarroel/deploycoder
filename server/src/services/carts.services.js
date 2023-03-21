const CartsDAO = require('../models/daos/carts.dao');
const { STATUS } = require('../utils/api.utils');
const { HTTPError } = require('../utils/errors.utils');
const { sendEmail } = require('../utils/email.utils');
const { createOrder } = require('../services/orders.services');
const {sendWhatsapp} = require('../utils/whatsapp.utils');
const {sendSMS} = require('../utils/sms.utils')

const cartsDAO = new CartsDAO()


const createCart = async () => {
   return await cartsDAO.save()
}

const deleteCart = async (id) => {
   return await cartsDAO.delete(id)
}

const getProductsFromCart = async (id) => {
  return await cartsDAO.getProducts(id)
}

const saveProductToCart = async (cartId, prodId) => {
    return await cartsDAO.saveProduct(cartId, prodId)
}


const deleteProductFromCart = async (cartId, prodId) => {
    return await cartsDAO.deleteProduct(cartId, prodId)
}

const checkoutCart = async (cartId, user) => {
    const products = await cartsDAO.getProducts(cartId)
  
    if (products.length < 1) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'debe agregar un producto')
    }
  
    await cartsDAO.emptyCart(cartId)
  

    const totalCost = products.reduce((acc, item) => acc + item.product.price * item.qty, 0)

    const order = {
      products,
      user,
      totalCost
    }
    const newOrder = await createOrder(order)
  
  const emailOptions = {
  subject: 'orden confirmada',
  html: `
    <p>nueva orden</p>
    <p>Detalles:</p>
    <ul>
      <li>Nombre: ${user.email}</li>
      <li>direccion: ${user.address}</li>
      <li>Productos:</li>
      <ul>
        ${products.map((product) => `<li><span>${product.product.title} - Producto ID: '${product.product._id}</span><li><span>cantidad: ${product.qty} - precio: ${products.map((product) => `${product.product.price}`)}</span></li>`).join('')}
      </ul>
      <li><span>Total: $${totalCost}</li></span>
    </ul>
  `
};

    await sendEmail(emailOptions)
    const productsList =`${products.map((product) => `<li><span>${product.product.title} - Producto ID: '${product.product._id}</span><li><span>cantidad: ${product.qty} - precio: ${products.map((product) => `${product.product.price}`)}</span></li>`).join('')}`
      .join('\n')

  const text = `nueva orden de  ${user.name} - (${user.email})${productsList}`
  sendWhatsapp({
    message: text
  })

  sendSMS({
    to: user.phone,
    message: `Orden en proceso`
  })
    return newOrder
  }

module.exports = {
    createCart,
    deleteCart,
    getProductsFromCart,
    saveProductToCart,
    deleteProductFromCart,
    checkoutCart
}
