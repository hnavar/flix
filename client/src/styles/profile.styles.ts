import makeStyles from "@material-ui/core/styles/makeStyles";

let HEIGHT = window.screen.height;
let WIDTH = window.screen.width;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700
  },
  media: {
    height: HEIGHT / 3
  },
  profileImage: {
    position: "relative",
    top: "-110px",
    justifyContent: "center",
    width: theme.spacing(HEIGHT / 40),
    height: theme.spacing(HEIGHT / 40),
    border: "5px solid white",
    margin: "auto"
  },
  profileInfoContainer: {
    position: "relative",
    top: "-100px",
    margin: "auto"
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 0
  },
  userTag: {
    marginTop: 0
  },
  contentContainer: {
    position: "relative",
    top: "-90px"
  }
}));

export default useStyles;