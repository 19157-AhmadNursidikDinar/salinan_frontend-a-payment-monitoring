import React from "react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import { Link } from "react-router-dom";

export default function Home() {
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
        <Typography variant="h4">Beranda Admin</Typography>
      </div>
      <Link to="/add-user">
        <Button
          variant="contained"
          color="primary"
        >
          Tambah User
        </Button>
      </Link>
      <Link to="/update-user">
        <Button
          variant="contained"
          color="primary"
        >
          Update User
        </Button>
      </Link>
    </ContentContainer>
  );
}
