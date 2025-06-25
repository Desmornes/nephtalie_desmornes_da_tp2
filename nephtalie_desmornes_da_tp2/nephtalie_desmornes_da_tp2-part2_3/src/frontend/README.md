# DanseKonnect - Plateforme de danse en ligne

DanseKonnect est une application web Vue.js qui permet aux danseurs de tous niveaux de découvrir des cours, des styles de danse et des professeurs. La plateforme facilite l'apprentissage de la danse et la connexion avec une communauté mondiale de danseurs.

## Comment lancer l'application?

### Démarrage rapide

1. Assurez-vous d'avoir Node.js et npm installés
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run serve`
4. Accédez à l'application sur [http://localhost:8080](http://localhost:8080)

## Fonctionnalités

- Découverte de cours de danse dans différents styles
- Exploration des styles de danse
- Profils de professeurs qualifiés
- Témoignages d'utilisateurs
- FAQ et support
- Système d'authentification (connexion/inscription)
- Interface responsive pour mobile et desktop

## Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **Vue Router** - Routage officiel pour Vue.js
- **Bootstrap 5** - Framework CSS pour le design responsive
- **Axios** - Client HTTP pour les requêtes API
- **Font Awesome** - Bibliothèque d'icônes

## Structure du projet

```
dansekonnect/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── images/
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── HeroAccueil.vue
│   │   ├── Cours.vue
│   │   ├── StylesDeDanse.vue
│   │   ├── Professeurs.vue
│   │   ├── Temoignages.vue
│   │   ├── FAQ.vue
│   │   ├── Footer.vue
│   │   ├── LoginModal.vue
│   │   └── SignupModal.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Cours.vue
│   │   ├── Styles.vue
│   │   ├── Professeurs.vue
│   │   └── FAQ.vue
│   ├── services/
│   │   └── api.js
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

## Installation et configuration

### Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm (v6.0.0 ou supérieur)

### Installation

1. Clonez le dépôt
   ```bash
   git clone https://github.com/votre-utilisateur/dansekonnect.git
   cd dansekonnect
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Configuration de l'API (optionnel)
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez l'URL de votre API backend:
     ```
     VUE_APP_API_URL=http://votre-api-backend.com/api
     ```

### Lancement en développement

Pour lancer l'application en mode développement avec rechargement à chaud (hot-reload) :

```bash
npm run serve
```

L'application sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).

Si vous souhaitez spécifier un port différent :

```bash
npm run serve -- --port 3000
```

### Compilation pour la production

Pour compiler et minifier l'application pour la production :

```bash
npm run build
```

Les fichiers compilés seront générés dans le dossier `dist/`.

### Déploiement de l'application

Après avoir exécuté `npm run build`, vous pouvez déployer le contenu du dossier `dist/` sur n'importe quel serveur web statique :

1. Copiez tous les fichiers du dossier `dist/` vers votre serveur web
2. Configurez votre serveur pour rediriger toutes les requêtes vers `index.html` (nécessaire pour le routage Vue)

Exemple de configuration pour Apache (.htaccess) :
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Vérification du code

Pour lancer le linter et vérifier la qualité du code :

```bash
npm run lint
```

#### Configuration ESLint

Le projet utilise ESLint pour la vérification du code. La configuration se trouve dans le fichier `.eslintrc.js` à la racine du projet. Si vous rencontrez des erreurs liées à ESLint, assurez-vous que ce fichier existe et est correctement configuré.

### Troubleshooting

Si vous rencontrez des problèmes lors du lancement de l'application :

1. **Erreur "Module not found"** : Assurez-vous d'avoir exécuté `npm install` pour installer toutes les dépendances.

2. **Problèmes de port** : Si le port 8080 est déjà utilisé, Vue CLI utilisera automatiquement un autre port. Vérifiez la sortie de la console pour l'URL correcte.

3. **Erreurs de compilation** : Vérifiez la console pour les erreurs spécifiques. La plupart des erreurs de syntaxe seront affichées avec le fichier et la ligne concernés.

4. **Page blanche après déploiement** : Assurez-vous que votre serveur est configuré pour gérer le routage côté client (voir la configuration .htaccess ci-dessus).

5. **Problèmes d'API** : Si l'application ne peut pas se connecter à l'API backend, vérifiez que l'URL dans le fichier `.env` est correcte et que le serveur backend est en cours d'exécution.

## Intégration avec le backend

L'application est conçue pour fonctionner avec une API REST Symfony. Les services API sont configurés dans `src/services/api.js`. Les principaux endpoints utilisés sont:

- `/api/courses` - Gestion des cours
- `/api/styles` - Gestion des styles de danse
- `/api/teachers` - Gestion des professeurs
- `/api/testimonials` - Gestion des témoignages
- `/api/faq` - Gestion des FAQ
- `/api/login` et `/api/register` - Authentification

## Personnalisation

### Thème et couleurs

Les couleurs principales de l'application peuvent être modifiées dans le fichier `src/assets/css/style.css`. La couleur primaire actuelle est un violet (#8a2be2).

### Composants

Tous les composants sont modulaires et peuvent être facilement personnalisés ou étendus selon les besoins.

## Fonctionnalités à venir

- Système de notation des cours
- Messagerie entre élèves et professeurs
- Calendrier d'événements de danse
- Fonctionnalités de communauté (forum, groupes)
- Intégration de paiement pour les cours premium

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
