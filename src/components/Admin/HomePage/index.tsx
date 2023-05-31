import { Link } from 'react-router-dom';

export const AdminHome = () => {
   return (
      <div className=''>
         <ul>
            <li>
               <Link to="/admin/users">Users</Link>
            </li>
            <li>
               <Link to="/admin/products">Products</Link>
            </li>
            <li>
               <Link to="/admin/categories-ages">Age Category</Link>
            </li>
            <li>
               <Link to="/admin/categories-branches">Branch Category</Link>
            </li>
            <li>
               <Link to="/admin/categories-skills">Skill category</Link>
            </li>
            <li>
               <Link to="/admin/orders">Orders</Link>
            </li>
         </ul>
      </div>
   );
};
