import React, { useState, useEffect } from 'react';
import './AdminDash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adduser from './Adduser';

import Header from './Header';
import Footer from './Component/Footer';
import AdminPassword from './AdminPasswordReset';
// import ForgetPassword from './Login/ForgetPassword';

const userName=window.localStorage.getItem("name");


const AdminDash = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherList, setTeacherList]=useState([])
  const [displayTeacher, setDisplayTeacher]=useState([]);
  // const[taskData,setTaskData]=useState([]); 
  const [refresh, setRefresh] = useState(false);




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


      const handleClick = () => {
        setRefresh(!refresh);
      };
      
      useEffect(() => {
        displayQuery();
      }, [refresh]);

      const reset=()=>{
        
      }

      const PopupWindow = ({ trigger, content, title }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        const togglePopup = () => setIsOpen(!isOpen);
      
        return (
          <>
            {React.cloneElement(trigger, { onClick: togglePopup })}
            
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:max-w-md mx-auto">
                  <div className="border-b px-4 py-2 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    {/* <button onClick={togglePopup} className="text-black close-btn"> */}
                      {/* <X size={24} /> */}
                    {/* </button> */}
                  </div>
                  <div className="p-4">
                    {content}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      };




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
              <span>Teacher List</span>
            </li>
            <li 
              className={activeTab === 'results' ? 'active' : ''}
              onClick={() => setActiveTab('results')}
            >
              <i className="icon results-icon"></i>
              <span>Student List</span>
            </li>
            <li 
              className={activeTab === 'Query' ? 'active' : ''}
              onClick={() => setActiveTab('Query')}
            >
              <i className="icon query-icon"></i>
              <span>Query</span>
            </li>
           
            <li 
              className={activeTab === 'adduser' ? 'active' : ''}
              onClick={() => setActiveTab('adduser')}
            >
              <i className="icon query-icon"></i>
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
            <h2 style={{textAlign:"center", color:"red"}}>Teacher List</h2>
            <hr/>
            {/* Add profile content here */}
            {/* {userName} */}
          
            {/* <hr/> */}
            <div>
              {/* <h2 style={{textAlign:"center"}}>
            Teacher List
            </h2> */}
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Reset Password</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTeacher.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>
                            <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Popup Window Example</h1> */}
      <PopupWindow
        trigger={<button className="popup">
          Reset
        </button>}
        content={<AdminPassword/>}
        // title="Example Popup"
      />
    </div>
                              
                              {/* <button onClick={reset}>Reset Password</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
        )}
        {activeTab === 'results' && (
          <div className="results-content">
            {/* <h2>Academic Results</h2> */}
            <div> <h2 style={{textAlign:"center", color:"red"}}>
           Student List
           </h2>
           <hr/>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Reset Password</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherList.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>
                            <PopupWindow
        trigger={<button className="popup">
          Reset
        </button>}
        content={<AdminPassword/>}
        // title="Example Popup"
      />
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>
          </div>
        )}
        {activeTab === 'Query' && (<>

<div className="Query_Update" >
<div style={{display:'flex', justifyContent:"space-around", width:"48%"}} >
<h2>Query_Update</h2>
<h4 ><td className="table-cell" style={{border:"none"}}>
<button onClick={handleClick} className="refresh-button">
Refresh
</button>
</td></h4>
</div>

<hr/>



<table className="table">
<thead>
<tr>
<th className="table-header">Message</th>
<th className="table-header">Sender</th>

<th className="table-header">Pending/Completed</th>

</tr>
</thead>
<tbody>
{query.map((key) => (
<tr key={key._id} className="table-row">
<td className="table-cell">{key.message}</td>
<td className="table-cell">{key.sender}</td>

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


</tr>
))}
</tbody>
</table>

</div>
</>
          
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