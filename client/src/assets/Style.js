import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: "1",
    margin: "10px",
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  preferencePaper: {
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  createAccountPaper: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  preferenceIcon: {
    height: "25px",
  },
  userDashboardGrid: {},
}));

export default useStyles;
