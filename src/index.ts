// src/index.ts
import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express server!');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
