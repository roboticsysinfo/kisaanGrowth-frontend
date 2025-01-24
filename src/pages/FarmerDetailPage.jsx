import React from 'react'
import Preloader from '../helper/Preloader';
import ColorInit from '../helper/ColorInit';
import ScrollToTop from 'react-scroll-to-top';
import HeaderOne from '../components/HeaderOne';
import BreadcrumbTwo from '../components/BreadcrumbTwo';
import NewArrivalTwo from '../components/NewArrivalTwo';
import ShippingOne from '../components/ShippingOne';
import NewsletterOne from '../components/NewsletterOne';
import FooterOne from '../components/FooterOne';
import BottomFooter from '../components/BottomFooter';

const FarmerDetailPage = () => {
    return (
        <>
    
          {/* Preloader */}
          <Preloader />
    
          {/* ColorInit */}
          <ColorInit color={false} />
    
          {/* ScrollToTop */}
          <ScrollToTop smooth color="#299E60" />
    
          {/* HeaderOne */}
          <HeaderOne />
    
          {/* Breadcrumb */}
          <BreadcrumbTwo title={"Shop Details"} />
    
          {/* Farmer Detail section */}
          <FarmerDetailPage />
    
          {/* NewArrivalTwo */}
          <NewArrivalTwo />
    
          {/* ShippingOne */}
          <ShippingOne />
    
          {/* NewsletterOne */}
          <NewsletterOne />
    
          {/* FooterTwo */}
          <FooterOne />
    
          {/* BottomFooter */}
          <BottomFooter />
    
    
    
        </>
      );
}

export default FarmerDetailPage