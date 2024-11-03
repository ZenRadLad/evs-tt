## Technologies Utilisées

- **Angular 18**
  - Standalone Components
  - Zoneless Rendering
  - Signals
  - Lazy Loading
- **NgRx Signal Store**
  - Entity State Management
  - rxMethod pour la gestion des effets
- **SCSS**
  - Dark Theme
  - Responsive Design

# Instructions Docker

## Prérequis

- Docker installé sur votre machine
- Docker Compose installé sur votre machine

### Installation des dépendances

1. Installation des dépendances frontend :

```bash
cd frontend
npm install
```

2. Installation des dépendances backend :

```bash
cd backend
npm install
```

### Lancement de l'application

À la racine du projet, lancer :

```bash
docker compose up --build
```

## Accès à l'application

Une fois les conteneurs démarrés :

- Frontend : http://localhost:80
- Backend : http://localhost:3000/api/items
