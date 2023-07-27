import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";

import "../../styles/Swipper.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
const Swipper = ({ slider_img, datail }) => {
  const videoEl = useRef(null);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  return (
    <div className="container" style={{height:600}}>
      <Swiper
        modules={[Navigation, EffectFade]}

        navigation={{
          prevEl: swiperNavPrevRef.current,
          nextEl: swiperNavNextRef.current,
        }}

        speed={800}
        slidesPerView={1}
        loop
        className="myswiper"
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = swiperNavPrevRef.current;
          swiper.params.navigation.nextEl = swiperNavNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >

        {datail &&
          slider_img.map((item, index) => {
            return (
              <SwiperSlide className="swiperslide" key={index} >
                {(()=>{
                  switch(item.slice(-3)){
                    case 'jpg':
                      return <img className="image" src={item} alt="slider-img"  />
                    default:
                      return <video
                      style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                      playsInline
                      loop
                      // muted
                      controls
                      alt="All the devices"
                      src={'https://uploads.storage.iran.liara.space/video_2023-07-22_17-35-58%20%282%29.mp4'}
                      ref={videoEl}
                    />
                  }
                })()}

              </SwiperSlide>
            );
          })}

        <div className="swiperNavPrev" ref={swiperNavPrevRef}></div>
        <div className="swiperNavNext" ref={swiperNavNextRef}></div>
      </Swiper>
    </div>
  );
};




export default Swipper;
