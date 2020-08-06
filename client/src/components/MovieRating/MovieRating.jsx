import React from "react";
import "./MovieRating.css";
import Rating from "@material-ui/lab/Rating";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";

const MovieRating = ({ rating }) => {
  return (
    <div>
      <Box
        component="fieldset"
        mb={0}
        borderColor="transparent"
        className="MovieRating_box"
      >
        <span>
          <Rating
            className="MovieRating_rating"
            name="customized-empty"
            value={Math.round(rating) / 2}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="small" />}
            readOnly
            size="small"
            decimal
          />
          <p className="Rating_span">{Math.round(rating)}</p>
        </span>
      </Box>
    </div>
  );
};
export default MovieRating;
