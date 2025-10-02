# Configuration Supabase pour Bizuri

## Étapes de configuration :

### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte et un nouveau projet
3. Notez votre `URL` et `service_role key`

### 2. Créer la table de traductions
Exécutez cette requête SQL dans l'éditeur Supabase :

```sql
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  fr_data JSONB NOT NULL,
  en_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_translations_updated_at ON translations(updated_at DESC);

-- Insérer les données initiales depuis les fichiers JSON
-- (À adapter avec vos vraies données)
INSERT INTO translations (fr_data, en_data) VALUES (
  '{}',  -- Remplacez par le contenu de fr.json
  '{}'   -- Remplacez par le contenu de en.json
);
```

### 3. Configurer les variables d'environnement

#### Pour la landing page :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Pour le dashboard :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
LANDING_API_URL=https://bizuri.vercel.app
```

### 4. Configuration sur Vercel
Ajoutez ces variables dans les deux projets Vercel :
- Settings > Environment Variables
- Ajoutez toutes les variables nécessaires
- Redéployez les projets

### 5. Migration des données existantes
Une fois configuré, vos traductions actuelles dans `fr.json` et `en.json` seront utilisées comme fallback si Supabase n'a pas de données.
