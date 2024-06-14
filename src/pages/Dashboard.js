import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Paper,
  Box,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

const carouselItems = [
  {
    title: "Image 1",
    description: "Description for Image 1",
    image: "https://via.placeholder.com/1200x400/FF5733/FFFFFF",
  },
  {
    title: "Image 2",
    description: "Description for Image 2",
    image: "https://via.placeholder.com/1200x400/33FF57/FFFFFF",
  },
  {
    title: "Image 3",
    description: "Description for Image 3",
    image: "https://via.placeholder.com/1200x400/5733FF/FFFFFF",
  },
  {
    title: "Image 4",
    description: "Description for Image 4",
    image: "https://via.placeholder.com/1200x400/FF5733/FFFFFF",
  },
  {
    title: "Image 5",
    description: "Description for Image 5",
    image: "https://via.placeholder.com/1200x400/33FF57/FFFFFF",
  },
];

const articles = [
  {
    title: "Article 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://via.placeholder.com/600x400/FF5733/FFFFFF",
  },
  {
    title: "Article 2",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    image: "https://via.placeholder.com/600x400/33FF57/FFFFFF",
  },
  {
    title: "Article 3",
    content:
      "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
    image: "https://via.placeholder.com/600x400/5733FF/FFFFFF",
  },
];

const galleryItems = [
  {
    title: "Gallery Item 1",
    image: "https://via.placeholder.com/300x200/FF5733/FFFFFF",
  },
  {
    title: "Gallery Item 2",
    image: "https://via.placeholder.com/300x200/33FF57/FFFFFF",
  },
  {
    title: "Gallery Item 3",
    image: "https://via.placeholder.com/300x200/5733FF/FFFFFF",
  },
  {
    title: "Gallery Item 4",
    image: "https://via.placeholder.com/300x200/FF5733/FFFFFF",
  },
  {
    title: "Gallery Item 5",
    image: "https://via.placeholder.com/300x200/33FF57/FFFFFF",
  },
  {
    title: "Gallery Item 6",
    image: "https://via.placeholder.com/300x200/5733FF/FFFFFF",
  },
];

function Dashboard() {
  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          maxWidth: "100%",
          maxHeight: "400px",
          overflow: "hidden",
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Carousel
          animation="slide"
          swipe="true"
          navButtonsAlwaysInvisible="false"
          sx={{ maxHeight: "400px" }}
        >
          {carouselItems.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "400px", display: "block" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  p: 2,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Gallery
        </Typography>
        <Grid container spacing={3}>
          {galleryItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
