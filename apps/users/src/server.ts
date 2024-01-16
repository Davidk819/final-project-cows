import express from 'express';
import cors from 'cors';
import { postgraphile } from 'postgraphile';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const url = process.env.DB_PASSWORD_USERS 
const secretKey = process.env.JWT_SECRET
// Enable CORS
app.use(cors());

// Add the main GraphQL endpoint
app.use(
  postgraphile(url, 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    jwtSecret: secretKey,
    jwtPgTypeIdentifier: 'public.jwt_token',

  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
