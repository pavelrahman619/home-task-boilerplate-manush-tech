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