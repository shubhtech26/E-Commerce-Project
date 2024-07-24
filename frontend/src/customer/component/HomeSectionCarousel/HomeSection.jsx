import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';  //Import CSS for AliceCarousel
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const HomeSectionCarousel = ({data,sectionName}) => {
     const [activeIndex, setActiveIndex] = useState(0);

     const responsive = {
         0: { items: 1 },
         720: { items: 3 },
         1024: { items: 5.5 },
     };

     const slidePrev = () => setActiveIndex(activeIndex - 1);
     const slideNext = () => setActiveIndex(activeIndex + 1)

     const syncActiveIndex = ({ item }) => setActiveIndex(item);

     const items = data.slice(0,10).map((item) => 
         <HomeSectionCard  product={item} key={item.id} />);

     return (
         <div className="relative px-4 lg:px-8">
             <h2 className="text-2xl font-extrabold text-gray-800 uppercase py-5">
                          {sectionName}
             </h2>
             <div className="relative p-4 h-96">
                 <AliceCarousel
                     items={items}
                     controlsStrategy="alternate"
                     disableButtonsControls
                     responsive={responsive}
                     disableDotsControls
                     onSlideChanged={syncActiveIndex}  Corrected event name
                     activeIndex={activeIndex}
                     autoWidth
                 />
                {activeIndex!==items.length-5 && <Button
                     variant="contained"
                     className="z-50 bg-white"
                     onClick={slideNext}
                     sx={{
                           position: 'absolute',
                           top: '8rem',
                           right: '0rem',
                           transform: 'translateX(50%) rotate(90deg)',
                           bgcolor: 'white',
                     }}
                    
                 >
                     <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)', color: 'black' }} />
                 </Button>}

                 <Button
                     variant="contained"
                     className="z-50 bg-white"
                     onClick={slidePrev}
                     sx={{
                         position: 'absolute',
                         top: '8rem',
                         left: '0rem',
                         transform: 'translateX(50%) rotate(-90deg)',
                         bgcolor: 'white',
                     }}
                    
                 >
                     <KeyboardArrowLeftIcon 
                         sx={{ transform: 'rotate(90deg)', color: 'black' }} />
                 </Button>
             </div>
         </div>
     );
 };
 
export default HomeSectionCarousel;
