import React from 'react'
import style from './Home.module.css'
import FetcherProduct from '../FetcherProduct/FetcherProduct'
import MainSlider from '../MainSlider/MainSlider'
import CatogrySlider from '../CatogrySlider/CatogrySlider'

export default function Home() {
  return <>
        <MainSlider/>
        <CatogrySlider/>
        <FetcherProduct/>
  
  </>
}
