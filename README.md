Things to install:
Laragon (for terminal only)
NVM (for node or use Laragon instead). Node v22.15.0 is used
Docker
Postgresql
Postman (for api test)

Things to run:
Frontend
Backend
Docker
Database

Running frontend:
Need latest Node version

npm install cross-env --save-dev // if not done
change package.json to "dev": "cross-env NODE_ENV=development vite --port 3000 --mode development --host",

npm install
npm run dev


Running backend:

npm install
npm run prisma:generate
npm run migrate:dev
npm run seed:run
npm run dev


Running Docker:
run docker compose

Running database:
setup and run postgresql in local


For Prisma Studio
npx prisma studio



For running in postman
// desktop app needed   

* POST 

http://localhost:4000/api/v1/auth/login

* Headers:

Content-Type:application/json

* Body(select raw)

{
  "identifier": "abir@manush.tech",
  "password": "123456"
}



Structure for backend

backend/
├── src/
│   ├── app.module.ts
│   ├── product/
│   │   ├── dto/
│   │   │   └── create-product.dto.ts
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   └── prisma/
│       └── prisma.service.ts
├── prisma/
│   └── schema.prisma
└── main.ts


Structure for frontend

frontend/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx
│   │   └── ProductForm.jsx
│   ├── pages/
│   │   └── ProductManagement.jsx
│   ├── services/
│   │   └── productService.js
│   ├── App.jsx
│   └── main.jsx


Testing products in Postman

POST http://localhost:4000/api/v1/promotion

Body(JSON)

{
  "name": "Sample Product",
  "description": "This is a test product.",
  "price": 99.99,
  "weight": 1.5
}

Get all products

GET http://localhost:4000/products


Testing orders in Postman

POST http://localhost:4000/api/v1/order

Body(JSON)
{
  "customerName": "Alice",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}