import api from "./api"
import { useState, useEffect } from "react"


function CustomizedData() {

  const [tsmcData, setTsmcData] = useState([])
  const [asmlData, setAsmlData] = useState([])
  const [amData, setAmData] = useState([])
  const [sumcoData, setSumcoData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/keywords/TSMC/last_7_days")
        // console.log("tsmc 7 ", response.data)
        setTsmcData(response.data)
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
        const response = await api.get("/keywords/ASML/last_7_days")
        // console.log("asml 7 ", response.data)
        setAsmlData(response.data)
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
        const response = await api.get("/keywords/SUMCO/last_7_days")
        // console.log("SUMCO 7 ", response.data)
        setSumcoData(response.data)
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
        const response = await api.get("/keywords/Applied Materials/last_7_days")
        // console.log("am 7 ", response.data)
        setAmData(response.data)
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

export default CustomizedData;