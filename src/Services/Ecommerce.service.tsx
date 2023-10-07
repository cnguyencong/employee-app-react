export const getCartTotal = (cartItems: any) => {
    var total = 0;
    var items = 0;
    for (var i = 0; i < cartItems.length; i++) {
        items = cartItems[i].qty * cartItems[i].price
        total = total + items;
    }
    return total;
}

export const getBrands = (products: any) => {

    var uniqueBrands: any = [];
    products.forEach((product: any, index: number) => {
        if (product.tags) {
            product.tags.forEach((tag: any) => {
                if (uniqueBrands.indexOf(tag) === -1) {
                    uniqueBrands.push(tag);
                }
            })
        }
    })
    return uniqueBrands;
}

export const getColors = (products: any) => {
    var uniqueColors: any = [];
    products.forEach((product: any, index: number) => {
        if (product.colors) {
            product.colors.forEach((color: any) => {
                if (uniqueColors.indexOf(color) === -1) {
                    uniqueColors.push(color);
                }
            })
        }
    })
    return uniqueColors;
}

export const getGender = (products: any) => {
    var uniqueGender: any = [];
    products.forEach((product: any, index: number) => {
        if (product.name) {
            let name = product.name;
            if (uniqueGender.indexOf(name) === -1) {
                uniqueGender.push(name);
            }
        }
    })
    return uniqueGender;
}

export const getMinMaxPrice = (products: any) => {

    let min = 100, max = 1000;

    products.forEach((product: any, index: number) => {
        let v = product.price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return { 'min': min, 'max': max };
}

export const getVisibleproducts = (data: any, { brand, color, value, sortBy, searchBy, category }: any) => {
    return data.filter((product: any) => {

        let brandMatch;
        if (product.tags)
            brandMatch = product.tags.some((tag: any) => brand.includes(tag))
        else
            brandMatch = true;

        let colorMatch;
        if (color && product.colors) {
            colorMatch = product.colors.includes(color)
        } else {
            colorMatch = true;
        }

        let CategoryMatch;
        if (category && product.name) {
            CategoryMatch = product.name.includes(category)
        } else {
            CategoryMatch = true;
        }

        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        const searchByName = (product.name.toLowerCase().indexOf(searchBy) > -1)

        return brandMatch && colorMatch && startPriceMatch && endPriceMatch && searchByName && CategoryMatch;
    }).sort((product1: any, product2: any) => {

        if (sortBy === 'HighestPrices') {
            return product2.price < product1.price ? -1 : 1;
        }else if (sortBy === 'LowestPrices') {
            return product2.price > product1.price ? -1 : 1;
        }else {
            return product2.price !== product1.price ? 1 : 1;
        }
    });

}