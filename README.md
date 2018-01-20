# Mimirs Market

An eCommerce store for Viking thunder Gods that like to buy "Antique Wooden Pizzas".

Mimir's Market runs in Node.js, using Express.js for the server, Handlebars templates for the views, and Mongoose and Sequelize for interacting with MongoDB and Postgres databases respectively.

![welcome screenshot](public/welcome.png)

Mimirs Market is an eCommerce store that lets users browse products by searching or category, view their shopping cart, view past orders, and view analytics of all orders. When you're ready to checkout, you can use [Stripe's API](https://stripe.com/docs/api) to make a fake purchase.

The Products page lets shoppers search by name, category, and price. They can also sort by name, price, or the date the product was created.

![products screenshot](public/products.png)

The Admin page lets you see information on the latest orders, and gives you a link to each order.

![orders screenshot](public/orders_index.png)

The Analytics page gives a rundown on the aggregate totals for revnue, units sold, individual transactions, etc, as well as total revenue broken down by state, product category, and individual products.

![orders screenshot](public/analytics.png)

To run this project locally, you'll need to have Node.js installed. You'll also need to make sure you have both MongoDB and Postgres installed and running on your local machine.You'll also need two API keys from stripe, a secret one and a test one. Save them as STRIPE_PK and STRIPE_SK in your environment variables. You'll need to modify the configuration files in the Config folder to give the project access to your postgres database.

Once your setup is complete, run "npm install" in the directory's terminal to install dependencies, "npm run seed" to seed your databases, and finally "npm start" to start up the server. In your browser you can then navigate to "http://localhost:3000" and start shopping!
