const bcrypt = require('bcryptjs')
const data = {
    users: [{

        name: "Blessed",
        email: "kennethsiden@gmail.com",
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: "Daniel",
        email: "siden@gmail.com",
        password: bcrypt.hashSync('1233r93=sjs'),
        isAdmin: false,
    }
       
    ],

    products : [
        {
    
            name: "Nike",
            slug: "nike-slim-shirt",
            category: "Shirts",
            image: "/images/product_img1.jpg",
            price:120,
            countInStock:0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality'

        },
        { 
          
            name: "Puma",
            slug: "puma-slim-shirt",
            category: "Shirts",
            image: "/images/product_img2.jpg",
            price:170,
            countInStock:6,
            brand: 'Nike',
            rating: 7.5,
            numReviews: 20,
            description: 'High Quality'

        },
        {
           
            name: "Adidas",
            slug: "adidas-slim-shirt",
            category: "Pants",
            image:"/images/product_img3.jpg",
            price:80,
            countInStock:5,
            brand: 'Puma',
            rating: 2.5,
            numReviews: 7,
            description: 'High Quality'

        },
        {
          
            name: "Lebron",
            slug: "lebron-slim-shirt",
            category: "Pants",
            image:"/images/product_img4.jpg",
            price:80,
            countInStock:3,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'High Quality'

        },
    ]
}

module.exports = data;