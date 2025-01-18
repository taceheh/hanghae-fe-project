import { useCartItems } from '@/hooks/cart/useCartItems';
import { ShoppingBagIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { data } = useCartItems();
  const goToProductPage = () => {
    navigate('/cart');
  };
  const goToHomePage = () => {
    navigate('/');
  };
  const goToMyPage = () => {
    navigate('/mypage');
  };
  const totalCartCount = data?.length || 0;

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
        <div className="relative">
          <ShoppingBagIcon
            onClick={goToProductPage}
            className="h-6 w-6 text-customBlack ml-5"
          />
          {totalCartCount === 0 ? (
            <></>
          ) : (
            <div className="rounded-2xl w-[18px] h-[18px] bg-pointColor absolute top-[-5px] right-[-5px] text-center text-white leading-[18px] text-xs">
              {totalCartCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
