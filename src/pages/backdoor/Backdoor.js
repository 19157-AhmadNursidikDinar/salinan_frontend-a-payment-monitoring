import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Honeypot from "./Honeypot";
import CustomizedDialogs from "../../components/dialogs/CustomizedDialogs";
import HeatlCheck from "./entities/HeatlCheck";
import HeatlCheckJWT from "./entities/HeatlCheckJWT";

const CustomAlert = ({ children, title }) => {
  return (
    <Grid item>
      <Alert
        icon={false}
        severity="info"
        action={<CustomizedDialogs title={title}>{children}</CustomizedDialogs>}
      >
        {title}
      </Alert>
    </Grid>
  );
};

const ExpansionPanel = () => {
  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        Backdoors
      </Typography>
      <Grid container direction="column" spacing={2}>
        <CustomAlert title="Health Check">
          <HeatlCheck />
        </CustomAlert>
        <CustomAlert title="Health Check with JWT">
          <HeatlCheckJWT />
        </CustomAlert>
      </Grid>
    </Container>
  );
};

export default function Backdoor() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!isOpen && <Honeypot handleOpen={() => setIsOpen(true)} />}
      {isOpen && <ExpansionPanel />}
    </>
  );
}
