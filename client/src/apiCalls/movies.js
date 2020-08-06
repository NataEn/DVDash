let tmdbfetchUrl = (getParams) =>
  `https://api.themoviedb.org/3/${getParams}?api_key=${process.env.REACT_APP_TMDB_V3_API_KEY}`;

export const getTrendingMovies = () => {
  const tmdbGetParams = "trending/all/week";
  const data = fetch(tmdbfetchUrl(tmdbGetParams))
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
  return data;
};
