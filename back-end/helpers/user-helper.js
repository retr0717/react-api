const { Products } = require('../model/model');

module.exports = {
    randomItems: async () => {
        const products = await Products.find();

        arr = [];

        for (let i = 0; i < 5; i++) {
            product = products[Math.floor(Math.random() * products.length)];
            if (!arr.some(item => item === product))
                arr.push(product);
        }

        return arr;
    }
}