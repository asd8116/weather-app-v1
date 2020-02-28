import React from 'react'
import styled from '@emotion/styled'

import WeatherIcon from './WeatherIcon.js'
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as Refresh } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'
import { ReactComponent as CogIcon } from './images/cog.svg'

const WeatherCard = props => {
  const { cityName, weatherElement, moment, fetchData, setCurrentPage } = props

  // STEP 3：將 weatherElement 中的資料透過解構賦值取出後，放置到 JSX 中使用
  const {
    observationTime,
    // locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading
  } = weatherElement

  return (
    <WeatherCardWrapper>
      <Cog onClick={() => setCurrentPage('WeatherSetting')} />

      <Location>{cityName}</Location>

      <Description>
        {description} {comfortability}
      </Description>

      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>

        <WeatherIcon currentWeatherCode={weatherCode} moment={moment || 'day'} />
      </CurrentWeather>

      <AirFlow>
        <AirFlowIcon />
        {windSpeed} m/h
      </AirFlow>

      <Rain>
        <RainIcon />
        {Math.round(rainPossibility)}%
      </Rain>

      <Redo onClick={fetchData} isLoading={isLoading}>
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric'
        }).format(new Date(observationTime))}{' '}
        {/* STEP 2：當 isLoading 的時候顯示 LoadingIcon 否則顯示 Refresh */}
        {isLoading ? <LoadingIcon /> : <Refresh />}
      </Redo>
    </WeatherCardWrapper>
  )
}

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;

    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`

export default WeatherCard
