import React from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../components/ContentContainer";
import Table from "../../components/table/payment/Table";

export default function GeneralSupport() {
  return (
    <ContentContainer role="customer" selectedMenu="Beranda">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Daftar Payment Request</Typography>
      </div>
      <Table />
    </ContentContainer>
  );
}
