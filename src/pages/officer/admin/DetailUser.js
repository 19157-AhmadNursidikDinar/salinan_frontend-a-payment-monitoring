import React from 'react';

import {
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import ContentContainer from "../../../components/ContentContainer";
import ColorsTheme from "../../../assets/colors";
import FontsTheme from "../../../assets/fonts";
import { Link } from "react-router-dom";


const useMyStyles = makeStyles((theme) => ({
    BtnBack: {
        backgroundColor: ColorsTheme.dodgerBlue,
        '&:hover': {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        marginLeft: '20px',
        marginBottom: '10px',
        float: 'left',
    },
    fontDetail: {
        ...FontsTheme.roboto_bold,
        [theme.breakpoints.down('sm')]: {
            fontSize: "14px",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "18px",
        },
    }
}));


function FormDetailUser() {
    const classes = useMyStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.cardRequest}>
                <CardContent>
                    <Container maxWidth="sm">
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}>
                            <Grid className={classes.fontDetail} item xs={4}>
                                Nama
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={1}>
                                :
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={7}>
                                Agus SUnandar
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={4}>
                                Role
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={1}>
                                :
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={7}>
                                Accounting
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={4}>
                                Username
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={1}>
                                :
                            </Grid>
                            <Grid className={classes.fontDetail} item xs={7}>
                                AgusSUnandar
                            </Grid>
                        </Grid>
                    </Container>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Link to="/admin">
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.BtnBack}
                            startIcon={<ArrowBackIosRoundedIcon />}
                        >
                            Back
                            </Button>
                    </Link>
                </CardActions>
            </Card>
        </div >

    );
}

export default function DetailUser() {
    return (
        <ContentContainer role="admin" selectedMenu="Beranda">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Detail Account</Typography>
            </div >
            <FormDetailUser />
        </ContentContainer >
    );
}