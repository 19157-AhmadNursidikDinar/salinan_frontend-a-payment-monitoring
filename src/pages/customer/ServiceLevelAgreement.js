import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../components/ContentContainer";
import SlaBranchOffice from "../../components/SlaBranchOffice";
import Alert from '@material-ui/lab/Alert';
import DetailSkeleton from "../../components/DetailSkeleton";

import SlaService from "../../services/sla.service";

export default function ServiceLevelAgreementCustomer() {

    const [sla, setSla] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState();

    const fetchData = async () => {
        setIsLoading(true);
        const result = await SlaService.getSLAByBranch()

        setIsLoading(false);
        if (!Boolean(result.error)) {
            setSla(result.data)
            if (Boolean(result.data)) {
                setErrorMsg("");
            } else {
                setErrorMsg("data not found");
            }
        } else {
            setSla([])
            setErrorMsg(result.error.response.data.msg)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <ContentContainer role="customer" selectedMenu="Service Lvl Agreement">
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
                {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
                {isLoading ? (
                    <DetailSkeleton />
                ) : (
                    <SlaBranchOffice sla={sla} />
                )}
            </ContentContainer>
        </div>
    )
}
