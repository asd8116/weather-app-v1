// STEP 1：載入會用到的 React Hooks
import { useState, useEffect, useCallback } from 'react'

// One API
const fetchCurrentWeather = locationName => {
  // STEP 3-1：加上 return 直接把 fetch API 回傳的 Promise 回傳出去
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-6FD02158-D758-4311-AA0A-C5CDE6764DA4&locationName=${locationName}`
  )
    .then(response => response.json())
    .then(data => {
      const locationData = data.records.location[0]

      const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
        if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
          neededElements[item.elementName] = item.elementValue
        }
        return neededElements
      }, {})

      // STEP 3-2：把取得的資料內容回傳出去，而不是在這裡 setWeatherElement
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD
      }
    })
}

// Two API
const fetchWeatherForecast = cityName => {
  // STEP 4-1：加上 return 直接把 fetch API 回傳的 Promise 回傳出去
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-6FD02158-D758-4311-AA0A-C5CDE6764DA4&locationName=${cityName}`
  )
    .then(response => response.json())
    .then(data => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
        if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
          neededElements[item.elementName] = item.time[0].parameter
        }
        return neededElements
      }, {})

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
      }
    })
}

const useWeatherApi = currentLocation => {
  const { locationName, cityName } = currentLocation

  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true
  })

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName)
      ])

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false
      })
    }

    setWeatherElement(prevState => ({
      ...prevState,
      isLoading: true
    }))

    fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    console.log('execute function in useEffect111')

    fetchData()
  }, [fetchData])

  // console.log(weatherElement);

  return [weatherElement, fetchData]
}

export default useWeatherApi
