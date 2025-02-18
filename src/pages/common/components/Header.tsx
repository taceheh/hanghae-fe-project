import { useCartItems } from '@/hooks/cart/useCartItems';
import { ShoppingBagIcon, User, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Header = () => {
  const navigate = useNavigate();
  const { data } = useCartItems();
  const goToProductPage = () => {
    navigate('/cart');
  };
  const goToHomePage = () => {
    navigate('/');
  };
  const goToSubscription = () => {
    navigate('/subscription');
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
      <div className="flex border-none ">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="border-none focus:outline-none">
              <Ticket
                onClick={goToSubscription}
                className="h-6 w-6 text-customBlack cursor-pointer hover:border-none border-none"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-pointColor text-white text-xs font-semibold px-3 py-1 shadow-md border-none rounded-[2px]">
              구독하고 매달 원두를 받아보세요!
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <User onClick={goToMyPage} className="h-6 w-6 ml-5 text-customBlack" />
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
