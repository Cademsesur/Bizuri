# Dashboard de Traductions Bizuri

Dashboard pour gérer les traductions de la landing page Bizuri.

## Configuration

### Variables d'environnement requises

Pour que le dashboard fonctionne correctement, vous devez configurer :

```env
LANDING_API_URL=https://bizuri.vercel.app
```

### Configuration locale

1. Copiez `.env.example` vers `.env.local`
2. Ajustez l'URL selon vos besoins

### Configuration sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Ouvrez votre projet dashboard
3. **Settings > Environment Variables**
4. Ajoutez :
   - **Name:** `LANDING_API_URL`
   - **Value:** `https://bizuri.vercel.app`
   - **Environments:** Production, Preview, Development
5. Redéployez le projet

## Démarrage local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

Le dashboard sera accessible sur http://localhost:3001 (ou le port configuré).

## Fonctionnalités

- ✅ Interface responsive (mobile, tablette, desktop)
- ✅ Thème Bizuri avec mode light/dark
- ✅ Recherche par clé et valeur
- ✅ Sauvegarde automatique
- ✅ Effets glassmorphism
- ✅ Communication via API avec la landing page
