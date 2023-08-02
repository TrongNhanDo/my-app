import React from 'react';
import Banner from './banner';
import BaseOnAge from './base-on-age';
import BaseOnBranch from './base-on-branch';
import BaseOnSkill from './base-on-skill';
import Content1 from './content1';
import NewProducts from './new-products';

const HomePage = React.memo(() => {
   return (
      <div className="div-contai">
         <Banner />
         <Content1 />
         <NewProducts />
         <BaseOnAge />
         <BaseOnSkill />
         <BaseOnBranch />
      </div>
   );
});

export default HomePage;
