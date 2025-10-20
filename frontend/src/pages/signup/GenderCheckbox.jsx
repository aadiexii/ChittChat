const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex mt-3 '>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
                    <span className={`label-text text-gray-800 dark:text-gray-200 ${selectedGender === "male" ? "font-semibold text-sky-400 dark:text-sky-600" : ""}`}>Male</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900 dark:border-slate-400'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
                    <span className={`label-text text-gray-800 dark:text-gray-200 ${selectedGender === "female" ? "font-semibold text-sky-400 dark:text-sky-600" : ""}`}>Female</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900 dark:border-slate-400'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer  ${selectedGender === "others" ? "selected" : ""}`}>
                                        <span className={`label-text text-gray-800 dark:text-gray-200 ${selectedGender === "others" ? "font-semibold text-sky-400 dark:text-sky-600" : ""}`}>Others</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900 dark:border-slate-400'
                        checked={selectedGender === "others"}
                        onChange={() => onCheckboxChange("others")}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer  ${selectedGender === "notsay" ? "selected" : ""}`}>
                    <span className={`label-text text-gray-800 dark:text-gray-200 ${selectedGender === "notsay" ? "font-semibold text-sky-400 dark:text-sky-600" : ""}`}>I'd rather not say</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900 dark:border-slate-400'
                        checked={selectedGender === "notsay"}
                        onChange={() => onCheckboxChange("notsay")}
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
//  return (
//      <div className='flex'>
//          <div className='form-control'>
//              <label className={`label gap-2 cursor-pointer`}>
//                  <span className='label-text'>Male</span>
//                  <input type='checkbox' className='checkbox border-slate-900' />
//              </label>
//          </div>
//          <div className='form-control'>
//              <label className={`label gap-2 cursor-pointer`}>
//                  <span className='label-text'>Female</span>
//                  <input type='checkbox' className='checkbox border-slate-900' />
//              </label>
//          </div>
//      </div>
//  );
// };
// export default GenderCheckbox;

