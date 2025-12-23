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
    name: "Nike Slim Shirt",
    slug: "nike-slim-shirt",
    category: "Shirts",
    image: "/images/item_1.png",
    price: 120,
    countInStock: 8,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "High quality Nike slim-fit shirt"
  },
  {
    name: "Puma Classic Shirt",
    slug: "puma-classic-shirt",
    category: "Shirts",
    image: "/images/item_2.png",
    price: 170,
    countInStock: 6,
    brand: "Puma",
    rating: 4.2,
    numReviews: 20,
    description: "Premium Puma casual shirt"
  },
  {
    name: "Adidas Slim Pants",
    slug: "adidas-slim-pants",
    category: "Pants",
    image: "/images/item_3.png",
    price: 80,
    countInStock: 5,
    brand: "Adidas",
    rating: 3.5,
    numReviews: 7,
    description: "Comfortable Adidas slim-fit pants"
  },
  {
    name: "Nike Sports Pants",
    slug: "nike-sports-pants",
    category: "Pants",
    image: "/images/item_4.png",
    price: 95,
    countInStock: 3,
    brand: "Nike",
    rating: 4.0,
    numReviews: 12,
    description: "Lightweight Nike sports pants"
  },
  {
    name: "Puma Jogger Pants",
    slug: "puma-jogger-pants",
    category: "Pants",
    image: "/images/item_5.png",
    price: 110,
    countInStock: 10,
    brand: "Puma",
    rating: 4.6,
    numReviews: 18,
    description: "Stylish Puma jogger pants"
  },
  {
    name: "Adidas Training Shirt",
    slug: "adidas-training-shirt",
    category: "Shirts",
    image: "/images/item_6.png",
    price: 140,
    countInStock: 7,
    brand: "Adidas",
    rating: 4.8,
    numReviews: 25,
    description: "Breathable Adidas performance shirt"
  },
  {
    name: "Nike Training Shirt",
    slug: "nike-training-shirt",
    category: "Shirts",
    image: "/images/item_7.png",
    price: 130,
    countInStock: 4,
    brand: "Nike",
    rating: 4.3,
    numReviews: 14,
    description: "Nike shirt designed for training"
  },
  {
    name: "Puma Athletic Shorts",
    slug: "puma-athletic-shorts",
    category: "Shorts",
    image: "/images/item_8.png",
    price: 70,
    countInStock: 12,
    brand: "Puma",
    rating: 4.4,
    numReviews: 9,
    description: "Comfortable Puma athletic shorts"
  }
]

}

module.exports = data;