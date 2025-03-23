# Solvro backend

## Development

```bash
pnpm dev
```

### Database

```bash
docker compose up -d
```

#### Migration

```bash
node ace migration:fresh
```

#### Schema

```mermaid
classDiagram
direction BT
class cocktail_ingredients {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text measure
   integer cocktail_id
   integer ingredient_id
   integer id
}
class cocktail_tags {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   integer cocktail_id
   integer tag_id
   integer id
}
class cocktails {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text name
   text category
   text glass
   text instructions
   text image_url
   boolean is_alcoholic
   integer id
}
class ingredients {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text name
   text description
   boolean is_alcoholic
   text type
   integer percentage
   text image_url
   integer id
}
class tags {
   timestamp with time zone created_at
   timestamp with time zone updated_at
   text name
   integer id
}

cocktail_tags  -->  tags : tag_id
cocktail_tags  -->  cocktails : cocktail_id
cocktail_ingredients  -->  cocktails : cocktail_id
cocktail_ingredients  -->  ingredients : ingredient_id
```
