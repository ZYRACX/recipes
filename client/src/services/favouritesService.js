import axios from "axios";

const API_URL = "http://localhost:5000/api/favourites";

export async function getUserFavourites(token) {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function addFavourite(recipeId, token) {
  const res = await axios.post(
    API_URL,
    { recipe_id: recipeId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}


export async function removeFavourite(recipeId, token) {
  const res = await axios.delete(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: { recipe_id: recipeId },
  });
  return res.data;
}
