const TestimonialsCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="w-35 h-35 object-cover rounded-full bg-gray-300 mx-auto " />
      <div className="bg-gray-300 h-4 w-40 rounded-2xl mx-auto"></div>
      <div className="bg-gray-300 h-3 w-30 rounded-2xl mx-auto"></div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-start items-start">
          <span className="bg-gray-300 h-3 w-10 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-20 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-30 rounded-2xl mx-auto"></span>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span className="bg-gray-300 h-3 w-30 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-20 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-10 rounded-2xl mx-auto"></span>
        </div>
        <div className="flex gap-2 justify-start items-start">
          <span className="bg-gray-300 h-3 w-20 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-10 rounded-2xl mx-auto"></span>
          <span className="bg-gray-300 h-3 w-20 rounded-2xl mx-auto"></span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCardSkeleton;
