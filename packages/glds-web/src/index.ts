export { GLDSProvider } from './provider';

export type RecipeId = 'button' | 'card' | 'text-field';

export type LoadedRecipe = { id: RecipeId; recipe: unknown; markup: string; css: string };

const recipeImporters: Record<RecipeId, () => Promise<LoadedRecipe>> = {
  'button': async () => {
    const [recipe, markup, css] = await Promise.all([
      import('./recipes/button/recipe.json'),
      import('./recipes/button/markup.html?raw'),
      import('./recipes/button/styles.css?raw')
    ]);
    return { id: 'button', recipe: (recipe as any).default ?? recipe, markup: (markup as any).default ?? markup, css: (css as any).default ?? css };
  },
  'card': async () => {
    const [recipe, markup, css] = await Promise.all([
      import('./recipes/card/recipe.json'),
      import('./recipes/card/markup.html?raw'),
      import('./recipes/card/styles.css?raw')
    ]);
    return { id: 'card', recipe: (recipe as any).default ?? recipe, markup: (markup as any).default ?? markup, css: (css as any).default ?? css };
  },
  'text-field': async () => {
    const [recipe, markup, css] = await Promise.all([
      import('./recipes/text-field/recipe.json'),
      import('./recipes/text-field/markup.html?raw'),
      import('./recipes/text-field/styles.css?raw')
    ]);
    return { id: 'text-field', recipe: (recipe as any).default ?? recipe, markup: (markup as any).default ?? markup, css: (css as any).default ?? css };
  }
};

export function loadRecipe(id: RecipeId): Promise<LoadedRecipe> { return recipeImporters[id](); }
export const recipeIds: RecipeId[] = ['button', 'card', 'text-field'];
