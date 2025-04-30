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