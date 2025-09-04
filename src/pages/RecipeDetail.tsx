import { CheckCircleOutlined, ClockCircleOutlined, ExperimentOutlined, FireOutlined, LoadingOutlined, StarFilled, TeamOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getReciepe = async (id: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      console.log(data);
      setRecipe(data);
    } catch (error) {
      console.log("Error Recipe: ", error);
    } finally {
      setLoading(false);
    }

    if (loading)
      return (
        <div className="flex justify-center items-center h-full">
          <LoadingOutlined />
        </div>
      );
  };
  useEffect(() => {
    if (id) {
      getReciepe(id);
    }
  }, [id]);

  if(loading) return <div className="flex justify-center items-center h-full"><LoadingOutlined /></div>


  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center w-full">
          <img
            src={recipe?.image}
            alt={recipe?.name}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{recipe?.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {recipe?.cuisine} • {recipe?.difficulty}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <StarFilled className="text-yellow-500" />
            <Rate disabled allowHalf defaultValue={recipe?.rating} className="text-gray-700 font-medium" />
               <span className="text-black"> {recipe?.rating} / 5</span>
            <p className="text-sm text-gray-500">
              ({recipe?.reviewCount} reviews)
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
            <p className="flex items-center gap-1">
              <ClockCircleOutlined className="text-blue-500" /> Prep:{" "}
              {recipe?.prepTimeMinutes} min
            </p>
            <p className="flex items-center gap-1">
              <FireOutlined className="text-red-500" /> Cook:{" "}
              {recipe?.cookTimeMinutes} min
            </p>
            <p className="flex items-center gap-1">
              <TeamOutlined className="text-green-500" /> Servings:{" "}
              {recipe?.servings}
            </p>
            <p className="flex items-center gap-1">
              <ThunderboltOutlined className="text-yellow-600" /> Calories:{" "}
              {recipe?.caloriesPerServing} kcal
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {recipe?.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 font-medium"
              >
                #{tag}
              </span>
            ))}
            {recipe?.mealType?.map((meal: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 font-medium"
              >
                {meal}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
          <CheckCircleOutlined className="text-green-500" /> Ingredients
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {recipe?.ingredients.map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
          <ExperimentOutlined className="text-indigo-500" /> Instructions
        </h2>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          {recipe?.instructions?.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-10 p-4 bg-gray-50 border rounded-lg text-sm text-gray-600">
        <p>
          Recipe submitted by{" "}
          <span className="font-medium">User #{recipe?.userId}</span>
        </p>
      </div>
    </div>
  );
}
