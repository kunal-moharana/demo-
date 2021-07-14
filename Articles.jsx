import React, { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import theme from "./theme";
import ArticleCard from "./ReusableCards/Articlecard";
import { listTrendingArticles } from '../actions/articlesAction'

function articleCard(trendingArticle) {
  return (
    <Grid item xs={12} sm={4}>
      <ArticleCard
        id={trendingArticle._id}
        img={trendingArticle.imageUrl}
        title={trendingArticle.title}
        desc={trendingArticle.desc}
      />
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Articles() {

  const dispatch = useDispatch()

  const articleList = useSelector(state => state.trendingArticleList)
  const {loading, error, trending } = articleList

  useEffect(() => {
    dispatch(listTrendingArticles())
  }, [dispatch])

  

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
          <Typography
            style={{ fontweight: "bolder", margin: theme.spacing(2) }}
            component="div"
            align="left"
            variant="h4"
          >
            Trending
          </Typography>
          {loading ? <CircularProgress /> : error ? <h3><Alert severity="error">{error}</Alert></h3>: (
            <div className={classes.root}>
              <Grid container spacing={2}>
                {trending.map(articleCard)}
              </Grid>
            </div>
          )}
          
        </ThemeProvider>
      </Container>
    </React.Fragment>
  );
}
