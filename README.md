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
    items: [
            {productId:objectId, productName: string, price:number, category:string, quantity:number, productSku:number, quantity:number}
          ]
    date: time
    StripeToken: string
    creditCard: string("visa")
    revenue: number
    user: fname
          lname
          email
          username
          street
          city
    state: string

  UnitSale
    sku:number
    name:string
    price:number
    category:string


NOSQL

Need to view previous orders. These have a list of products and a user.
Need to see Totals for
  -all revenue ever
  -number of units sold ever
  -total number of orders ever
  -total unique customers
  -total unique products
  -total unique categories
  -total unique states withn an order


Need to break down total Revenue
  by product
  by state
  by category