import React, { useEffect, useState } from "react";
//Material-Ui Cores
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
//Material-Ui Icons
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
//Custom Components
import ContentContainer from "../../../../components/ContentContainer";
import useStyles from "../../../../styles/officer/admin/FormUser";
//Links
import { Alert } from "@material-ui/lab";
import { Link, useParams } from "react-router-dom";
import UserService from "../../../../services/user.service";
import branchService from "../../../../services/branch.service";
import DetailSkeleton from "../../../../components/DetailSkeleton";
import { useFormik } from "formik";
import * as Yup from "yup";

const initValues = {
  fullname: "",
  username: "",
  role_id: 1,
  branch_id: "",
};

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Input required"),
  username: Yup.string()
    .min(6, "Min 6 character required ")
    .max(20, "Must be 20 characters or less")
    .matches(/^\S+$/, "This field cannot contain any spaces")
    .required("Input required"),
  role_id: Yup.number().required("Input required"),
  branch_id: Yup.number().when("role_id", {
    is: (role_id) => role_id !== 1,
    then: Yup.number().required("Input required"),
  }),
});

export default function UpdateUser() {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataBranch, setDataBranch] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ fullname, username, role_id, branch_id }) => {
      const dataUser = {
        fullname,
        username,
        role_id,
        id: parseInt(id),
        branch_id: role_id !== 1 ? branch_id : 1,
      };
      // console.log({ dataUser });
      const result = await UserService.UpdateUser(dataUser);
      // console.log({ result });
      if (!Boolean(result.error)) {
        setErrorMsg("");
        setSuccessMsg("User data has been updated");
        // handlePostSubmit(dataUser);
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

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
      formik.setValues({ ...formik.values, ...result.data });
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
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
      <Paper className={classes.PaperSize} elevation={4}>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            {Boolean(errorMsg) && (
              <Alert className={classes.alert} severity="warning">
                {errorMsg}
              </Alert>
            )}
            {Boolean(successMsg) && (
              <Alert className={classes.alert} severity="success">
                {successMsg}
              </Alert>
            )}
            {isLoading ? (
              <DetailSkeleton />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    helperText={formik.errors.username}
                    error={
                      Boolean(formik.errors.username) && formik.touched.username
                    }
                    data-test="txt-username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="AccountName"
                    name="fullname"
                    label="Nama"
                    variant="outlined"
                    fullWidth
                    value={formik.values.fullname}
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    error={
                      Boolean(formik.errors.fullname) && formik.touched.fullname
                    }
                    helperText={formik.errors.fullname}
                    data-test="txt-fullname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={
                      Boolean(formik.errors.role_id) && formik.touched.role_id
                    }
                    className={classes.FormControl}
                  >
                    <InputLabel htmlFor="user-roles">Role</InputLabel>
                    <Select
                      labelId="user-roles"
                      label="Role"
                      id="UserRole"
                      name="role_id"
                      value={formik.values.role_id}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      data-test="select-role"
                    >
                      <MenuItem value={1} data-test="opt-role-admin">
                        Admin
                      </MenuItem>
                      <MenuItem value={2} data-test="opt-role-gs">
                        General Support
                      </MenuItem>
                      <MenuItem value={3} data-test="opt-role-accounting">
                        Accounting
                      </MenuItem>
                      <MenuItem value={4} data-test="opt-role-user">
                        User
                      </MenuItem>
                    </Select>
                    {Boolean(formik.errors.role_id) &&
                      formik.touched.role_id && (
                        <FormHelperText>{formik.errors.role_id}</FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: [2, 3, 4].includes(formik.values.role_id)
                      ? "block"
                      : "none",
                  }}
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={
                      Boolean(formik.errors.branch_id) &&
                      formik.touched.branch_id
                    }
                    className={classes.FormControl}
                  >
                    <InputLabel htmlFor="user-roles">Branch</InputLabel>
                    <Select
                      label="Branch"
                      id="branchAgent"
                      name="branch_id"
                      value={formik.values.branch_id}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      data-test="select-branch"
                    >
                      <MenuItem value="">none</MenuItem>
                      {dataBranch.map(
                        (e, i) =>
                          e.id !== 1 && (
                            <MenuItem value={e.id} key={i} id={e.id}>
                              {e.branch_name}
                            </MenuItem>
                          )
                      )}
                    </Select>
                    {Boolean(formik.errors.branch_id) &&
                      formik.touched.branch_id && (
                        <FormHelperText>
                          {formik.errors.branch_id}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
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
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="submit"
              className={classes.BtnSave}
              disabled={isLoading || formik.isSubmitting}
              endIcon={<SaveRoundedIcon />}
            >
              Save
            </Button>
          </Grid>
        </form>
      </Paper>
    </ContentContainer>
  );
}
