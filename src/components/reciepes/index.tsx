import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export default function ReciepesComponent() {
  const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getReciepes = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      const reipeData = data.recipes;
      console.log("response: ", reipeData);
      setRecipe(reipeData);
    } catch (error:any) {
      console.error("Reciepe Error: ", error);
      setError(error)
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getReciepes();
  }, []);

  if(loader) return <div className="flex justify-center items-center h-[100vh]"><LoadingOutlined /></div>

  if(error) return <div className="flex justify-center items-center h-[100vh]"> `Site getting chashed: ${error}`</div>
  
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Recipes
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipe.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1 mr-3">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold text-green-600">
                      {item.caloriesPerServing} kcal
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Ingredients:</span>{" "}
                    {item.ingredients.slice(0, 3).join(", ")}...
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">
                      {item.mealType?.[0] || item.tags?.[0]}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
