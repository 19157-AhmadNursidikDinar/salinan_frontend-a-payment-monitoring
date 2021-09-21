import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({

    content: {
        backgroundColor: "#F0F2F5",
        height: "100vh",
        alignItems: "center"
    },

    imageError: {
        height: "90px",
    },

    descError: {
        fontSize: "40px",
        marginLeft: "20px",
    },

    textError: {
        fontSize: "small",
        fontWeight: "lighter",
    },
});

export default useStyles;