import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchForm = React.memo(() => {
   const navigate = useNavigate();
   const [searchParamValues] = useSearchParams();
   const [ageId, setAgeId] = useState<string>();
   const [branchId, setBranchId] = useState<string>();
   const [skillId, setSkillId] = useState<string>();

   const isSelected = useMemo(() => {
      if (ageId || branchId || skillId) {
         return true;
      }
      return false;
   }, [ageId, branchId, skillId]);

   const handleSubmit = useCallback(() => {
      if (!isSelected) {
         return;
      }

      const url = `?ageId=${ageId || ""}&branchId=${branchId || ""}&skillId=${
         skillId || ""
      }`;

      navigate(url, { replace: true });
   }, [navigate, ageId, branchId, skillId, isSelected]);

   useEffect(() => {
      if (searchParamValues.get("ageId")) {
         const item = searchParamValues.get("ageId") || "";
         setAgeId(item);
      }
      if (searchParamValues.get("branchId")) {
         const item = searchParamValues.get("branchId") || "";
         setBranchId(item);
      }
      if (searchParamValues.get("skillId")) {
         const item = searchParamValues.get("skillId") || "";
         setSkillId(item);
      }
   }, [searchParamValues]);

   return (
      <>
         <div className="flex flex-col w-full">
            <span className="text-xl font-bold">Thương hiệu 🔽</span>
            <div className="flex mt-4">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch1"
                     name="branchId"
                     value="1"
                     className="cursor-pointer"
                     checked={branchId === "1"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch1" className="ps-3 cursor-pointer">
                     MIDEER
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch2"
                     name="branchId"
                     value="2"
                     className="cursor-pointer"
                     checked={branchId === "2"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch2" className="ps-3 cursor-pointer">
                     AVENIR
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch3"
                     name="branchId"
                     value="3"
                     className="cursor-pointer"
                     checked={branchId === "3"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch3" className="ps-3 cursor-pointer">
                     TOI WORLD
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch4"
                     name="branchId"
                     value="4"
                     className="cursor-pointer"
                     checked={branchId === "4"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch4" className="ps-3 cursor-pointer">
                     JOAN MIRO
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch5"
                     name="branchId"
                     value="5"
                     className="cursor-pointer"
                     checked={branchId === "5"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch5" className="ps-3 cursor-pointer">
                     TOOKY TOY
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="branch6"
                     name="branchId"
                     value="6"
                     className="cursor-pointer"
                     checked={branchId === "6"}
                     onChange={(e) => setBranchId(e.target.value)}
                  />
                  <label htmlFor="branch6" className="ps-3 cursor-pointer">
                     MOULD KING
                  </label>
               </div>
            </div>
            <hr className="my-5" />
            <span className="text-xl font-bold">Theo độ tuổi 🔽</span>
            <div className="flex mt-4">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age1"
                     name="ageId"
                     value="1"
                     className="cursor-pointer"
                     checked={ageId === "1"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age1" className="ps-3 cursor-pointer">
                     0-1 Tuổi
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age2"
                     name="ageId"
                     value="2"
                     className="cursor-pointer"
                     checked={ageId === "2"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age2" className="ps-3 cursor-pointer">
                     2+ Tuổi
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age3"
                     name="ageId"
                     value="3"
                     className="cursor-pointer"
                     checked={ageId === "3"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age3" className="ps-3 cursor-pointer">
                     3+ Tuổi
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age4"
                     name="ageId"
                     value="4"
                     className="cursor-pointer"
                     checked={ageId === "4"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age4" className="ps-3 cursor-pointer">
                     4-6 Tuổi
                  </label>
               </div>
            </div>
            <div className="flex mt-2">
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age5"
                     name="ageId"
                     value="5"
                     className="cursor-pointer"
                     checked={ageId === "5"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age5" className="ps-3 cursor-pointer">
                     6-10 Tuổi
                  </label>
               </div>
               <div className="w-1/2">
                  <input
                     type="radio"
                     id="age6"
                     name="ageId"
                     value="6"
                     className="cursor-pointer"
                     checked={ageId === "6"}
                     onChange={(e) => setAgeId(e.target.value)}
                  />
                  <label htmlFor="age6" className="ps-3 cursor-pointer">
                     12+ Tuổi
                  </label>
               </div>
            </div>
            <hr className="my-5" />
            <span className="text-xl font-bold mb-4">Theo độ tuổi 🔽</span>
            <div className="w-full">
               <input
                  type="radio"
                  id="skill1"
                  name="skillId"
                  value="1"
                  className="cursor-pointer"
                  checked={skillId === "1"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill1" className="ps-3 cursor-pointer">
                  KHÁM PHÁ
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill2"
                  name="skillId"
                  value="2"
                  className="cursor-pointer"
                  checked={skillId === "2"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill2" className="ps-3 cursor-pointer">
                  TƯ DUY LOGIC
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill3"
                  name="skillId"
                  value="3"
                  className="cursor-pointer"
                  checked={skillId === "3"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill3" className="ps-3 cursor-pointer">
                  NGHỆ THUẬT HỘI HỌA
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill4"
                  name="skillId"
                  value="4"
                  className="cursor-pointer"
                  checked={skillId === "4"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill4" className="ps-3 cursor-pointer">
                  NHANH MẮT KHÉO TAY
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill5"
                  name="skillId"
                  value="5"
                  className="cursor-pointer"
                  checked={skillId === "5"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill5" className="ps-3 cursor-pointer">
                  TƯƠNG TÁC XÃ HỘI
               </label>
            </div>
            <div className="w-full mt-2">
               <input
                  type="radio"
                  id="skill6"
                  name="skillId"
                  value="6"
                  className="cursor-pointer"
                  checked={skillId === "6"}
                  onChange={(e) => setSkillId(e.target.value)}
               />
               <label htmlFor="skill6" className="ps-3 cursor-pointer">
                  VẬN ĐỘNG
               </label>
            </div>
         </div>
         <hr className="my-5" />
         <div className="flex w-full justify-center">
            <button
               type="button"
               className={`block py-2 w-2/3 rounded text-white ${
                  isSelected
                     ? "hover:bg-green-700 bg-green-500"
                     : "cursor-not-allowed bg-gray-500"
               }`}
               onClick={handleSubmit}
               disabled={!isSelected}
            >
               Lọc sản phẩm
            </button>
         </div>
      </>
   );
});

export default SearchForm;
