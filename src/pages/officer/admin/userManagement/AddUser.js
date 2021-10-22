import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

//Material-Ui Icons
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//Components
import ContentContainer from "../../../../components/ContentContainer";
import CreateUserResultContent from "../../../../components/CreateUserResultContent";
import UserService from "../../../../services/user.service";
import branchService from "../../../../services/branch.service";
import { branchAdapter, roleAdapter } from "../../../../utils/user-mgmt";

//PAGE STYLE
const useMyStyles = makeStyles((theme) => ({
  PaperSize: {
    padding: 40,
  },
  BtnSave: {
    backgroundColor: "#1890FF",
    "&:hover": {
      backgroundColor: "# 2979ff",
    },
    marginTop: 30,
    float: "right",
  },
  BtnBack: {
    backgroundColor: "#1890FF",
    "&:hover": {
      backgroundColor: "# 2979ff",
    },
    marginTop: 30,
    float: "left",
  },
}));

const FormSkeleton = () => {
  return (
    <Fragment>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
    </Fragment>
  );
};

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Input required"),
  username: Yup.string()
    .min(6, "Min 6 character required ")
    .max(20, "Must be 20 characters or less")
    .matches(/^\S+$/, "This field cannot contain any spaces")
    .required("Input required"),
  password: Yup.string()
    .min(6, "Min 6 character required ")
    .required("Input required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Input required"),
  role_id: Yup.number().required("Input required"),
  branch_id: Yup.number().when("role_id", {
    is: (role_id) => role_id !== 1,
    then: Yup.number().required("Input required"),
  }),
});

const initValues = {
  fullname: "",
  username: "",
  password: "",
  passwordConfirmation: "",
  role_id: 1,
  branch_id: "",
};

function FormAddUser({ dataBranch, formValues, handlePostSubmit }) {
  const router = useHistory();
  const classes = useMyStyles();
  const [errorMsg, setErrorMsg] = useState("");

  //STATE "Show/Hide Password"
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ fullname, username, password, role_id, branch_id }) => {
      const dataUser = {
        fullname,
        username,
        password,
        role_id,
        branch_id: role_id !== 1 ? branch_id : 1,
      };
      // console.log({ dataUser });
      const result = await UserService.CreateNewUser(dataUser);
      // console.log({ result });
      if (!Boolean(result.error)) {
        setErrorMsg("");
        handlePostSubmit(dataUser);
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  //PAGE ADD USER
  return (
    <Paper className={classes.PaperSize} elevation={4}>
      <Fragment>
        {Boolean(errorMsg) && (
          <Alert severity="error" style={{ margin: "1em 0" }}>
            {errorMsg}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
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
                error={Boolean(formik.errors.role_id) && formik.touched.role_id}
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
                {Boolean(formik.errors.role_id) && formik.touched.role_id && (
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
                  Boolean(formik.errors.branch_id) && formik.touched.branch_id
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
                    <FormHelperText>{formik.errors.branch_id}</FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                disabled={formik.isSubmitting}
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
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={formik.values.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                helperText={formik.errors.password}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.password) && formik.touched.password
                }
                data-test="txt-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passwordConfirmation"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                value={formik.values.passwordConfirmation}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                helperText={formik.errors.passwordConfirmation}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.passwordConfirmation) &&
                  formik.touched.passwordConfirmation
                }
                data-test="txt-passwordConfirmation"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.BtnBack}
                startIcon={<ArrowBackIosRoundedIcon />}
                onClick={() => router.goBack()}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.BtnSave}
                endIcon={<SaveRoundedIcon />}
                disabled={formik.isSubmitting}
                data-test="btn-submit"
              >
                {formik.isSubmitting ? "Loading..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    </Paper>
  );
}

export default function AddUser() {
  const [formValues, setFormValues] = useState(initValues);
  const [isSubmited, setIsSubmited] = useState(false);
  const [dataBranch, setDataBranch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    GetBranchID();
  }, []);

  const handleResetFormValues = () => {
    setIsSubmited(false);
    setFormValues(initValues);
  };

  const handlePostSubmit = (values) => {
    setIsSubmited(true);
    setFormValues(values);
  };

  async function GetBranchID() {
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
      setDataBranch(null);
      setErrorMsg(result.error.response.data.msg);
    }
  }

  const convertUserData = (formValues) => {
    let result = formValues;
    const role_name = roleAdapter(formValues.role_id);
    const branch_name = branchAdapter(dataBranch, formValues.branch_id);
    result = { ...result, role_name, branch_name };
    return result;
  };

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
        <Typography variant="h4">New User Account</Typography>
      </div>
      {Boolean(errorMsg) && (
        <Alert severity="error" style={{ margin: "1em 0" }}>
          {errorMsg}
        </Alert>
      )}
      {isLoading ? (
        <FormSkeleton />
      ) : isSubmited ? (
        <CreateUserResultContent
          newUserData={convertUserData(formValues)}
          handleResetFormValues={handleResetFormValues}
        />
      ) : (
        <FormAddUser
          handlePostSubmit={handlePostSubmit}
          formValues={formValues}
          dataBranch={dataBranch}
        />
      )}
    </ContentContainer>
  );
}
