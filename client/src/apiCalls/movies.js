let tmdbfetchUrl = (getParams, type) => {
  if (type === "regular") {
    return `https://api.themoviedb.org/3/${getParams}?api_key=${process.env.REACT_APP_TMDB_V3_API_KEY}`;
  } else if (type === "discover") {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_V3_API_KEY}&${getParams}`;
  }
};

export const getTrendingMovies = () => {
  // const tmdbGetParams = "trending/all/week";
  const tmdbGetParams = `sort_by=popularity.desc&include_adult=false`;
  const data = fetch(tmdbfetchUrl(tmdbGetParams, "discover"))
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
  return data;
};
export const getNewMovies = () => {
  const year = new Date().getFullYear();
  const tmdbGetParams = `sort_by=popularity.desc&include_adult=false&primary_release_year=${year}`;
  const data = fetch(tmdbfetchUrl(tmdbGetParams, "discover"))
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
  return data;
};
