import React, { useEffect, useState } from 'react';
import Context from './index';

const CartProvider = (props: any) => {
    const [cart, setCart] = useState<any>([]);
    useEffect(() => {
    }, [setCart]);

    const addToCart = (product: any, qty: any) => {
        const productId = product.id;
        if (cart.findIndex((product: any) => product.id === productId) !== -1) {
            const carts = cart.reduce((cartAcc: any, product: any) => {
                if (product.id === productId) {
                    cartAcc.push({
                        ...product,
                        qty: product.qty + 1,
                        sum: product.price * (product.qty + 1),
                    });
                } else {
                    cartAcc.push(product);
                }
                return cartAcc;
            }, []);

            return setCart(carts);
        }
        setCart((prev: any) => [
            ...prev,
            { ...product, qty: qty, sum: product.price * product.qty },
        ]);
    };

    const decrementQty = (productId: string) => {
        if (cart.findIndex((product: any) => product.id === productId) !== -1) {
            const carts = cart.reduce((cartAcc: any, product: any) => {
                if (product.id === productId) {
                    cartAcc.push({
                        ...product,
                        qty: product.qty - 1,
                        sum: product.price * (product.qty - 1),
                    });
                } else {
                    cartAcc.push(product);
                }
                return cartAcc;
            }, []);
            return setCart(carts);
        }
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter((item: any) => item.id !== productId));
    };

    return (
        <Context.Provider
            value={{
                ...props,
                cart,
                addToCart: addToCart,
                decrementQty: decrementQty,
                removeFromCart: removeFromCart,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default CartProvider;
