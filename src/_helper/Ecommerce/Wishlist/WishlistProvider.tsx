import React, { useEffect, useState } from 'react';
import Context from './index';

const WishListProvider = (props: any) => {
    const [wishlist, setWishList] = useState<any>([]);

    useEffect(() => {
    }, [setWishList]);

    const addToWishList = (product: any) => {
        const productId = product.id;
        if (wishlist.findIndex((product: any) => product.id === productId) !== -1) {
            const wishlists = wishlist.reduce((wishAcc: any, product: any) => {
                if (product.id === productId) {
                    wishAcc.push({
                        ...product,
                    });
                } else {
                    wishAcc.push(product);
                }
                return wishAcc;
            }, []);
            return setWishList(wishlists);
        }

        setWishList((prev: any) => [...prev, { ...product }]);
    };

    const removeFromWhishList = (productId: string) => {
        setWishList(wishlist.filter((wish: any) => wish.id !== productId));
    };
    return (
        <Context.Provider
            value={{
                props,
                wishlist,
                addToWishList: addToWishList,
                removeFromWhishList: removeFromWhishList,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default WishListProvider;
