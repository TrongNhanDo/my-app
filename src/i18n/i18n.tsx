import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
/** english - user */
import ABOUT_EN from '../assets/translate/en/user/about.json';
import CART_EN from '../assets/translate/en/user/cart.json';
import CHECKOUT_EN from '../assets/translate/en/user/checkout.json';
import CONTACT_EN from '../assets/translate/en/user/contact.json';
import ERROR_EN from '../assets/translate/en/user/error.json';
import EXCHANGE_WARRANTY_EN from '../assets/translate/en/user/exchange_warranty.json';
import EXPRESS_DELIVERY_EN from '../assets/translate/en/user/express_delivery.json';
import FOOTER_EN from '../assets/translate/en/user/footer.json';
import FREQUENTLY_QUESTION_EN from '../assets/translate/en/user/frequently_question.json';
import GENUINE_PRODUCT_EN from '../assets/translate/en/user/genuine_product.json';
import GIFT_WRAPPING_EN from '../assets/translate/en/user/gift_wrapping.json';
import HEADER_EN from '../assets/translate/en/user/header.json';
import HOME_EN from '../assets/translate/en/user/home.json';
import LOGIN_EN from '../assets/translate/en/user/login.json';
import PAYMENT_DELIVERY_EN from '../assets/translate/en/user/payment_delivery.json';
import PRODUCT_DETAIL_EN from '../assets/translate/en/user/product_detail.json';
import PRODUCT_EN from '../assets/translate/en/user/product.json';
import REGISTER_EN from '../assets/translate/en/user/register.json';
import SECURITY_EN from '../assets/translate/en/user/security.json';
import SHOPPING_GUIDE_EN from '../assets/translate/en/user/shopping_guide.json';
import TERM_SERVICE_EN from '../assets/translate/en/user/term_service.json';
/** english - admin */
import ADMIN_HEADER_EN from '../assets/translate/en/admin/header.json';
import ADMIN_LOGIN_EN from '../assets/translate/en/admin/login.json';
import ADMIN_ERROR_EN from '../assets/translate/en/admin/error.json';
/** vietnamese - user */
import ABOUT_VI from '../assets/translate/vi/user/about.json';
import CART_VI from '../assets/translate/vi/user/cart.json';
import CHECKOUT_VI from '../assets/translate/vi/user/checkout.json';
import CONTACT_VI from '../assets/translate/vi/user/contact.json';
import ERROR_VI from '../assets/translate/vi/user/error.json';
import EXCHANGE_WARRANTY_VI from '../assets/translate/vi/user/exchange_warranty.json';
import EXPRESS_DELIVERY_VI from '../assets/translate/vi/user/express_delivery.json';
import FOOTER_VI from '../assets/translate/vi/user/footer.json';
import FREQUENTLY_QUESTION_VI from '../assets/translate/vi/user/frequently_question.json';
import GENUINE_PRODUCT_VI from '../assets/translate/vi/user/genuine_product.json';
import GIFT_WRAPPING_VI from '../assets/translate/vi/user/gift_wrapping.json';
import HEADER_VI from '../assets/translate/vi/user/header.json';
import HOME_VI from '../assets/translate/vi/user/home.json';
import LOGIN_VI from '../assets/translate/vi/user/login.json';
import PAYMENT_DELIVERY_VI from '../assets/translate/vi/user/payment_delivery.json';
import PRODUCT_DETAIL_VI from '../assets/translate/vi/user/product_detail.json';
import PRODUCT_VI from '../assets/translate/vi/user/product.json';
import REGISTER_VI from '../assets/translate/vi/user/register.json';
import SECURITY_VI from '../assets/translate/vi/user/security.json';
import SHOPPING_GUIDE_VI from '../assets/translate/vi/user/shopping_guide.json';
import TERM_SERVICE_VI from '../assets/translate/vi/user/term_service.json';
/** vietnamese - admin */
import ADMIN_HEADER_VI from '../assets/translate/vi/admin/header.json';
import ADMIN_LOGIN_VI from '../assets/translate/vi/admin/login.json';
import ADMIN_ERROR_VI from '../assets/translate/vi/admin/error.json';

const resources = {
   eng: {
      /** user */
      user_about: ABOUT_EN,
      user_cart: CART_EN,
      user_checkout: CHECKOUT_EN,
      user_contact: CONTACT_EN,
      user_error: ERROR_EN,
      user_exchange_warranty: EXCHANGE_WARRANTY_EN,
      user_express_delivery: EXPRESS_DELIVERY_EN,
      user_footer: FOOTER_EN,
      user_frequently_question: FREQUENTLY_QUESTION_EN,
      user_genuine_product: GENUINE_PRODUCT_EN,
      user_gift_wrapping: GIFT_WRAPPING_EN,
      user_header: HEADER_EN,
      user_home: HOME_EN,
      user_login: LOGIN_EN,
      user_payment_delivery: PAYMENT_DELIVERY_EN,
      user_product_detail: PRODUCT_DETAIL_EN,
      user_product: PRODUCT_EN,
      user_register: REGISTER_EN,
      user_security: SECURITY_EN,
      user_shopping_guide: SHOPPING_GUIDE_EN,
      user_term_service: TERM_SERVICE_EN,
      /** admin */
      admin_header: ADMIN_HEADER_EN,
      admin_login: ADMIN_LOGIN_EN,
      admin_error: ADMIN_ERROR_EN,
   },
   vie: {
      /** user */
      user_about: ABOUT_VI,
      user_cart: CART_VI,
      user_checkout: CHECKOUT_VI,
      user_contact: CONTACT_VI,
      user_error: ERROR_VI,
      user_exchange_warranty: EXCHANGE_WARRANTY_VI,
      user_express_delivery: EXPRESS_DELIVERY_VI,
      user_footer: FOOTER_VI,
      user_frequently_question: FREQUENTLY_QUESTION_VI,
      user_genuine_product: GENUINE_PRODUCT_VI,
      user_gift_wrapping: GIFT_WRAPPING_VI,
      user_header: HEADER_VI,
      user_home: HOME_VI,
      user_login: LOGIN_VI,
      user_payment_delivery: PAYMENT_DELIVERY_VI,
      user_product_detail: PRODUCT_DETAIL_VI,
      user_product: PRODUCT_VI,
      user_register: REGISTER_VI,
      user_security: SECURITY_VI,
      user_shopping_guide: SHOPPING_GUIDE_VI,
      user_term_service: TERM_SERVICE_VI,
      /** admin */
      admin_header: ADMIN_HEADER_VI,
      admin_login: ADMIN_LOGIN_VI,
      admin_error: ADMIN_ERROR_VI,
   },
};

i18n.use(initReactI18next).init({
   resources,
   lng: 'eng',
   ns: Object.keys(resources.eng),
   fallbackLng: 'eng',
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;
