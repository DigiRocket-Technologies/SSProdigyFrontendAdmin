import React, { useState, useEffect } from "react";

interface SubmoduleData {
  id: string;
  title: string;
}

interface FormData {
  title: string;
}

interface FormErrors {
  title?: string;
}

interface EditSubmoduleFormProps {
  submoduleId?: string;
  onUpdate?: (data: SubmoduleData) => void;
  onCancel?: () => void;
  initialData?: Partial<SubmoduleData>;
}

const EditSubmoduleForm: React.FC<EditSubmoduleFormProps> = ({
  submoduleId,
  onUpdate,
  onCancel,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
  });

  const [originalData, setOriginalData] = useState<FormData>({
    title: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Simulate fetching data from backend
  const fetchSubmoduleData = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API call
      const mockData: SubmoduleData = {
        id: id,
        title: initialData?.title || `Sample Submodule ${id}`,
      };

      setFormData({ title: mockData.title });
      setOriginalData({ title: mockData.title });
    } catch (error) {
      console.error("Failed to fetch submodule data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submoduleId) {
      fetchSubmoduleData(submoduleId);
    } else if (initialData?.title) {
      setFormData({ title: initialData.title });
      setOriginalData({ title: initialData.title });
    }
  }, [submoduleId, initialData]);

  useEffect(() => {
    // Check if there are changes
    setHasChanges(formData.title !== originalData.title);
  }, [formData.title, originalData.title]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Submodule title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (): Promise<void> => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API update call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const updatedData: SubmoduleData = {
          id: submoduleId || "",
          ...formData,
        };

        onUpdate?.(updatedData);
        console.log("Submodule Updated:", updatedData);

        // Update original data to reflect the save
        setOriginalData({ ...formData });
        setHasChanges(false);
      } catch (error) {
        console.error("Failed to update submodule:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = (): void => {
    // Reset to original data
    setFormData({ ...originalData });
    setErrors({});
    setHasChanges(false);
    onCancel?.();
  };

  const handleResetChanges = (): void => {
    setFormData({ ...originalData });
    setErrors({});
  };

  if (loading && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-400"></div>
              <span className="text-gray-600">Loading submodule data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Edit Submodule</h2>
            {submoduleId && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ID: {submoduleId}
              </span>
            )}
          </div>

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
                disabled={loading}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-gray-600 text-sm mt-2">
                Update the submodule title to better reflect its content
              </p>
            </div>

            {/* Change Indicator */}
            {hasChanges && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 text-yellow-600">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-yellow-800 text-sm font-medium">
                    You have unsaved changes
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading || !hasChanges}
                className={`w-full font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all ${
                  hasChanges && !loading
                    ? "bg-lime-400 text-gray-800 hover:bg-lime-500 hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Submodule"
                )}
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetChanges}
                  disabled={loading || !hasChanges}
                  className="flex-1 bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg hover:bg-red-200 transition-colors border border-red-200 disabled:opacity-50"
                >
                  Reset Changes
                </button>
              </div>
            </div>
          </div>

          {/* Current Preview */}
          {formData.title && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Current Preview
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                <span className="text-gray-800 font-medium text-lg">
                  {formData.title}
                </span>
              </div>
            </div>
          )}

          {/* Original vs Current Comparison */}
          {hasChanges && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">
                Changes Summary
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-blue-700 text-sm font-medium">
                    Original:
                  </span>
                  <span className="ml-2 text-blue-600 text-sm">
                    {originalData.title}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700 text-sm font-medium">
                    Updated:
                  </span>
                  <span className="ml-2 text-blue-800 text-sm font-medium">
                    {formData.title}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSubmoduleForm;
