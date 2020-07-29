import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState({});

  useEffect(() => {
    props.onInitCharacters();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption({ selectedOption });
    props.fetchFilms(props.characters[selectedOption.value]["films"]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>STAR WARS</Paper>
        </Grid>
        <Grid item lg={3} md={2}></Grid>
        <Grid item xs={12} lg={6} md={8}>
          <Paper className={classes.paper}>
            <Select
              onChange={handleChange}
              options={props.characters.map((character, index) => ({
                label: character.name,
                value: index,
              }))}
            />

            <List
              className={classes.root}
              component="nav"
              aria-label="secondary mailbox folders"
            >
              <ListItem>
                <ListItemText primary="List of movies" />
              </ListItem>

              {props.films.map((film) => (
                <ListItem button >
                  <ListItemText key={film.title} primary={film.title} />
                </ListItem>
              ))}
            </List>
            {props.films.length > 0 ? (
              <div>
                Name/Year of last Movie
                <br />
                {props.films.map((film, i) => {
                  const date = film.release_date.split("-");
                  return props.films[i + 1] ? null : (
                    <div>
                      {film.title} - {date[0]}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Paper>
        </Grid>
        <Grid item lg={3} md={2}></Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    films: state.films,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCharacters: () => dispatch(actions.onInitCharacters()),
    fetchFilms: (filmUrl) => dispatch(actions.fetchFilms(filmUrl)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
