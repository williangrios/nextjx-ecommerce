import { ProductInterface } from "@/interfaces"
import { createSlice } from "@reduxjs/toolkit"

export interface CartState{
    cartItems: ProductInterface[],
    cartTotal: number
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotal: 0
    } as CartState,
    reducers: {
        AddProductToCart: (state, action: {
            type: string,
            payload: ProductInterface
        })=> {
            state.cartItems.push(action.payload)
        },
        RemoveProductToCart: (state, action: {
            type: string,
            payload: ProductInterface
        })=> {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
        },
        EditProductInCart: (state, action: {
            type: string,
            payload: ProductInterface
        })=> {
            state.cartItems =state.cartItems.map((item) => 
                item._id === action.payload._id ? action.payload: item
            )
            state.cartItems.push(action.payload)
        },
        ClearCart: (state) => {
            state.cartItems = []
        }
    }
})

export const {AddProductToCart, RemoveProductToCart, EditProductInCart, ClearCart} = cartSlice.actions