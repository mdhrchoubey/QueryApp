import React, { useState, useEffect } from 'react';
import './AdminDash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adduser from './Adduser';

import Header from './Header';
import Footer from './Component/Footer';

const userName=window.localStorage.getItem("name");


const AdminDash = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherList, setTeacherList]=useState([])
  const [displayTeacher, setDisplayTeacher]=useState([]);
  const[taskData,setTaskData]=useState([]); 
  const [refresh, setRefresh] = useState(false);


  const navigate = useNavigate();


  const Logout=()=>{
    window.localStorage.clear();
    navigate("/")
  }

  const Display=()=>{
    let url="http://localhost:8080/user/displayStudent";
    axios.get(url).then((res)=>{
        console.log(res.data)
        setTeacherList(res.data)
    })
    
};
useEffect(()=>{
    Display()
},[])


const DisplayTeacher=()=>{
    let url="http://localhost:8080/user/displayTeacher";
    axios.get(url).then((res)=>{
        console.log(res.data)
        setDisplayTeacher(res.data)
    })
    
};
useEffect(()=>{
    DisplayTeacher()
},[])

const [query, setQuery]=useState([]);

    const displayQuery=()=>{
        let url="http://localhost:8080/query/displayQuery";
        axios.get(url).then((res)=>{
            console.log(res.data)
            setQuery(res.data)
        })
    }
    useEffect(() => {
        displayQuery();
      }, []);

      const handleToggleStatus = async (id, status) => {
        try {
          const newStatus = status === 'pending' ? 'completed': 'pending';
          const updatedTodo = await axios.put(`http://localhost:8080/query/Display/${id}`, { status: newStatus });
          setTaskData(taskData.map(todo => (todo._id === id ? updatedTodo.data : todo)));
        } catch (error) {
          console.error(error);
        }
      };

      const handleClick = () => {
        setRefresh(!refresh);
      };
      
      useEffect(() => {
        displayQuery();
      }, [refresh]);

  return (
    <>
    <Header/>
    <div className="dashboard-container">
      <sidebar className="sidebar">
        {/* <div className="logo">Admin Dashboard</div> */}
        <nav>
          <ul>
            <li 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <i className="icon profile-icon">👤</i>
              <span>Profile</span>
            </li>
            <li 
              className={activeTab === 'results' ? 'active' : ''}
              onClick={() => setActiveTab('results')}
            >
              <i className="icon results-icon">📊</i>
              <span>Results</span>
            </li>
            <li 
              className={activeTab === 'Query' ? 'active' : ''}
              onClick={() => setActiveTab('Query')}
            >
              <i className="icon query-icon">📊</i>
              <span>Query</span>
            </li>
           
            <li 
              className={activeTab === 'adduser' ? 'active' : ''}
              onClick={() => setActiveTab('adduser')}
            >
              <i className="icon query-icon">📊</i>
              <span>Adduser</span>
            </li>
            {/* <li 
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              <i className="icon query-icon">📊</i>
              <span>Password</span>
            </li> */}
            <li>
            {/* <button onClick={Logout}>Logout</button> */}
            </li>
          </ul>
        </nav>
      </sidebar>
      <main className="main-content">
        {activeTab === 'profile' && (
          <div className="profile-content">
            <h2 style={{textAlign:"center", color:"red"}}>School Summery</h2>
            <hr/>
            {/* Add profile content here */}
            {/* {userName} */}
           <div> <h2 style={{textAlign:"center"}}>
           Student List
           </h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherList.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>{key.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>
            <hr/>
            <div><h2 style={{textAlign:"center"}}>
            Teacher List
            </h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTeacher.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>{key.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
        )}
        {activeTab === 'results' && (
          <div className="results-content">
            <h2>Academic Results</h2>
            {/* Add results content here */}
          </div>
        )}
        {activeTab === 'Query' && (
          <div className="Query-content">
            <div style={{display:'flex', justifyContent:"space-around", width:"48%"}} >
            <h2>Query_Update</h2>
            <h4 ><td className="table-cell">
          <button onClick={handleClick} className="refresh-button">
            Refresh
          </button>
        </td></h4>
            </div>
            <table className="table">
  <thead>
    <tr>
      <th className="table-header">Message</th>
      <th className="table-header">Sender</th>
      {/* <th className="table-header">Receiver</th> */}
      <th className="table-header">Rply</th>
      <th className="table-header">Pending/Completed</th>
      <th className="table-header">Status</th>
      {/* <th className="table-header">Refresh</th> */}
    </tr>
  </thead>
  <tbody>
    {query.map((key) => (
      <tr key={key._id} className="table-row">
        <td className="table-cell">{key.message}</td>
        <td className="table-cell">{key.sender}</td>
        {/* <td className="table-cell">{key.receiver}</td> */}
        <td className="table-cell">
          <button className="reply-button">Reply</button>
        </td>

        {key.status === "pending" && (
          <td className="table-cell">
            <a>
              <div
                className="status pending"
                style={{ color: "orangered", fontWeight: "600" }}
              >
                {key.status}
              </div>
            </a>
          </td>
        )}
        {key.status === "completed" && (
          <td className="table-cell">
            <a>
              <div
                className="status completed"
                style={{ color: "#4CBB17" }}
              >
                {key.status}
              </div>
            </a>
          </td>
        )}
        <td className="table-cell">
          <button
            onClick={() => handleToggleStatus(key._id, key.status)}
            className="status-button"
            style={{ "--clr": "#00ad54" }}
          >
            <span className="button-decor"></span>
            <div className="button-content">
              <div className="button__icon">
                <i
                  className="fa-regular fa-circle-check"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              <span className="button__text">Status</span>
            </div>
          </button>
        </td>

        {/* <td className="table-cell">
          <button onClick={handleClick} className="refresh-button">
            Refresh
          </button>
        </td> */}
      </tr>
    ))}
  </tbody>
</table>
          </div>
          
        )}
        {activeTab === 'adduser' && (
          <div className="results-content">
            <h2>Add User</h2>
            {/* Add results content here */}
            <Adduser/>
          </div>
        )}

        
        
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDash;