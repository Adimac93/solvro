/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Cocktail from '#models/cocktail'
import Ingredient from '#models/ingredient'
import router from '@adonisjs/core/services/router'
import data from '../data/data.json' with { type: 'json' }
import CocktailIngredient from '#models/cocktail_ingredient'
import Tag from '#models/tag'
import CocktailTag from '#models/cocktail_tag'

async function seed() {
    for (const cocktail of data) {
        await Cocktail.create({
            id: cocktail.id,
            name: cocktail.name,
            category: cocktail.category,
            instructions: cocktail.instructions,
            imageUrl: cocktail.imageUrl,
            isAlcoholic: Boolean(cocktail.alcoholic),
            glass: cocktail.glass
        })
        for (const tag of cocktail.tags ?? []) {
            let dbTag = await Tag.findBy('name', tag)
            if (dbTag == null) {
                dbTag = await Tag.create({ name: tag })
            }
            await CocktailTag.create({
                cocktailId: cocktail.id,
                tagId: dbTag.id
            })
        }
        for (const ingredient of cocktail.ingredients) {
            const dbIngredient = await Ingredient.findBy('id', ingredient.id)
            if (dbIngredient == null) {
                await Ingredient.create({
                    id: ingredient.id,
                    name: ingredient.name,
                    description: ingredient.description ?? undefined,
                    isAlcoholic: Boolean(ingredient.alcohol),
                    type: ingredient.type ?? undefined,
                    percentage: ingredient.percentage ?? undefined,
                    imageUrl: ingredient.imageUrl ?? undefined,
                })
            }
            await CocktailIngredient.create({
                cocktailId: cocktail.id,
                ingredientId: ingredient.id,
                measure: 'measure' in ingredient ? ingredient.measure : undefined
            })
        }
    }
}

router.get('/', async () => {
    await seed()
    return { message: 'Data seeded' }
})

router.get('/cocktails', async ({ request, response }) => {
    const cocktails = await Cocktail.all()

    response.status(200).send(cocktails)
})
router.post('/cocktails', async ({ request, response }) => {
    const { name, isAlcoholic, imageUrl, instructions } = request.body()
    const cocktail = await Cocktail.create({ name, isAlcoholic, imageUrl, instructions })

    response.status(201).send({ message: 'Cocktail created', cocktail })
})
router.get('/cocktails/:id', async ({ request, response }) => {
    const cocktail = await Cocktail.findOrFail(request.param('id'))
    response.status(200).send(cocktail)
})

router.put('/cocktails/:id', async ({ request, response }) => {
    const cocktail = await Cocktail.findOrFail(request.param('id'))
    const { name, isAlcoholic, imageUrl, instructions } = request.body()
    cocktail.merge({ name, isAlcoholic, imageUrl, instructions })
    await cocktail.save()
    response.status(200).send({ message: 'Cocktail updated' })
})

router.delete('/cocktails/:id', async ({ request, response }) => {
    const cocktail = await Cocktail.findOrFail(request.param('id'))
    await cocktail.delete()
    response.status(200).send({ message: 'Cocktail deleted' })
})

router.get('/ingredients', async ({ request, response }) => {
    const ingredients = await Ingredient.all()
    response.status(200).send(ingredients)
})
router.post('/ingredients', async ({ request, response }) => {
    const { name, description, isAlcoholic, type, percentage, imageUrl } = request.body()
    const ingredient = await Ingredient.create({ name, description, isAlcoholic, type, percentage, imageUrl })
    response.status(201).send({ message: 'Ingredient created', ingredient })
})
router.get('/ingredients/:id', async ({ request, response }) => {
    const ingredient = await Ingredient.findOrFail(request.param('id'))
    response.status(200).send(ingredient)
})
router.put('/ingredients/:id', async ({ request, response }) => {
    const ingredient = await Ingredient.findOrFail(request.param('id'))
    const { name, description, isAlcoholic, type, percentage, imageUrl } = request.body()
    ingredient.merge({ name, description, isAlcoholic, type, percentage, imageUrl })
    await ingredient.save()
    response.status(200).send({ message: 'Ingredient updated' })
})
router.delete('/ingredients/:id', async ({ request, response }) => {
    const ingredient = await Ingredient.findOrFail(request.param('id'))
    await ingredient.delete()
    response.status(200).send({ message: 'Ingredient deleted' })
})


router.get('/tags', async ({ request, response }) => {
    const tags = await Tag.all()
    response.status(200).send(tags)
})

router.post('/tags', async ({ request, response }) => {
    const { name } = request.body()
    const tag = await Tag.create({ name })
    response.status(201).send({ message: 'Tag created', tag })
})

router.put('/tags/:id', async ({ request, response }) => {
    const tag = await Tag.findOrFail(request.param('id'))
    const { name } = request.body()
    tag.merge({ name })
    await tag.save()
    response.status(200).send({ message: 'Tag updated' })
})

router.delete('/tags/:id', async ({ request, response }) => {
    const tag = await Tag.findOrFail(request.param('id'))
    await tag.delete()
    response.status(200).send({ message: 'Tag deleted' })
})

router.get('/cocktails/:id/ingredients', async ({ request, response }) => {
    const cocktail = await Cocktail.findOrFail(request.param('id'))
    const ingredients = await cocktail.related('ingredients').query()
    response.status(200).send(ingredients)
})

router.get('/cocktails/:id/tags', async ({ request, response }) => {
    const cocktail = await Cocktail.findOrFail(request.param('id'))
    const tags = await cocktail.related('tags').query()
    response.status(200).send(tags)
})
