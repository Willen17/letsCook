import { ArrowBackIosNew, Edit } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import userIcon from "../../../assets/logoAndIcons/usericon.svg";
import { makeRequest } from "../../../helper.js";
import { useAccount } from "../../context/AccountContext";

const RecipeDetailPage = () => {
  const { isLoggedIn } = useAccount();
  const [recipe, setRecipe] = useState([]);
  const [individualRating, setIndividualRating] = useState(0);
  const [comment, setComment] = useState("");
  const [disableButton, setDisabledButton] = useState(true);

  const location = useLocation();
  const { id, rating } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      setRecipe(response);
    };
    fetchData();

    comment.length > 4 && individualRating >= 1
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [comment.length, id, individualRating]);

  const submitComment = async (existingComments) => {
    const allComments = {
      comments: [
        ...existingComments,
        {
          author: "To be fixed", // need to connect to the user database...
          content: comment,
          rated: individualRating,
        },
      ],
    };
    await makeRequest(`/api/recipes/${id}`, "PUT", allComments);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  return recipe.length < 1 ? (
    <Container
      sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem", textAlign: "center" }}
    >
      Something went wrong. Try refreshing the page.
    </Container>
  ) : (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Container sx={{ background: "white", borderRadius: 5 }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            pt: "2rem",
            cursor: "pointer",
            color: "#2E4739",
            "&:hover": {
              color: "#E5C687",
            },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNew fontSize="small" />
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "Poppins", fontWeight: 600, lineHeight: 1.2 }}
          >
            Back
          </Typography>
        </Box>
        {/* upper section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            padding: "2rem 1rem",
          }}
        >
          {/* upper: image */}
          <Box
            component="img"
            width="100%"
            maxWidth="400px"
            height="400px"
            src={recipe.image}
            title={recipe.title}
            sx={{ borderRadius: 5, m: "auto", objectFit: "cover" }}
          />

          {/* upper: intro */}
          <Box sx={{ padding: "1rem" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins", fontWeight: 600, mb: "1rem" }}
              >
                {recipe.title}
              </Typography>
              <Link
                to={"/recipe/edit"}
                state={{
                  id: id,
                }}
                style={{ textDecoration: "none" }}
              >
                <Edit sx={{ color: "#2E4739", fontSize: "2rem" }} />
              </Link>
            </Box>
            <StarRatings
              rating={parseInt(rating)}
              starDimension="35px"
              starSpacing="5px"
              starRatedColor="#E5C687"
              starEmptyColor="#B6D5D5"
              svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
            />{" "}
            <Typography
              variant="subtitle1"
              sx={{ my: "2rem", fontFamily: "Poppins" }}
            >
              {recipe.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={time}
                  alt="time"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.cookingMinute} min
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={portion}
                  alt="servings"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.servings} portions
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={ingredient}
                  alt="ingredient"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.ingredients.length} ingredients
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* middle section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            p: "1rem",
          }}
        >
          {/* middle: ingredients */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              py: "1rem",
            }}
          >
            {recipe.ingredients.map((ingredient) => (
              <Box
                key={ingredient}
                sx={{
                  mt: ".7rem",
                  color: "#0B814A",
                  borderBottom: "1px solid #C4C4C4",
                }}
              >
                {ingredient}
              </Box>
            ))}
          </Box>

          {/* middle: directions */}
          <Box sx={{ p: "1rem" }}>
            <Typography
              variant="h5"
              color="#0B814A"
              sx={{ fontFamily: "Poppins", fontWeight: 500 }}
            >
              Directions
            </Typography>
            <ol>
              {recipe.direction.map((step) => (
                <li key={step} style={{ marginTop: "1rem" }}>
                  {step}
                </li>
              ))}
            </ol>
          </Box>
        </Box>
      </Container>

      {/* comment section */}
      <Container
        sx={{
          background: "white",
          borderRadius: 5,
          mt: "2rem",
          textAlign: "center",
          p: "2rem 1rem",
        }}
      >
        <Typography
          variant="h5"
          color="#0B814A"
          sx={{ fontFamily: "Poppins", fontWeight: 500, mb: "2rem" }}
        >
          What do others say about this recipe?
        </Typography>

        {recipe.comments.length < 1 ? (
          <Container
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            No one has commented on this recipe yet.
          </Container>
        ) : (
          recipe.comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                mt: "1rem",
                background: "#F1F8F6",
                maxWidth: "60%",
                m: "1rem auto",
                borderRadius: "15px",
                p: ".5rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                minWidth="200px"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  placeItems: "center",
                }}
              >
                <Box
                  component="img"
                  style={{ height: "45px", margin: "0.3rem 1rem 0 1rem" }}
                  src={userIcon}
                  alt="LetsCook"
                />
                <Typography
                  variant="body2"
                  color="#0B814A"
                  sx={{
                    textAlign: "start",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {comment.author}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: ".5rem .8rem 0 0",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontFamily: "Poppins",
                    display: "flex",
                    fontSize: ".8rem",
                  }}
                >
                  {comment.content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: ".6rem",
                    mt: ".2rem",
                    alignSelf: "flex-end",
                  }}
                >
                  {/* think it looks cleaner without the word "rated?" :)  */}
                  {/* <Typography
                    sx={{
                      fontFamily: "Poppins",
                      display: "flex",
                      fontSize: ".7rem",
                    }}
                  >
                    Rated:
                  </Typography> */}
                  <StarRatings
                    rating={comment.rated}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#E5C687"
                    starEmptyColor="#B6D5D5"
                    svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
                  />
                </Box>
              </Box>
            </Box>
          ))
        )}
        {!isLoggedIn ? (
          <Box
            sx={{
              background: "#F1F8F6",
              maxWidth: "60%",
              m: "1rem auto",
              borderRadius: "15px",
              p: ".5rem",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                fontWeight: 500,
                py: "1rem",
              }}
            >
              Create an account or sign in order to comment.
            </Typography>
            <Link
              to="/signin"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  border: "none",
                  width: "60%",
                  height: "2rem",
                  m: "auto",
                  fontSize: ".8rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#0AA35C",
                    transform: "scale(1.01)",
                  },
                }}
              >
                Sign In or Sign Up
              </Button>
            </Link>
          </Box>
        ) : (
          <Box
            sx={{
              background: "#F1F8F6",
              maxWidth: "60%",
              m: "1rem auto",
              borderRadius: "15px",
              p: ".5rem",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                fontWeight: 500,
                py: "1rem",
              }}
            >
              Tell the others your thoughts about this recipe!
            </Typography>
            <TextField
              required
              multiline
              rows={4}
              size="small"
              id="comment"
              type="text"
              InputProps={{
                style: { fontSize: "0.8rem", minLength: 5 },
              }}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: ".5rem",
                mb: "1rem",
                // For styling input
                "& label.Mui-focused": {
                  color: "#0B814A",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#0B814A",
                },
                // Normal border
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".5rem",
                  fontFamily: "Poppins",

                  "& fieldset": {
                    borderColor: "#B6D5D5",
                  },
                  // On Hover
                  "&:hover fieldset": {
                    borderColor: "#0AA35C",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0B814A",
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <StarRatings
                rating={individualRating}
                changeRating={setIndividualRating}
                starDimension="30px"
                starSpacing="2px"
                starHoverColor="#E5C687"
                starRatedColor="#E5C687"
                starEmptyColor="#B6D5D5"
                svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
              />

              <Button
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  border: "none",
                  width: "100px",
                  height: "2rem",
                  fontSize: ".8rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#0AA35C",
                    transform: "scale(1.01)",
                  },
                }}
                disabled={disableButton}
                onClick={(e) => submitComment(recipe.comments, e)}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default RecipeDetailPage;
