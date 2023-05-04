import PropTypes from "prop-types";
import OpenCalculatorButton from "./OpenCalculatorButton";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import ImportedRecipeButtons from "./ImportedRecipeButtons";
import SavedRecipeButtons from "./SavedRecipeButtons";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import { getNutrientQuantityFromArray } from "../../../utils/formatScrapedRecipe";

export default function RecipeDisplay({ recipe, switchToForm }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
  } = recipe;

  const recipeStatus = recipe.id ? "saved" : "imported";
  let buttonsPanel;

  if (recipeStatus === "imported") {
    buttonsPanel = <ImportedRecipeButtons switchToForm={switchToForm} />;
  } else if (recipeStatus === "saved") {
    buttonsPanel = <SavedRecipeButtons switchToForm={switchToForm} />;
  }

  return (
    <div id="recipe">
      <RecipeContainer
        titleComponent={<h2>{title}</h2>}
        subHeadingComponent={
          <SubHeading
            servings={servings}
            prepTime={prepTime}
            cookTime={cookTime}
          />
        }
        buttonsComponent={
          <>
            <OpenCalculatorButton
              recipeServingsCount={servings}
              recipeCaloriesCount={getNutrientQuantityFromArray(
                "Calories",
                nutrients
              )}
              onSubmit={(multiplier) =>
                console.log(`Multiply recipe by ${multiplier}`)
              }
            />
            {buttonsPanel}
          </>
        }
        ingredientsComponent={<IngredientsList ingredients={ingredients} />}
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ol>
        }
        nutrientsComponent={
          nutrients && (
            <NutrientsList
              nutrients={nutrients}
              servingsCount={servings}
              servingSize={servingSize}
            />
          )
        }
      />
    </div>
  );
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
    nutrients: PropTypes.arrayOf(PropTypes.string),
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
    servingSize: PropTypes.string,
  }).isRequired,
  switchToForm: PropTypes.func.isRequired,
};
