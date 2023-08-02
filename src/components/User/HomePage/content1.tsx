import React from 'react';
import { Link } from 'react-router-dom';

const Content1 = React.memo(() => {
   return (
      <>
         <div className="flex w-full justify-around mt-4">
            <Link to="/warranty" className="block w-1/6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/DOI-TRA-300x300_umgjyo.png"
                  alt=""
                  className="w-full"
               />
            </Link>
            <Link to="/free-gift-wrapping" className="block w-1/6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709993/childrenToy/GOI-QUA-300x300_ytejg5.png"
                  alt=""
                  className="w-full"
               />
            </Link>
            <Link to="/genuine-product" className="block w-1/6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/CHINH-HANG-300x300_diipjf.png"
                  alt=""
                  className="w-full"
               />
            </Link>
            <Link to="/express-delivery" className="block w-1/6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/VAN-CHUYEN-300x300_gquwoj.png"
                  alt=""
                  className="w-full"
               />
            </Link>
         </div>
      </>
   );
});

export default Content1;
