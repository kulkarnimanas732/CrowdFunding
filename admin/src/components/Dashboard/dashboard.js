import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import './dashboard.css';
import LoaderJSX from '../Loader/Loader';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [buttonStates, setButtonStates] = useState({});
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/getallusers', {
          headers: {
            Authorization: token,
          },
        });
        return response;
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers().then(async (response) => {
      if (response.status === 200) {
        const usersWithBase64Documents = await Promise.all(response.data.map(async (user) => {
          if (user.document) {
            const base64Document = await getDocumentAsBase64(user._id);
            return { ...user, documentBase64: base64Document };
          }
          return user;
        }));

        setUsers(usersWithBase64Documents);

      }
    });
  }, [setUsers]);

  const getDocumentAsBase64 = useCallback(async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/auth/getuserdocument/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data.document;
     
    } catch (error) {
      console.error('Error fetching document:', error);
      return null;
    }
  }, []);

  const handleVerifyDocument = useCallback(async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
       await axios.post(
        `http://localhost:5000/api/auth/verify-document/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      ).then((response)=>setLoading(false));
      // const response =
      // console.log('Response', response);
      // if(response.status === 200){
      //   console.log('Document Verified');
      //   setLoading(false);
      // }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, documentVerified: true } : user
        )
      );
      setButtonStates((prevStates) => ({
        ...prevStates,
        [userId]: 'verified'
      }));
      setSelectedButton('verify');
      window.location.reload();
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  }, []);

  const handleUnverifyDocument = useCallback(async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/auth/unverify-document/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      ).then((response)=>setLoading(false));

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, documentUnverified: true } : user
        )
      );
      setButtonStates((prevStates) => ({
        ...prevStates,
        [userId]: 'unverified'
      }));
      setSelectedButton('unverify');
      window.location.reload();
    } catch (error) {
      console.error('Error verifying document:', error);
    }
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleSidebar = useCallback(() => {
    setOpenSidebarToggle(!openSidebarToggle);
  }, [openSidebarToggle]);

  return (

    loading ?
    <LoaderJSX/>
    :
    <div className='dashboard-container'>
      <Header OpenSidebar={toggleSidebar} />
      <div className='content-container'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Box style={{ padding: '20px', width: '90%' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Document</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(0).reverse().map((user) => (
                    <TableRow key={user._id}>
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.type}</TableCell>
                      <TableCell align="left">
                        <Link
                          style={{ textDecoration: 'none' }}
                          href={user.documentBase64}
                          target={'_blank'}
                          rel="noopener noreferrer"
                          onClick={refreshPage}
                        >
                          View Document
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                          {buttonStates[user._id] !== 'verified' ? (
                            !user.documentVerified && <Button
                              style={{ backgroundColor: '#02A95C', color: '#FFFFFF' }}
                              onClick={() => {
                                handleVerifyDocument(user._id);
                                setSelectedButton('verify');
                              }}
                            >
                              Verify Document
                            </Button>
                          ) : null}
                          {buttonStates[user._id] !== 'unverified' ? (
                            !user.documentUnverified && <Button
                              style={{ backgroundColor: 'red', color: '#FFFFFF' }}
                              onClick={() => {
                                handleUnverifyDocument(user._id);
                                setSelectedButton('unverify');
                              }}
                            >
                              Unverify Document
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
