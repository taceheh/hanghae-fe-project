import { IoStarSharp } from 'react-icons/io5';

export const ReviewStar = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-custumBlack">
      {[...Array(5)].map((_, index) => (
        <IoStarSharp
          key={index}
          className={index < rating ? 'text-custumBlack' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};
