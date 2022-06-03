import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { DateRangePicker } from 'rsuite';
import 'rsuite/styles/index.less'; 
import 'rsuite/dist/rsuite.min.css'; 
import LineChart from '../chart/LineChart';
import moment from 'moment';
import api from '../API/api';


function CustomizedQuery() {

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3)
  const [dateRange, setDateRange] = React.useState([start, now]);
  // console.log(moment(Date.parse(dateRange[0])).format("YYYYMMDD"))

  const [tsmcData, setTsmcData] = useState([])
  const [asmlData, setAsmlData] = useState([])
  const [amData, setAmData] = useState([])
  const [sumcoData, setSumcoData] = useState([])
  // console.log(tsmcData)
  // console.log(asmlData)
  // console.log(amData)
  // console.log(sumcoData)

  function getNewData(company, dateRange, setState) {
    const url = "/keywords/"+company+"/"+moment(Date.parse(dateRange[0])).format("YYYYMMDD")+"-"+moment(Date.parse(dateRange[1])).format("YYYYMMDD");
    // console.log(url)
    const fetchData = async () => {
      try {
        const response = await api.get(url)
        // console.log("tsmc 7 ", response.data)
        setState( response.data )
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(`Error: ${error.message}`)
        }
      }
    }

    fetchData();
  }

  useEffect(() => {
    getNewData("Applied Materials", dateRange, setAmData)
    getNewData("TSMC", dateRange, setTsmcData)
    getNewData("ASML", dateRange, setAsmlData)
    getNewData("SUMCO", dateRange, setSumcoData)
  }, [dateRange])

  useEffect(() => {
    setConfig({
      data: {
        datasets: [
          {
            label: "Applied Materials",
            data: amData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(255, 165, 0, 1)",
            borderColor: "rgba(255, 165, 0, 1)"
          },
          {
            label: "ASML",
            data: asmlData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(60, 179, 113, 1)",
            borderColor: "rgba(60, 179, 113, 1)"
          },
          {
            label: "SUMCO",
            data: sumcoData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(106, 90, 205, 1)",
            borderColor: "rgba(106, 90, 205, 1)"
          },
          {
            label: "TSMC",
            data: tsmcData?.map((item) => ({x: item.date, y: item.count})),
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)"
          }
        ]
      },
      options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                   'hour': 'yyy-MM-DD HH:00'
                },
                parser: function (utcMoment) {
                  return moment(utcMoment).utcOffset('+0800');
                }
              }
            }
        }
      }
    })
  }, [tsmcData, asmlData, sumcoData, amData])

  const [ config, setConfig ] = useState({
    data: {
      datasets: []
    },
    options: {}
  })
  // console.log("config", config)
  
  return (
    <Box>
      <Container maxWidth="lg">
        <DateRangePicker value={dateRange} onChange={setDateRange} size='lg' />
        
        <Box marginTop={2} >
          <LineChart props={ config } />
        </Box>
      </Container>
    </Box>
  );
}

export default CustomizedQuery;