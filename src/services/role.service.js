import axios from 'axios';
import authHeader from './auth-header';

const createNewRole = process.env.REACT_APP_API_BASEURL + "/api/v1/user/create"

 
 class RoleService {
    async CreateNewRole (data){
        const {fullname, username, password, role_id, branch_id} = data
        try {
            const response = await axios.post(createNewRole,{
                fullname,
                username,
                password,
                role_id,
                branch_id,
                },{
                    headers : authHeader()
                })
            return response.data
        } catch (error) {
            return {error : true, msg: error}
        }
    }
 }
 
 export default new RoleService();


 
 