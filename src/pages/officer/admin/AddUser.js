import React, { useEffect, useState } from 'react';
import axios from 'axios';
//Material-Ui Cores
import {
    Button,
    Container,
    TextField,
    Grid,
    Typography,
    Paper,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Material-Ui Icons
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Links
import ContentContainer from "../../../components/ContentContainer";
import { Link, useHistory } from "react-router-dom";

//PAGE STYLE
const useMyStyles = makeStyles((theme) => ({
    PaperSize: {
        padding: 40,
    },
    BtnSave: {
        backgroundColor: "#1890FF",
        '&:hover': {
            backgroundColor: "# 2979ff",
        },
        marginTop: 30,
        float: 'right',
    },
    BtnBack: {
        backgroundColor: "#1890FF",
        '&:hover': {
            backgroundColor: "# 2979ff",
        },
        marginTop: 30,
        float: 'left',
    },
}));



const url = '34.101.232.64:8000'
function FormAddUser() {
    const router = useHistory()
    const classes = useMyStyles();
    const [open, setOpen] = useState(false);
    const [dataBranch, setDataBranch] = useState([])
    const [erorMessage, setErorMessege] = useState()
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [newUser, setNewUser] = useState({
        "fullname": "",
        "username": "",
        "password": "",
        "role_id": 0,
        "branch_id": 1
    });
    const {fullname, username, password, role_id, branch_id} = newUser

    //STATE "Role"
    const [role, setRole] = useState('');
    const [branch, setBranch] = useState()
    //STATE "Show/Hide Password"
    const [values, setValues] = useState({
        showPassword: false,
    });
    
    const handleRole = (event) => {
        setRole(event.target.value);
        event.target.value === 'adminRole' ? setNewUser({...newUser, "role_id": 1,})
        : event.target.value === 'generalSupportRole' ? setNewUser({...newUser, "role_id": 2,})
        : event.target.value === 'accountingRole' ? setNewUser({...newUser, "role_id": 3,})
        : event.target.value === 'userRole' && setNewUser({...newUser, "role_id": 4,})
    };

    const handleBranch = (event) => {
        setBranch(event.target.value);
        for (const key of dataBranch) {
           if (key.branch_name === event.target.value) {
               setNewUser({...newUser, 'branch_id': key.id})
           }
        }
    };
    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickSnackBar = () => {
        setOpen(true);
      };
    
      const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    async function PostCreateNewRole() {
        if (fullname !== '' && username !== '' && role_id !== 0 && password !== '') {
            try {
                const response = await axios.post(`http://34.101.232.64:8000/api/v1/user/create`,{
                    fullname,
                    username,
                    password,
                    role_id,
                    branch_id,
                })
            } catch (error) {
                throw 'new role' + error
            }
        } else {
            setErorMessege('require failed')
        }
    }

    async function GetBranchID() {
        try {
            const branchID = await axios.get(`http://${url}/api/v1/branch`)
            setDataBranch(branchID.data.data)
        } catch (error) {
            throw 'response data branch' + error
        }
    }

    useEffect(() => {
        GetBranchID()
    }, [])
    
    console.log(newUser);
    //PAGE ADD USER
    return (
        <Paper className={classes.PaperSize} elevation={4}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="AccountName"
                            name="AccountName"
                            label="Nama"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setNewUser({
                            ...newUser, 'fullname'  : e.target.value
                            })}
                        />
                        {erorMessage && <text style={{color:'red'}}>{fullname === '' && erorMessage}</text> }
                        
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="user-roles">Role</InputLabel>
                            <Select
                                labelId="user-roles"
                                label="Role"
                                id="UserRole"
                                value={role}
                                onChange={handleRole}
                            >
                                <MenuItem value={"adminRole"}>Admin</MenuItem>
                                <MenuItem value={"generalSupportRole"}>General Support</MenuItem>
                                <MenuItem value={"accountingRole"}>Accounting</MenuItem>
                                <MenuItem value={"userRole"}>User</MenuItem>
                            </Select>
                        </FormControl>
                        {erorMessage && <text style={{color:'red'}}>{role_id === 0 && erorMessage}</text> }
                    </Grid>
                    {
                        role === 'userRole' &&
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-roles">Branch</InputLabel>
                                <Select
                                    labelId="branchAgent"
                                    label="Branch"
                                    id="branchAgent"
                                    value={branch}
                                    onChange={handleBranch}
                                >
                                    {
                                        dataBranch.map((e)=> e.id !== 1 && <MenuItem value={e.branch_name}>{e.branch_name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            {erorMessage && <text style={{color:'red'}}>{branch_id === 0 && erorMessage}</text> }
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
                            id="UserName"
                            name="UserName"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setNewUser({...newUser, 'username'  : e.target.value})}
                        />
                        {erorMessage && <text style={{color:'red'}}>{username === '' && erorMessage}</text> }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="Password"
                            name="Password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                            onChange={(e)=>setNewUser({
                                ...newUser, 'password'  : e.target.value
                              })}
                        />
                        {erorMessage && <text style={{color:'red'}}>{password === '' && erorMessage}</text> }
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.BtnBack}
                        startIcon={<ArrowBackIosRoundedIcon />}
                        onClick={router.goBack()}
                    >
                        Kembali
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.BtnSave}
                        endIcon={<SaveRoundedIcon />}
                        onClick={PostCreateNewRole}
                    >
                        Simpan
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    
    );
}

export default function AddUser() {
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
            <FormAddUser />
        </ContentContainer>
    );
}