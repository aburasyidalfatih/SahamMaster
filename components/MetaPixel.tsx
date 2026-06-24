import { useEffect } from 'react';

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

let isPixelLoaded = false;

export const MetaPixel = () => {
  useEffect(() => {
    if (isPixelLoaded) return;

    const initPixel = async () => {
      try {
        const response = await fetch('/api/config/tracking');
        if (!response.ok) return;
        
        const data = await response.json();
        
        if (data.is_active && data.meta_pixel_id) {
          const pixelId = data.meta_pixel_id;
          
          // Load Pixel Script
          !function(f:any,b:any,e:any,v:any,n:any,t:any,s:any){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          
          window.fbq('init', pixelId);
          window.fbq('track', 'PageView');
          
          isPixelLoaded = true;
        }
      } catch (error) {
        console.error('Failed to load Meta Pixel', error);
      }
    };

    initPixel();
  }, []);

  return null;
};

export const trackEvent = (eventName: string, data: any = {}, eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', eventName, data, { eventID: eventId });
    } else {
      window.fbq('track', eventName, data);
    }
  }
};
