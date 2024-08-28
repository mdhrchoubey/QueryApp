import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const userName=window.localStorage.getItem("name");
const Mainlogin=()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (role==="admin"){

          if (email === 'admin' && password === 'password') {
            // localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', email);
            // Login successful, redirect to admin dashboard
            console.log('Login successful');
            alert("done")
            
            navigate('/adminDash');
        } else {
            setError('Invalid username or password');
        }

          // login successful
          alert("done")
          navigate("/adminDash");
          // window.localStorage.setItem('name', response.data.name);
          // window.localStorage.setItem('userId', response.data._id);
          
        }
        try {
          const response = await axios.post("http://localhost:8080/user/login", {
            email,
            password,
            role
          });
          
          if (role==="student"){
            // login successful
            alert("done")
            navigate("/studentDash");
            window.localStorage.setItem('name', email);
            // window.localStorage.setItem('_id',_id );
          } 
          if (role==="teacher"){

            
            // login successful
            alert("done")
            navigate("/teacherDash");
            window.localStorage.setItem('name', email);
            // window.localStorage.setItem('userId', response.data._id);
            
          }
         
          else{
            setError("Invalid email or password");
          }
        } catch (error) {
          setError("Error occurred while logging in");
        }
        
      };
    
    
    return(
        <>
        <div className="container">
    <div className="left-side">
      <h1>Sign in</h1>
      <div className="social-buttons">
        <button><i className="fab fa-facebook-f"></i></button>
        <button><i className="fab fa-google-plus-g"></i></button>
        <button><i className="fab fa-linkedin-in"></i></button>
      </div>
      <p>or use your account</p>
      <form onSubmit={handleLogin}>
        <div className="form-group">
       
          <label >Email:</label>
          <input type="text" id="email" placeholder="Enter your email"
           name="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
        </div>
        <div className="form-group">
          <label >Password:</label>
          <input type="password" id="password" placeholder="Enter your password"
           name="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <select name="gender" value={role.gender} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="teacher">teacher</option>
            <option value="student">student</option>
            <option value="admin">Admin</option>
          </select>
        <a href="#"><Link style={{color:"red"}} to="/forgetpassword">Forget Password?</Link></a>
        <br/>
        <button type="submit">SIGN IN</button>
      </form>
    </div>
    <div className="right-side">
      <h1>Hello, Students!</h1>
      <p>Enter your personal details and start journey with us</p>
      <button><Link style={{color:"whitesmoke"}} to="/signup">Signup</Link></button>
    </div>
  </div>
        
        </>
    )
}
export default Mainlogin