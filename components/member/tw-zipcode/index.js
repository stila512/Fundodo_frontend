import { useEffect, useState } from 'react'
import { countries, townships, postcodes } from './data-townships'

export default function TWZipCode({
  initPostcode = '',
  onPostcodeChange = (country, township, postcode) => { },
  onSelectionChange = (city, district) => { }
}) {
  //console.log(countries, townships, postcodes)

  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [countryIndex, setCountryIndex] = useState(-1)
  const [townshipIndex, setTownshipIndex] = useState(-1)

  // 郵遞區號使用字串(數字字串)
  const [postcode, setPostcode] = useState('')

  // 利用傳入時的initPostcode初始化用
  useEffect(() => {
    if (initPostcode) {
      setPostcode(initPostcode)
      // 使用initPostcode尋找對應的countryIndex, townshipIndex
      for (let i = 0; i < postcodes.length; i++) {
        for (let j = 0; j < postcodes[i].length; j++) {
          if (postcodes[i][j] === initPostcode) {
            setCountryIndex(i)
            setTownshipIndex(j)
            return // 跳出巢狀for迴圈
          }
        }
      }
    }
  }, [initPostcode])

  // 當countryIndex, townshipIndex均有值時，設定postcode值
  useEffect(() => {
    if (countryIndex > -1 && townshipIndex > -1) {
      const selectedCity = countries[countryIndex]
      const selectedDistrict = townships[countryIndex][townshipIndex]
      onSelectionChange(selectedCity, selectedDistrict)
      setPostcode(postcodes[countryIndex][townshipIndex])
    }
  }, [countryIndex, townshipIndex, onSelectionChange])

  // 當使用者改變的countryIndex, townshipIndex，使用onPostcodeChange回傳至父母元件
  useEffect(() => {
    if (postcode && postcode !== initPostcode) {
      onPostcodeChange(
        countries[countryIndex],
        townships[countryIndex][townshipIndex],
        postcode
      )
    }
  }, [postcode])

  return (
    <>
      <div className="d-flex gap-1">
        <select
          value={countryIndex}
          onChange={(e) => {
            const newCountryIndex = +e.target.value
            setCountryIndex(newCountryIndex)
            setTownshipIndex(-1)
            setPostcode('')
            if (newCountryIndex > -1) {
              onSelectionChange(countries[newCountryIndex], '') // 當選擇縣市時調用
            }
          }}
        >
          <option value="-1">選擇縣市</option>
          {countries.map((value, index) => (
            <option key={index} value={index}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={townshipIndex}
          onChange={(e) => {
            const newTownshipIndex = +e.target.value
            setTownshipIndex(newTownshipIndex)
            if (countryIndex > -1 && newTownshipIndex > -1) {
              onSelectionChange(
                countries[countryIndex],
                townships[countryIndex][newTownshipIndex]
              ) // 當選擇區域時調用
            }
          }}
        >
          <option value="-1">選擇區域</option>
          {countryIndex > -1 &&
            townships[countryIndex].map((value, index) => (
              <option key={index} value={index}>
                {value}
              </option>
            ))}
        </select>
      </div>
    </>
  )
}
