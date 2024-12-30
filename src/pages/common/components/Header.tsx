import { ShoppingBagIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToProductPage = () => {
    navigate('/cart');
  };
  const goToHomePage = () => {
    navigate('/');
  };
  const goToMyPage = () => {
    navigate('/mypage');
  };
  return (
    <div className=" h-[60px] bg-transparent w-[600px] m-0 p-4 flex items-center justify-between bg-gray-100">
      <img
        onClick={goToHomePage}
        className=""
        src="/images/tastebean_logo.png"
        alt="Logo"
      />
      <div className="flex">
        <User onClick={goToMyPage} className="h-6 w-6 text-customBlack" />
        <ShoppingBagIcon
          onClick={goToProductPage}
          className="h-6 w-6 text-customBlack ml-5"
        />
      </div>
    </div>
  );
};

export default Header;
