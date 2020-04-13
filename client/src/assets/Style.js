import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: "1",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: "#D74C3D",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 3),
    backgroundColor: "#396384",
  },
  navButton: {
    margin: "10px",
    float: "right",
  },
  navigation: {
    width: "100%",
    zIndex: "2",
    position: "absolute",
  },
}));

export default useStyles;
