import app from './app.js';
import './database/index.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running at ${port} 🚀`);
});
