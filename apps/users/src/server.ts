import express from 'express';
import cors from 'cors';
import { postgraphile } from 'postgraphile';

const app = express();

// Enable CORS
app.use(cors());

// Add the main GraphQL endpoint
app.use(
  postgraphile('postgres://postgres:david2000@localhost:5432/users', 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
