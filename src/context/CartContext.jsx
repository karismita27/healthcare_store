import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { readJSON, writeJSON } from "../utils/storage.js";

const CART_KEY = "hc_cart";

const CartContext = createContext(null);

const initialState = {
  items: [], // { id, name, price, mrp, image, qty, category, brand }
  coupon: null, // { code, percent }
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD": {
      const { item, qty = 1 } = action.payload;
      const existing = state.items.find((x) => x.id === item.id);
      const items = existing
        ? state.items.map((x) => (x.id === item.id ? { ...x, qty: x.qty + qty } : x))
        : [...state.items, { ...item, qty }];
      return { ...state, items };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const safeQty = Math.max(1, Number(qty || 1));
      const items = state.items.map((x) => (x.id === id ? { ...x, qty: safeQty } : x));
      return { ...state, items };
    }
    case "REMOVE": {
      const id = action.payload;
      const items = state.items.filter((x) => x.id !== id);
      return { ...state, items };
    }
    case "CLEAR":
      return { ...state, items: [], coupon: null };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload };
    case "REMOVE_COUPON":
      return { ...state, coupon: null };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // load from localStorage on mount
  useEffect(() => {
    const stored = readJSON(CART_KEY, initialState);
    dispatch({ type: "LOAD", payload: stored });
  }, []);

  // persist
  useEffect(() => {
    writeJSON(CART_KEY, state);
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [state.items],
  );

  const discount = useMemo(() => {
    if (!state.coupon) return 0;
    return Math.round((subtotal * state.coupon.percent) / 100);
  }, [subtotal, state.coupon]);

  const total = Math.max(0, subtotal - discount);

  const count = useMemo(() => state.items.reduce((sum, it) => sum + it.qty, 0), [state.items]);

  function addToCart(item, qty = 1) {
    dispatch({ type: "ADD", payload: { item, qty } });
  }

  function setQty(id, qty) {
    dispatch({ type: "SET_QTY", payload: { id, qty } });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  function applyCoupon(coupon) {
    dispatch({ type: "APPLY_COUPON", payload: coupon });
  }

  function removeCoupon() {
    dispatch({ type: "REMOVE_COUPON" });
  }

  const value = useMemo(
    () => ({
      items: state.items,
      coupon: state.coupon,
      subtotal,
      discount,
      total,
      count,
      addToCart,
      setQty,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon,
    }),
    [state.items, state.coupon, subtotal, discount, total, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
