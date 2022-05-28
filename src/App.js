import './App.css';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material'
import { Toolbar}  from '@mui/material';
import { Typography } from '@mui/material';
// import { UserData } from "./FakeData";
import LineChart from "./Chart/LineChart";
import api from './api';
import moment from 'moment';

function App() {
  // const [chartData, setChartData] = useState({});
  let amData = {
    label: "Applied Materials",
    data: [],
    backgroundColor: "rgba(255, 165, 0, 1)",
    borderColor: "rgba(255, 165, 0, 1)"
  };
  let asmlData = {
    label: "ASML",
    data: [],
    backgroundColor: "rgba(60, 179, 113, 1)",
    borderColor: "rgba(60, 179, 113, 1)"
  };
  let sumcoData = {
    label: "SUMCO",
    data: [],
    backgroundColor: "rgba(106, 90, 205, 1)",
    borderColor: "rgba(106, 90, 205, 1)"
  };
  let tsmcData = {
    label: "TSMC",
    data: [],
    backgroundColor: "rgba(75, 192, 192, 1)",
    borderColor: "rgba(75, 192, 192, 1)"
  };
  let timeLabels = [];

  const [data, setData] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/trends/")
        console.log(response.data)
        setData(response.data.data);
      } catch (error) {
        if (error.response){
          //  not in the 200 response range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    }

    fetchData();
  });

  if(data){
    let date;
    let formatedDate;
    data.sort((a, b) => (a.date > b.date) ? 1 : -1);

    for (let index = 0; index < data.length; index++) {
      // console.log("data: ", data[index])
      // we don't have to format the dates, but to sort them by date and add null to other company

      date = new Date(data[index].date);
      // console.log("old date: ", data[index].date)
      // console.log("date: ", Date.parse(date))
      formatedDate = moment(Date.parse(date)).format("YYYY-MM-DD")
      // console.log("formatedDate: ", formatedDate, " type: ", typeof(formatedDate) )

      data[index].date = formatedDate;
      switch (data[index].company) {
        case "TSMC":
          tsmcData.data.push( {x:data[index].date, y:data[index].count} );
          // asmlData.data.push(null);
          // sumcoData.data.push(null);
          // amData.data.push(null);
          break;
        case "ASML":
          // tsmcData.data.push(null);
          asmlData.data.push({x:data[index].date, y:data[index].count});
          // sumcoData.data.push(null);
          // amData.data.push(null);
          break;
        case "SUMCO":
          // tsmcData.data.push(null);
          // asmlData.data.push(null);
          sumcoData.data.push({x:data[index].date, y:data[index].count});
          // amData.data.push(null);
          break;
        case "Applied Materials":
          // tsmcData.data.push(null);
          // asmlData.data.push(null);
          // sumcoData.data.push(null);
          amData.data.push({x:data[index].date, y:data[index].count});
          break;
        default:
          break;
      }
    }
    // console.log("分類data")
    // console.log('tsmc: ', tsmcData)
    // console.log('asml: ', asmlData)
    // console.log('sumco: ', sumcoData)
    // console.log('applied materials: ', amData)
  }
  // const labels = ['2022-05-20', '2022-05-21', '2022-05-22', '2022-05-24', '2022-05-26', '2022-05-28', '2022-05-30'];
    console.log('tsmc: ', tsmcData)
    console.log('asml: ', asmlData)
    console.log('sumco: ', sumcoData)
    console.log('applied materials: ', amData)

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
            <LineChart chartData={ { datasets: [tsmcData, asmlData, sumcoData, amData]} } />
          </Box>
        </Container>
      </Box>
  );
}

export default App;
