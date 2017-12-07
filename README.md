# project_mimirs_market
A Viking eCommerce store for Thunder Gods that like to buy "Antique Wooden Pizzas"


SQL Sequelize Models
  Product
    name:String
    sku:Integer
    description:string
    categoryId: foreign key, int
    price:number

  Category
    name:string

  User
    username:string
    email:string


NoSQL mongoose models
  Order
    items: Array of Product Ids
    date:
    revenue:
    customerId:

  

added at database seed
  State
    name

  Product
    name:String
    sku:Integer
    description:string
    category: string
    price:number
    timestamp:time


  User
    fname
    lname
    email
    username
    street
    city
    stateId
