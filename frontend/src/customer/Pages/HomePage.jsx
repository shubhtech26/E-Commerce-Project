import React from 'react';
import MainCarousel from '../carousels/carousel';
import HomeSectionCarousel from '../component/HomeSectionCarousel/HomeSection';
import { mens_kurta } from '../data/Mens_Kurta';
import { women_dress } from '../data/womens product/womens_dress';


const HomePage = () => {
  return (    
    <div>
      <MainCarousel />  
      <div class="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
            <HomeSectionCarousel data={women_dress} sectionName={"Women Wear"}/>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Wear"}/>

        </div>
    </div>
  );
}

export default HomePage;
