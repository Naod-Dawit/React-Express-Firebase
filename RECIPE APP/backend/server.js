const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

let recipesData = [];

const fetchRecipes = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    console.log(data)
    recipesData = data.recipes;
  } catch (err) {
    console.error(err);
  }
};

// Fetch recipes when the server starts
fetchRecipes();

app.get('/api/recipes', (req, res) => {
  res.json({ recipes: recipesData });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
