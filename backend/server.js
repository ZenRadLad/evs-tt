const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
  {
    name: "Configuration Signal Store NGRX",
    status: "en cours"
  },
  {
    name: "Mise en place Standalone Components",
    status: "validé"
  },
  {
    name: "Implémentation Lazy Loading Routes",
    status: "en cours"
  },
  {
    name: "Tests Unitaires Services",
    status: "refusé"
  },
  {
    name: "Configuration Server-Side Rendering",
    status: "en cours"
  },
  {
    name: "Optimisation Change Detection",
    status: "validé"
  },
  {
    name: "Intégration Reactive Forms",
    status: "en cours"
  },
  {
    name: "Configuration ESLint & Prettier",
    status: "validé"
  }
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});