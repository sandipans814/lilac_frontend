import { toast } from "react-toastify";
import { useAxios } from "../../axios-utils";

export const UsersCard = ({ data }) => {
    const {id, firstName, lastName, gender, roles, email} = data;
    const userInstance = useAxios(`http://localhost:8080/api/users/${id}`)

    const deleteUser = async () => {
        try {
            const res = await userInstance.delete();
            toast.success(res.data.message);
        } catch(e) {
            toast.error("Some error occurred. Please try again later.")
        }
    }

    return (
        <div class="card text-dark bg-light my-2">
            <div class="card-header">
                <div className="d-flex align-items-center justify-content-between">
                    <div><span style={{'fontWeight': 'bold'}}>USER ID:</span>  {id}</div>
                    <div>
                    <button className="btn-warning btn mx-1">Edit User</button>
                    <button className="btn-danger btn mx-1" onClick={deleteUser}>Delete User</button>
                    </div>  
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{firstName + " " + lastName}</h5>
                <p class="card-text">
                    {email} <br/>
                    {gender} <br/>
                    {roles[0].name.split("_")[1]}
                </p>
            </div>
        </div>
    )
}