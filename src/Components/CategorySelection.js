import {
  CardContent,
  Container,
  Typography,
  CardActionArea,
  Card,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import questionsData from "../Data/questions.json";
import { useEffect, useState } from "react";

const CategorySelection = () => {
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Using Use sate hook as the category will be changing,State to hold the categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(questionsData.categories);
  }, []);

  const handleCategorySelection = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Select a Quiz Category
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardActionArea
                onClick={() => handleCategorySelection(category.id)}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySelection;
