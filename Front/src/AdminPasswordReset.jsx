import axios from "axios";
import { useState,useEffect } from "react"
import { Link } from "react-router-dom";



const AdminPasswordReset=()=>{

    const [userdata, setUserData]=useState([])

    const DisplayUser=()=>{
      
        
        let url="http://localhost:8080/user/displayAllUser";
        axios.get(url).then((res)=>{
            console.log(res.data)
            setUserData(res.data)
        })
    };

    useEffect(()=>{
        DisplayUser()
    },[])

    const ResetPassword = (email) => {
        
        const response = axios.post('http://localhost:8080/user/forgetpassword', { email });
        console.log(response.data);
      };
    

    return(
        <>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Reset Password</th>
            </tr>
        </thead>
        <tbody>
            {userdata.map((key)=>(
                <tr key={key._id}>
                    <td>{key.name}</td>
                    <td>{key.email}</td>
                    <td>{key.gender}</td>
                    <td>{key.role}</td>
                    <td><button><Link style={{color:"white"}} to="forgetpasswordAdmin" >Reset Password</Link></button></td>
                    
                </tr>
            ))}
            
        </tbody>
        </table>        
        </>
    )
}
export default AdminPasswordReset