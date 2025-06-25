# Comment lancer l'application DanseKonnect

Ce document fournit des instructions rapides pour lancer l'application DanseKonnect.

## Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm (v6.0.0 ou supérieur)

## Démarrage rapide

1. Clonez le dépôt (si ce n'est pas déjà fait)
   ```bash
   git clone https://github.com/votre-utilisateur/dansekonnect.git
   cd dansekonnect
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Lancez l'application en mode développement
   ```bash
   npm run serve
   ```

4. Accédez à l'application dans votre navigateur
   [http://localhost:8080](http://localhost:8080)

## Autres commandes utiles

### Spécifier un port différent
```bash
npm run serve -- --port 3000
```

### Compiler pour la production
```bash
npm run build
```

### Vérifier le code avec le linter
```bash
npm run lint
```

## Problèmes courants

- **Erreur "Module not found"** : Exécutez `npm install` pour installer toutes les dépendances.
- **Port déjà utilisé** : Vue CLI utilisera automatiquement un autre port. Vérifiez la console.
- **Page blanche** : Vérifiez la console du navigateur pour les erreurs.
- **Erreur ESLint "No ESLint configuration found"** : Assurez-vous que le fichier `.eslintrc.js` existe à la racine du projet. S'il est manquant, créez-le avec une configuration appropriée pour Vue.js.

Pour des instructions plus détaillées, consultez le fichier [README.md](README.md).
