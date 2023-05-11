import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({
  ingredients,
  errors,
  register,
}) {
  return (
    <ul id="ingredients-list">
      {ingredients.length ? (
        ingredients.map((ingredient, index) => (
          <IngredientsListItem
            key={ingredient.name}
            errors={errors}
            index={index}
            ingredient={ingredient}
            register={register}
          />
        ))
      ) : (
        <IngredientsListItem index={0} errors={errors} register={register} />
      )}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};
