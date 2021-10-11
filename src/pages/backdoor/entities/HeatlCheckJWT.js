import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import HealthCheck from "../../../services/healthcheck.service";

export default function HeatlCheck() {
  const [result, setResult] = useState("");
  const handleExec = async () => {
    const respond = await HealthCheck.JWTHealthCheck();
    setResult(JSON.stringify(respond, null, 2));
  };
  return (
    <Fragment>
      <Button
        onClick={handleExec}
        fullWidth
        variant="contained"
        color="primary"
      >
        Execute
      </Button>
      {result && (
        <div style={{ border: "solid grey 1px" }}>
          <pre>{result}</pre>
        </div>
      )}
    </Fragment>
  );
}
