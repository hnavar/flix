import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: 700,
      background: theme.palette.background.paper,
      marginTop: '1rem',
    },
    main: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      "& .MuiButtonBase-root.MuiTab-root": {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }
    },
    media: {
      height: '50vh',
      position: 'relative',
      background: theme.palette.background.paper,
    },
    profileImage: {
      position: "relative",
      top: "-125px",
      justifyContent: "center",
      border: `6px solid ${theme.palette.background.paper}`,
      margin: "auto",
      background: theme.palette.background.paper

    },
    profileInfoContainer: {
      position: "relative",
      height: '100%',
      background: theme.palette.background.paper
    },
    userName: {
      fontWeight: "bold",
      height: '100%',
      marginBottom: 0,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary
    },
    userTag: {
      marginTop: 0,
      background: theme.palette.background.paper
    },
    contentContainer: {
      position: "relative",
      background: theme.palette.background.paper
    }
  };
})
export default useStyles;