import api from "./api"
import { useState, useEffect } from "react"
import moment from 'moment';


function Last24Data() {

  const [tsmcData, setTsmcData] = useState([])
  const [asmlData, setAsmlData] = useState([])
  const [amData, setAmData] = useState([])
  const [sumcoData, setSumcoData] = useState([])

  // function formateDate(_data){
  //   let date;
  //   let utcDate;

  //   for (let i = 0; i < _data.length; i++) {
  //     date = new Date(_data[i].date)
  //     // console.log("-8前", date)
  //     utcDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 8);
  //     // console.log("-8後", utcDate)
    
  //     // formatDate = moment(Date.parse(date)).format("YYYY-MM-DD")
  //     _data[i].date =  moment(Date.parse(utcDate)).format("YYYY-MM-DD HH:mm:ss");
  //   }
    
  //   return _data;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/TSMC/last_24_hours")
        // console.log("tsmc 7 ", response.data)
        setTsmcData( response.data )
        // setTsmcData( formateDate(response.data) )
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
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/ASML/last_24_hours")
        // console.log("asml 7 ", response.data)
        setAsmlData( response.data )
        // setAsmlData( formateDate(response.data) )
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
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/SUMCO/last_24_hours")
        // console.log("SUMCO 7 ", response.data)
        setSumcoData( response.data )
        // setSumcoData( formateDate(response.data) )
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
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/Applied Materials/last_24_hours")
        // console.log("am 7 ", response.data)
        setAmData( response.data )
        // setAmData( formateDate(response.data) )
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
  }, [])
  
  return { tsmcData, asmlData, amData, sumcoData }
}

export default Last24Data;