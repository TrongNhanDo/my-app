import { useContext, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LoginForm from './components/User/Account/Login/login-form';
import RegisterFrom from './components/User/Account/Register/register-form';
import Header from './components/User/Layout/Header/header';
import HomePage from './components/User/HomePage';
import AdminHome from './components/Admin/HomePage';
import UserList from './components/Admin/Account/UserList/user-list';
import PageNotFound from './components/Common/Error/error';
import UserDetail from './components/Admin/Account/UserDetail/user-detail';
import AddNewUser from './components/Admin/Account/UserList/add-user';
import ProductList from './components/Admin/Product/ProductList/product-list';
import ProductDetail from './components/Admin/Product/ProductDetail/product-detail';
import AddProduct from './components/Admin/Product/ProductList/add-product';
import AgeCategoryList from './components/Admin/Category/Age/AgeList/age-list';
import AgeCategoryDetail from './components/Admin/Category/Age/AgeDetail/age-detail';
import AddAgeCategory from './components/Admin/Category/Age/AgeAdd/add-age-category';
import BranchList from './components/Admin/Category/Branch/BranchList/branch-list';
import BranchCategoryDetail from './components/Admin/Category/Branch/BranchDetail/branch-detail';
import AddBranchCategory from './components/Admin/Category/Branch/AddBranch/add-branch-category';
import SkillList from './components/Admin/Category/Skill/SkillList/skill-list';
import SkillCategoryDetail from './components/Admin/Category/Skill/SkillDetail/skill-detail';
import AddSkillCategory from './components/Admin/Category/Skill/AddSkill/add-skill-category';
import RoleList from './components/Admin/Role/RoleList/role-list';
import RoleDetail from './components/Admin/Role/RoleDetail/role-detail';
import AddRole from './components/Admin/Role/RoleAdd/add-role';
import Footer from './components/User/Layout/Footer/footer';
import About from './components/User/About';
import Contact from './components/User/Contact';
import ShoppingGuide from './components/User/Customer/ShoppingGuide';
import QuestionsFrequently from './components/User/Customer/Questions';
import Policy from './components/User/Customer/Policy';
import Warranty from './components/User/Customer/Warranty';
import Security from './components/User/Customer/Security';
import DeliveryPayment from './components/User/Customer/DeliveryPayment';
import UserProductList from './components/User/Product/product-list';
import UserProductDetail from './components/User/Product/product-detail';
import CartList from './components/User/Cart';
import MyAccount from './components/User/Account/Detail';
import CheckoutPage from './components/User/Checkout';
import { SumProductContext } from './context/SumProductContext';
import * as Constants from './constants';
import AdminLogin from './components/Admin/Login';
import GenuineProduct from './components/User/Customer/GenuineProduct';
import GiftWrapping from './components/User/Customer/GiftWrapping';
import ExpressDelivery from './components/User/Customer/ExpressDelivery';

function App() {
  const { setUserId, setRoleId, setSumProduct, userId, roleId } =
    useContext(SumProductContext);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPathname = useMemo(() => {
    return location && location.pathname ? location.pathname : '';
  }, [location]);

  const currentUserId = useMemo(() => {
    return userId || sessionStorage.getItem('userId') || '';
  }, [userId]);

  const currentRoleId = useMemo(() => {
    return roleId || sessionStorage.getItem('roleId') || '';
  }, [roleId]);

  useEffect(() => {
    const isAdmin = currentPathname.includes('/admin');
    if (isAdmin) {
      if (currentUserId && currentRoleId) {
        if (Constants.AccessRole.includes(currentRoleId.toString())) {
          // OK
        } else {
          setUserId('');
          setRoleId('');
          setSumProduct(0);
          sessionStorage.removeItem('userId');
          navigate('/admin/login');
        }
      } else {
        navigate('/admin/login');
      }
    } else {
      if (
        currentUserId &&
        currentRoleId &&
        Constants.AccessRole.includes(currentRoleId.toString())
      ) {
        setUserId('');
        setRoleId('');
        setSumProduct(0);
        sessionStorage.removeItem('userId');
      }
    }
  }, [
    currentUserId,
    currentRoleId,
    currentPathname,
    navigate,
    setRoleId,
    setUserId,
    setSumProduct,
  ]);

  return (
    <>
      <Header />
      <Routes>
        {/* route for user */}
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterFrom />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopping-guide" element={<ShoppingGuide />} />
        <Route path="/questions" element={<QuestionsFrequently />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/security" element={<Security />} />
        <Route path="/delivery-and-payment" element={<DeliveryPayment />} />
        <Route path="/product-list" element={<UserProductList />} />
        <Route
          path="/product-detail/:productId"
          element={<UserProductDetail />}
        />
        <Route path="/carts" element={<CartList />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/genuine-product" element={<GenuineProduct />} />
        <Route path="/free-gift-wrapping" element={<GiftWrapping />} />
        <Route path="/express-delivery" element={<ExpressDelivery />} />

        {/* route for admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/product-list" element={<ProductList />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/admin/product-detail/:productId"
          element={<ProductDetail />}
        />
        <Route path="/admin/user-list" element={<UserList />} />
        <Route path="/admin/user-detail/:userId" element={<UserDetail />} />
        <Route path="/admin/add-user" element={<AddNewUser />} />
        <Route path="/admin/age-category-list" element={<AgeCategoryList />} />
        <Route
          path="/admin/age-category-detail/:id"
          element={<AgeCategoryDetail />}
        />
        <Route path="/admin/add-age-category" element={<AddAgeCategory />} />
        <Route path="/admin/branch-category-list" element={<BranchList />} />
        <Route
          path="/admin/branch-category-detail/:id"
          element={<BranchCategoryDetail />}
        />
        <Route
          path="/admin/add-branch-category"
          element={<AddBranchCategory />}
        />
        <Route path="/admin/skill-category-list" element={<SkillList />} />
        <Route
          path="/admin/skill-category-detail/:id"
          element={<SkillCategoryDetail />}
        />
        <Route
          path="/admin/add-skill-category"
          element={<AddSkillCategory />}
        />
        <Route path="/admin/role-list" element={<RoleList />} />
        <Route path="/admin/role-detail/:id" element={<RoleDetail />} />
        <Route path="/admin/add-role" element={<AddRole />} />
        <Route path="/admin/order-list" element={<AdminHome />} />

        {/* 404 page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer newestOnTop />
    </>
  );
}

export default App;
