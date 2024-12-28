import { ShoppingBagIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToProductPage = () => {
    navigate('/cart');
  };
  return (
    <div className="w-[600px] m-0 p-4 flex items-center justify-between bg-gray-100">
      <div>
        <img className="" src="/images/tastebean_logo.png" alt="Logo" />
        <User className="h-6 w-6 text-blue-500" />
        <ShoppingBagIcon
          onClick={goToProductPage}
          className="h-6 w-6 text-blue-500"
        />
      </div>
    </div>
  );
};

export default Header;
