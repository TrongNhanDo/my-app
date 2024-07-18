import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkIsAdmin } from '../../../Common/Logic/logics';
import HeaderAdmin from './header-admin';
import HeaderUser from './header-user';
import './header.css';
import useWindowDimensions from './hooks';
import { SumProductContext } from '../../../../context/SumProductContext';

const Header = React.memo(() => {
  const currentPathname = useLocation().pathname;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const { userId } = useContext(SumProductContext);

  useEffect(() => {
    if (width && width <= 600) {
      setMenu(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPathname]);

  useEffect(() => {
    if (width && width > 600) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [width]);

  useEffect(() => {
    setIsAdmin(checkIsAdmin(currentPathname));
  }, [currentPathname]);

  const handleMenu = useCallback(() => {
    setMenu((prev) => !prev);
  }, []);

  return (
    <div>
      <nav className="border-gray-200 bg-footer2">
        <div className="header w-9/12 flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={isAdmin ? 'admin' : ''} className="flex items-center">
            <img
              src="https://congcaphe.com/_next/static/images/vn-66e76189e15384f6034e56f129991d96.png"
              className="h-8 mr-3"
              alt={`${import.meta.env.VITE_WEB_NAME} Logo`}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {import.meta.env.VITE_WEB_NAME}
            </span>
          </Link>
          {(isAdmin ? userId : true) && (
            <>
              <button onClick={handleMenu} className="show-menu">
                {menu ? (
                  <>X</>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 17 14"
                    >
                      <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
                    </svg>
                  </>
                )}
              </button>
            </>
          )}

          {menu && <>{isAdmin ? <HeaderAdmin /> : <HeaderUser />}</>}
        </div>
      </nav>
    </div>
  );
});

export default Header;
