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
  // Hook to navigate between routes, useState is similar to component-level state in Angular.
  const navigate = useNavigate();

  /**
   * 🔄 useEffect hook:
   * This runs after the component renders.
   * It's similar to Angular's `ngOnInit()` where you initialize data.
   *
   * 📌 Syntax: useEffect(callback, dependencyArray)
   * - callback: This is the function that runs after render
   * - dependencyArray:
   *    - If empty (`[]`), this effect runs only once (componentDidMount)
   *    - If you pass values, it re-runs only when those values change
   */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories from JSON data and set state
    setCategories(questionsData.categories);
  }, []); // ✅ Empty array = run only once (like ngOnInit)

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
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
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
