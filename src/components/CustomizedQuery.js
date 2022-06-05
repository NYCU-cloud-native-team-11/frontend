import { useState, useEffect } from 'react';
import * as React from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { DateRangePicker } from 'rsuite';
import 'rsuite/styles/index.less'; 
import 'rsuite/dist/rsuite.min.css'; 
import LineChart from '../chart/LineChart';
import moment from 'moment';
import api from '../API/api';

function CustomizedQuery() {

  function formateDate(_data){
    let date;
    let utcDate;

    for (let i = 0; i < _data.length; i++) {
      date = new Date(_data[i].date)
      // console.log("-8前", date)
      utcDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 8);
      // console.log("-8後", utcDate)
    
      // formatDate = moment(Date.parse(date)).format("YYYY-MM-DD")
      _data[i].date =  moment(Date.parse(utcDate)).format("YYYY-MM-DD HH:mm:ss");
    }
    
    return _data;
  }

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

  useEffect(() => {
    function getNewData(company, dateRange, setState) {
      const url = "/keywords/"+company+"/"+moment(Date.parse(dateRange[0])).format("YYYYMMDD")+"-"+moment(Date.parse(dateRange[1])).format("YYYYMMDD");
      // console.log(url)
      const fetchData = async () => {
        try {
          const response = await api.get(url)
          // console.log("tsmc 7 ", response.data)
          setState( formateDate(response.data) )
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

    getNewData("Applied Materials", dateRange, setAmData)
    getNewData("TSMC", dateRange, setTsmcData)
    getNewData("ASML", dateRange, setAsmlData)
    getNewData("SUMCO", dateRange, setSumcoData)
  }, [dateRange])

  const [ config, setConfig ] = useState({
    data: {
      datasets: []
    },
    options: {}
  })
  // console.log("config", config)

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
                // zone: "Asia/Taiwan", 
                // parser: function (utcMoment) {
                //   return moment(utcMoment).utcOffset('+0000');
                // }
              },
            }
        }
      }
    })
  }, [tsmcData, asmlData, sumcoData, amData])
  
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 1 }} marginBottom={5}>
        <Grid item>
          <p>選擇要查詢的日期區間，並按下OK</p>
        </Grid>
        <Grid item>
          <DateRangePicker value={dateRange} onChange={setDateRange} size='lg' />
        </Grid>
        </Grid>
        <Box marginTop={2} >
          <LineChart props={ config } />
        </Box>
      </Container>
    </Box>
  );
}

export default CustomizedQuery;