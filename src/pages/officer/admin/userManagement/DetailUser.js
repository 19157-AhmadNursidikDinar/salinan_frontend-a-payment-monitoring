import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

import DetailSkeleton from "../../../../components/DetailSkeleton";
import ContentContainer from "../../../../components/ContentContainer";
import ColorsTheme from "../../../../assets/colors";
import FontsTheme from "../../../../assets/fonts";
import { Alert } from "@material-ui/lab";
import { Link, useParams } from "react-router-dom";
import UserService from "../../../../services/user.service";
import branchService from "../../../../services/branch.service";
import { branchAdapter, roleAdapter } from "../../../../utils/user-mgmt";

const useMyStyles = makeStyles((theme) => ({
  BtnBack: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
    marginLeft: "20px",
    marginBottom: "10px",
    float: "left",
  },
  fontDetail: {
    ...FontsTheme.roboto_bold,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
}));

function FormDetailUser() {
  const classes = useMyStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    branch_id: 1,
    fullname: "",
    id: null,
    role_id: 1,
    username: "",
  });
  const [dataBranch, setDataBranch] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    fetchUserDetail(id);
    getBranchList();
    // eslint-disable-next-line
  }, [id]);

  const fetchUserDetail = async (id) => {
    setIsLoading(true);
    const result = await UserService.getUserDetail(id);
    // console.log({ result });
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setUserDetail({ ...userDetail, ...result.data });
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
      setUserDetail(null);
      setErrorMsg(result.error.response.data.msg);
    }
  };

  async function getBranchList() {
    setIsLoading(true);
    const result = await branchService.getAllBranch();
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setDataBranch(result.data);
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
      setDataBranch([]);
      setErrorMsg(result.error.response.data.msg);
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.cardRequest}>
        {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
        {isLoading ? (
          <DetailSkeleton />
        ) : (
          <CardContent>
            <Container maxWidth="sm">
              <Grid
                container
                direction="row"
                // justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid className={classes.fontDetail} item xs={4}>
                  Nama
                </Grid>
                <Grid className={classes.fontDetail} item xs={1}>
                  :
                </Grid>
                <Grid className={classes.fontDetail} item xs={7}>
                  {userDetail.fullname}
                </Grid>
                <Grid className={classes.fontDetail} item xs={4}>
                  Role
                </Grid>
                <Grid className={classes.fontDetail} item xs={1}>
                  :
                </Grid>
                <Grid className={classes.fontDetail} item xs={7}>
                  {roleAdapter(userDetail.role_id)}
                </Grid>
                <Grid className={classes.fontDetail} item xs={4}>
                  Username
                </Grid>
                <Grid className={classes.fontDetail} item xs={1}>
                  :
                </Grid>
                <Grid className={classes.fontDetail} item xs={7}>
                  {userDetail.username}
                </Grid>
                {userDetail.role_id !== 1 && (
                  <React.Fragment>
                    <Grid className={classes.fontDetail} item xs={4}>
                      Branch
                    </Grid>
                    <Grid className={classes.fontDetail} item xs={1}>
                      :
                    </Grid>
                    <Grid className={classes.fontDetail} item xs={7}>
                      {branchAdapter(dataBranch, userDetail.branch_id)}
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </Container>
          </CardContent>
        )}
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
    </div>
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
      </div>
      <FormDetailUser />
    </ContentContainer>
  );
}
