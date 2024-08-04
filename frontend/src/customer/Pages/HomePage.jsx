import React from 'react';
import MainCarousel from '../carousels/carousel';
import HomeSectionCarousel from '../component/HomeSectionCarousel/HomeSection';
import Womens_Product from '../component/HomeSectionCard/WomenProduct/Womens_Product';
import Mens_Product from '../component/HomeSectionCard/Mens Product/Mens_Product';
import { Kids_Product } from '../component/HomeSectionCard/Kids Wear/Kids Product ';


const HomePage = () => {
  return (    
    <div>
      <MainCarousel />  
      <div class="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
            <HomeSectionCarousel data={Womens_Product} sectionName={"Women's Wear"}/>
            <HomeSectionCarousel data={Mens_Product} sectionName={"Men's Wear"}/>
            <HomeSectionCarousel data={Kids_Product} sectionName={"Kids Wear"}/>

        </div>
    </div>
  );
}

export default HomePage;
