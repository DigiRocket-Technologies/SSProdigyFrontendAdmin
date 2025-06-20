// import React, { useState } from "react";

// const AddSubmoduleForm = ({ onSubmit, initialData = null }) => {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Submodule title is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       const submitData = {
//         ...formData,
//       };

//       onSubmit?.(submitData);
//       console.log("Submodule Data:", submitData);

//       // Reset form after successful submission
//       setFormData({
//         title: "",
//       });
//       setErrors({});
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-xl mx-auto">
//         <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//             Add New Submodule
//           </h2>

//           <div className="space-y-6">
//             {/* Submodule Title */}
//             <div>
//               <label className="block text-gray-800 font-bold mb-2 text-lg">
//                 Submodule Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800 text-lg"
//                 placeholder="Enter submodule title"
//               />
//               {errors.title && (
//                 <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//               )}
//               <p className="text-gray-600 text-sm mt-2">
//                 Give your submodule a clear, descriptive title that reflects its
//                 content
//               </p>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="w-full bg-lime-400 text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-lime-500 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
//               >
//                 Add New Submodule
//               </button>
//             </div>

//             {/* Additional Actions */}
//             <div className="pt-4 border-t border-gray-200">
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setFormData({ title: "" });
//                     setErrors({});
//                   }}
//                   className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   Clear Form
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="flex-1 bg-lime-100 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-lime-200 transition-colors border border-lime-300"
//                 >
//                   Save & Add Another
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Submodule Preview */}
//           {formData.title && (
//             <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                 Submodule Preview
//               </h3>
//               <div className="flex items-center space-x-3">
//                 <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
//                 <span className="text-gray-800 font-medium text-lg">
//                   {formData.title}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Information Box */}
//           <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex items-start space-x-3">
//               <div className="w-5 h-5 text-blue-600 mt-0.5">
//                 <svg fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-blue-800 mb-1">
//                   What is a Submodule?
//                 </h4>
//                 <p className="text-blue-700 text-sm">
//                   Submodules are smaller sections within a module that help
//                   organize content into digestible parts. They can contain
//                   videos, readings, assignments, or other learning materials.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSubmoduleForm;
import React, { useState } from "react";

// Define types for props
interface SubmoduleFormData {
  title: string;
}

interface AddSubmoduleFormProps {
  onSubmit?: (data: SubmoduleFormData) => void;
  initialData?: SubmoduleFormData | null;
}

const AddSubmoduleForm: React.FC<AddSubmoduleFormProps> = ({
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<SubmoduleFormData>({
    title: initialData?.title || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SubmoduleFormData, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof SubmoduleFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubmoduleFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = "Submodule title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const submitData: SubmoduleFormData = {
        ...formData,
      };

      onSubmit?.(submitData);
      console.log("Submodule Data:", submitData);

      // Reset form after successful submission
      setFormData({
        title: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Add New Submodule
          </h2>

          <div className="space-y-6">
            {/* Submodule Title */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Submodule Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800 text-lg"
                placeholder="Enter submodule title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-gray-600 text-sm mt-2">
                Give your submodule a clear, descriptive title that reflects its
                content
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-lime-400 text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-lime-500 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                Add New Submodule
              </button>
            </div>

            {/* Additional Actions */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ title: "" });
                    setErrors({});
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-lime-100 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-lime-200 transition-colors border border-lime-300"
                >
                  Save & Add Another
                </button>
              </div>
            </div>
          </div>

          {/* Submodule Preview */}
          {formData.title && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Submodule Preview
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                <span className="text-gray-800 font-medium text-lg">
                  {formData.title}
                </span>
              </div>
            </div>
          )}

          {/* Information Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-blue-600 mt-0.5">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  What is a Submodule?
                </h4>
                <p className="text-blue-700 text-sm">
                  Submodules are smaller sections within a module that help
                  organize content into digestible parts. They can contain
                  videos, readings, assignments, or other learning materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubmoduleForm;
