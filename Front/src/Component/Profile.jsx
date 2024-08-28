import  { useEffect, useState } from 'react';
import axios from 'axios';

const userName=window.localStorage.getItem("name");
const Profile = () => {
  const [user, setUser] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userName) {
      // Fetch user profile when component mounts
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/user/profile/${userName}`);
          setUser(response.data);
        //   setName(response.data.name);
        //   setEmail(response.data.email);
        } catch (error) {
          setMessage('Error fetching user profile');
        }
      };

      fetchUserProfile();
    } else {
      setMessage('No user logged in');
    }
  }, [userName]);

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/users/profile/${userId}`, {
//         name,
//         email,
//       });
//       setUser(response.data);
//       setMessage('Profile updated successfully');
//     } catch (error) {
//       setMessage('Error updating profile');
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      {/* <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div> */}
      {/* <button onClick={handleUpdateProfile}>Update Profile</button> */}
    </div>
  );
};

export default Profile;
