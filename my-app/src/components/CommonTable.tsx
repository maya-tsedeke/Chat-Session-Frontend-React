import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, TablePagination, Avatar } from '@mui/material';
import { ChatSession, TableDataItem, User } from '../types';
import './CommonTable.css'; // Import the CSS file for styling

type CommonTableProps = {
  data: TableDataItem[];
};

const CommonTable: React.FC<CommonTableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loadedData, setLoadedData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    // Simulating data fetch from JSON
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        const { users, chatSessions } = jsonData;
        const mergedData = [...users, ...chatSessions];
        setLoadedData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = loadedData.filter((item: TableDataItem) => {
    // Filter the data based on the search text
    if (item.hasOwnProperty('email')) {
      const user = item as User;
      return user.email.toLowerCase().includes(searchText.toLowerCase());
    } else if (item.hasOwnProperty('name')) {
      const chatSession = item as ChatSession;
      return chatSession.name.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    // Handle page change
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle rows per page change
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-container">
      <h2>User List and Chat Messages</h2>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {loadedData[0]?.hasOwnProperty('email') && <TableCell>Email</TableCell>}
              {loadedData[0]?.hasOwnProperty('password') && <TableCell>Password</TableCell>}
              {loadedData[0]?.hasOwnProperty('name') && <TableCell>Name</TableCell>}
              {loadedData[0]?.hasOwnProperty('avatar') && <TableCell>Profile Photo</TableCell>}
              {/* Add more table header cells for other properties */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: TableDataItem) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                {item.hasOwnProperty('email') && <TableCell>{(item as User).email}</TableCell>}
                {item.hasOwnProperty('password') && <TableCell>{(item as User).password}</TableCell>}
                {item.hasOwnProperty('name') && <TableCell>{(item as ChatSession).name}</TableCell>}
                {item.hasOwnProperty('avatar') && (
                  <TableCell>
                    <Avatar src={(item as User).avatar} alt="Profile Photo" />
                  </TableCell>
                )}
                {/* Add more table cells for other properties */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

  
      {/* Add the second table for chat messages here */}
    </div>
  );
};

export default CommonTable;
