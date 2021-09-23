import axios from 'axios';
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
            })
            return response.data
        } catch (error) {
            return {error : true, msg: error}
        }
    }
 }
 
 export default new RoleService();


 
 