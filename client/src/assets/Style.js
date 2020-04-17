import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "15px"
    },
    avatar: {
      margin: theme.spacing(3),
      backgroundColor: "#D74C3D"
    },
    form: {
      marginTop: theme.spacing(3)
    },
    icon: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(3, 0, 3),
      backgroundColor: "#396384"
    }
  }));

export default useStyles