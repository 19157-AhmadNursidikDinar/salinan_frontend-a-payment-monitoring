import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASEURL + "/api/v1/branch"

class BranchService {
    async getAllBranch() {
        try {
            const response = await axios.get(apiUrl)
            if (response.data && response.data.data.length > 0){
                return response.data
            }
        } catch (error) {
            return { error }
        }
    }

    async insertBranch({ branchName }) {
        try {
            const response = await axios.post(apiUrl, {
                branch_name: branchName
            })
            if (response.data){
                return response.data
            }
        } catch (error) {
            return { error }
        }
    }
}

export default new BranchService();