import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = React.memo(() => {
  const navigate = useNavigate();

  return (
    <>
      <main className="page-404 h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button
          className="mt-5 relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          type="button"
          onClick={() => navigate(-1)}
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            Go Back
          </span>
        </button>
      </main>
    </>
  );
});

export default PageNotFound;
