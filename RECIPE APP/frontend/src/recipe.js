import { useState, useEffect } from "react";
import "/home/naex/Desktop/REACTNODE/frontend/src/styles/index.css";

export default function Recipe() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes");
        const jsonData = await response.json();
        setData(jsonData.recipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
  f    <div className="menu">
        {data.map((recipe) => (
          <div className="itemcard" key={recipe.id}>
            <h1>{recipe.name}</h1>
            <img src={recipe.image}></img>
            <h3>{recipe.mealType}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
