import React from 'react'
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import BranchOffice from "../../../components/BranchOffice"

export default function ServiceLevelAgreementGeneralSupport() {
    return (
        <div>
            <ContentContainer role="generalSupport" selectedMenu="Service Lvl Agreement">
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
