import React from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";

export default function ServiceLevelAgreement() {
    return (
        <ContentContainer role="admin" selectedMenu="Service Lvl Agreement">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Service Level Agreement</Typography>
            </div>
        </ContentContainer>
    );
}
