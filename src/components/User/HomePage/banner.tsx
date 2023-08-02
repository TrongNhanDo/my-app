import React from 'react';

const Banner = React.memo(() => {
   return (
      <div>
         <img
            src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686702424/childrenToy/banner1_l7suyv.jpg"
            alt=""
            className="w-full"
         />
      </div>
   );
});

export default Banner;
