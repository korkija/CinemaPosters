import axios from "axios";
import { ENDPOINT, apiKey } from "../../build.config";
// const ENDPOINT = "https://api.themoviedb.org/3";
// const apiKey = "2c407050ee1bd067f989b7e26c67ae72"; //https://api.themoviedb.org/3

export async function getMovies(page = 1) {
  const endpoint = `${ENDPOINT}/movie/popular?api_key=${apiKey}&page=${page}`;
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.log("getMovies ERROR", error);
    throw error;
  }
}

export async function getMovieDetails(id) {
  const endpoint = `${ENDPOINT}/movie/${id}?api_key=${apiKey}`;
  try {
    // throw new Error();
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.log("getMovieDetails ERROR", error);
    throw error;
  }
}
export async function getVideosMovie(id) {
  const endpoint = `${ENDPOINT}/movie/${id}/videos?api_key=${apiKey}`;
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.log("getVideosMovie ERROR", error);
    throw error;
  }
}
