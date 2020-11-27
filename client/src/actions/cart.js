import { ADD_TO_CART, REMOVE_FROM_CART, DECREMENT_CART_ITEM, INCREMENT_CART_ITEM, CLEAR_CART } from "./types"

const loadCart = () => {
       return JSON.parse(localStorage.getItem("cartList") || "[]")
}

let cartList = []

export const addToCart = ({ _id, image, name, price, quantity }) => {
    return (dispatch) => {
        const cartItem = {
            itemId: _id,
            itemImg: image,
            itemName: name,
            itemPrice: price,
            itemQuantity: 1,
            itemTotal: 1
        }

        if(quantity !== undefined){
            cartItem.itemQuantity = parseInt(quantity)
        } else {
            cartItem.itemQuantity = 1
        }
        cartItem.itemTotal = cartItem.itemPrice * cartItem.itemQuantity

        cartList = loadCart() // load cart to get most recent cart items
        cartList.push(cartItem) // add new cart item to the list
        localStorage.setItem("cartList", JSON.stringify(cartList)) // persist change to local storage
        dispatch({ // then dispatch latest change to the cart state
            type: ADD_TO_CART,
            payload: cartItem
        })
    }
}   

export const removeFromCart = (id) => {
    return (dispatch) => {
        cartList = loadCart() // load cart to get most recent cart items
        cartList = cartList.filter((cartItem) => cartItem.itemId !== id) // remove cart item from memory
        localStorage.setItem('cartList', JSON.stringify(cartList)) //persist change to localstorage
        dispatch({  // then dispatch latest change to cart state
            type: REMOVE_FROM_CART,
            payload: id
        })
    }
}

export const incrementCartItem = (id) => {
    return (dispatch) => {
        cartList = loadCart() // load cart to get most recent cart items
        let cartUpdates = {} // object to retrieve cart updates
        cartList = cartList.map((cartItem) => {  // update cart in memory
            if(cartItem.itemId === id){
                cartUpdates = {
                    itemQuantity: cartItem.itemQuantity + 1,
                    itemTotal: 1
                }
                cartUpdates.itemTotal = cartUpdates.itemQuantity * cartItem.itemPrice
                return {
                    ...cartItem,
                    ...cartUpdates
                }
            } else {
                return cartItem
            }
        })
        localStorage.setItem('cartList', JSON.stringify(cartList))
        dispatch({
            type: INCREMENT_CART_ITEM,
            payload:{
                cartUpdates,
                id
            }
        })
    }
}

export const decrementCartItem = (id) => {
    return (dispatch) => {
        cartList = loadCart() // load cart to get most recent cart items
        let cartUpdates = {} // object to retrieve cart updates
        cartList = cartList.map((cartItem) => {  // update cart in memory
            if(cartItem.itemId === id){
                cartUpdates = {
                    itemQuantity: cartItem.itemQuantity - 1,
                    itemTotal: 1
                }
                cartUpdates.itemTotal = cartUpdates.itemQuantity * cartItem.itemPrice
                return {
                    ...cartItem,
                    ...cartUpdates
                }
            } else {
                return cartItem
            }
        })
        localStorage.setItem('cartList', JSON.stringify(cartList))
        dispatch({
            type: DECREMENT_CART_ITEM,
            payload: {
                 cartUpdates,
                 id
            }
        })

    }
}

export const clearCart = () => {
    return (dispatch) => {
        localStorage.removeItem('cartList')
        dispatch({
            type: CLEAR_CART
        })
    }
}