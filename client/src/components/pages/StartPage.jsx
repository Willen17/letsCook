import {
  Box,
  Container,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const StartPage = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const matches = useMediaQuery("(max-width:650px)");

  return (
    <main style={{ backgroundColor: "#F1F8F6", height: "calc(100vh - 3rem)" }}>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ paddingRight: "2rem" }}>
              <ThemeProvider theme={theme}>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#2E4739",
                      fontWeight: "900",
                      fontFamily: "Poppins",
                      textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
                    }}
                  >
                    Looking for
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{
                      color: "#E5C687",
                      fontWeight: "900",
                      fontFamily: "Poppins",
                      textShadow: "0px 1px, 1px 0px, 1px 1px #E5C687",
                    }}
                  >
                    delicious
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#2E4739",
                      fontWeight: "900",
                      fontFamily: "Poppins",
                      textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
                    }}
                  >
                    recipes?
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#989C9C",
                    paddingTop: "1rem",
                    fontFamily: "Poppins",
                  }}
                >
                  Whether you want a meal to impress the royal family of Monaco
                  or a quick meal for monday after work, we've got you!
                </Typography>
              </ThemeProvider>
            </Box>

            {!matches ? (
              <Box>
                <img
                  // @ts-ignore
                  src={require("../../assets/images/threeFood.png")}
                  alt="food"
                  style={{ height: "33vw" }}
                />
              </Box>
            ) : null}
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "#0B814A",
                color: "#F1F8F6",
                fontFamily: "Poppins",
                borderRadius: "70px",
                fontWeight: "bold",
                border: "none",
                height: "4rem",
                width: "100%",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              Get started
            </button>

            <Typography sx={{ color: "#989C9C" }}>
              Join over 1 000 000 others
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default StartPage;
