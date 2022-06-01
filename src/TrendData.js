import { useState, useEffect } from 'react';
import * as React from 'react';
import api from "./api";
import moment from 'moment';

function TrendData() {

  // async function fetchData(_url, _setState){
  //   try {
  //     const response = await api.get(_url);
  //     // console.log(response.data);
  //     // console.log(response.status);
  //     _setState(response.data)
  //     return response.data.data
  //   } catch (error) {
  //     if (error.response){
  //       //  not in the 200 response range
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else {
  //       console.log(`Error: ${error.message}`);
  //     }
  //     return error.response.data
  //   }
  // }

  // const [amData, setAmData]  = useState([]);
  // const [asmlData, setAsmlData] = useState([]);
  // const [sumcoData, setSumcoData] = useState([]);
  // const [tsmcData, setTsmcData] = useState([]);

  // useEffect(()=>{
  //   fetchData("keywords/Applied Material", setAmData)
  //   fetchData("keywords/ASML", setAsmlData)
  //   fetchData("keywords/TSMC", setTsmcData)
  //   fetchData("keywords/SUMCO", setSumcoData)
  // }, [])


  function sortDate(_data){
    let date;
    let formatDate;
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

  const [label, setLabel] = useState(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/")
        // console.log(response.data)
        let dates = [];
        let sorted = sortDate(response.data)
        for (let i = 0; i < sorted.length; i++) {
          dates.push(sorted[i].date)
        }
        let result = dates.filter(function(element, index, arr){
          return arr.indexOf(element) === index;
        });
        setLabel( result );
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
  // console.log(label)
  return { tsmcData, asmlData, amData, sumcoData, label }
}

export default TrendData;
