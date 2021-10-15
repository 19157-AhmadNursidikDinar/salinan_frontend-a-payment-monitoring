import React from 'react'
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import BranchOffice from "../../../components/BranchOffice"

export default function ServiceLevelAgreementAccounting() {
    return (
        <div>
            <ContentContainer role="accounting" selectedMenu="Service Lvl Agreement">
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
                <BranchOffice />
            </ContentContainer>
        </div>
    )
}
