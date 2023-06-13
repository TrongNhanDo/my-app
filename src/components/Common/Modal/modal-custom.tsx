import { ReactNode } from "react";

type ModalCustomProps = {
   children: ReactNode;
};

export const ModalCustom: React.FC<ModalCustomProps> = ({ children }) => {
   return (
      <div className="fixed flex w-full h-full bg-gray-500/75 top-0 left-0">
         <div className="flex flex-col w-auto h-auto bg-white border-inherit m-auto items-center p-5 rounded index-30">
            {children}
         </div>
      </div>
   );
};
