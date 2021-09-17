import { Grid } from '@material-ui/core';
import React from 'react';
import Logo from "../assets/logoPM.png"

export default function PageNotFound() {
    return (

        <div className="container"
            style={{
                backgroundColor: "#E5E5E5",
                alignItems: "center",
            }}>

            <Grid container justify="center" alignItems="center">
                <img
                    style={{
                        height: "90px",
                    }} src={Logo} />

                <h1
                    style={{
                        fontSize: "40px",
                        marginLeft: "20px"
                    }}
                >404 - PAGE NOT FOUND

                    <p
                        style={{
                            fontSize: "small",
                            fontWeight: "lighter",
                        }}
                    >The page you are looking for might have been removed had its name changed
                        <br />or is temporarily unavailable.</p>
                </h1>
            </Grid>
        </div>
    );
}