import { useState, useEffect } from 'react';
import * as React from 'react';
import api from "./api";
import moment from 'moment';

function TrendData() {

  function sortDate(_data){
    let date;
    // let formatDate;
    _data.sort((a, b) => (a.date > b.date) ? 1 : -1); // sort data by date    
    for (let i = 0; i < _data.length; i++) {
      date = new Date(_data[i].date)
      // console.log("date", date)
      // formatDate = moment(Date.parse(date)).format("YYYY-MM-DD")
      _data[i].date =  moment(Date.parse(date)).format("YYYY-MM-DD");
    }
    
    return _data;
  }

  const [amData, setAmData]  = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/Applied Material") // 加S！
        // console.log(response.data)
        setAmData( sortDate(response.data) );
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

  const [asmlData, setAsmlData] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/ASML") 
        // console.log(response.data)
        setAsmlData( sortDate(response.data) );
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

  const [sumcoData, setSumcoData] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/SUMCO") 
        // console.log(response.data)
        setSumcoData( sortDate(response.data) );
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
  const [tsmcData, setTsmcData] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/TSMC")
        // console.log(response.data)
        setTsmcData( sortDate(response.data) );
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

  const [dates, setDates] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/")
        // console.log(response.data)
        let times = [];
        let sorted = sortDate(response.data)
        for (let i = 0; i < sorted.length; i++) {
          times.push(sorted[i].date)
        }
        let result = times.filter(function(element, index, arr){
          return arr.indexOf(element) === index;
        });
        setDates( result );
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

  // console.log("tsmc", tsmcData)
  // console.log("asml", asmlData)
  // console.log("am", amData)
  // console.log("sumco", sumcoData)
  // console.log("dates", dates)
  return { tsmcData, asmlData, amData, sumcoData, dates }
}

export default TrendData;
