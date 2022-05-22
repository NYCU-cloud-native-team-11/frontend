import './App.css';
import { useState } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
import { UserData } from "./Data";
import LineChart from "./components/LineChart";


function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Count",
        data: UserData.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
        ],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  });

  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NYCU Cloud Native Development
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box marginTop={3} >
            <LineChart chartData={userData} />
          </Box>
        </Container>
      </Box>
  );
}

export default App;
