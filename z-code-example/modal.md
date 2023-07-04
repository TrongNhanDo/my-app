// modal custom    

   const [modal, setModal] = useState<boolean>false;
   {
      modal && (
         <div className="fixed flex w-full h-full bg-gray-500/75 top-0 left-0">
               <div className="flex flex-col w-1/3 h-auto bg-white m-auto items-center p-5 rounded index-30 font-bold">
               <div className="flex w-full justify-between text-2xl font-bold">
                  <div className="uppercase">add new role</div>
                  <button type="button">
                     ❌
                  </button>
               </div>
               <hr className="w-full my-3 bg-black h-0.5" />
               <div>Modal's content</div>
               <div className="flex w-full flex-col mt-auto">
                  <hr className="w-full my-3 bg-black h-0.5" />
                  <div className="flex justify-end">
                     <button
                        type="button"
                        className="block bg-blue-400 p-2 rounded font-bold"
                     >
                        Submit
                     </button>
                     <button
                        type="button"
                        className="block bg-red-400 p-2 rounded font-bold ms-5"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
