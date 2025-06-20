import React, { useState, useEffect } from "react";

interface ModuleData {
  id: string;
  title: string;
  learningObjective: string;
  duration: number;
}

interface FormData {
  title: string;
  learningObjective: string;
  duration: string;
}

interface FormErrors {
  title?: string;
  learningObjective?: string;
  duration?: string;
}

interface EditModuleFormProps {
  moduleId?: string;
  onUpdate?: (data: ModuleData) => void;
  onCancel?: () => void;
  initialData?: Partial<ModuleData>;
}

const EditModuleForm: React.FC<EditModuleFormProps> = ({
  moduleId,
  onUpdate,
  onCancel,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    learningObjective: "",
    duration: "",
  });

  const [originalData, setOriginalData] = useState<FormData>({
    title: "",
    learningObjective: "",
    duration: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Simulate fetching data from backend
  const fetchModuleData = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API call
      const mockData: ModuleData = {
        id: id,
        title: initialData?.title || `Sample Module ${id}`,
        learningObjective:
          initialData?.learningObjective ||
          `Students will learn advanced concepts in Module ${id} including practical applications and theoretical foundations.`,
        duration: initialData?.duration || 8,
      };

      const formattedData: FormData = {
        title: mockData.title,
        learningObjective: mockData.learningObjective,
        duration: mockData.duration.toString(),
      };

      setFormData(formattedData);
      setOriginalData(formattedData);
    } catch (error) {
      console.error("Failed to fetch module data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moduleId) {
      fetchModuleData(moduleId);
    } else if (initialData) {
      const formattedData: FormData = {
        title: initialData.title || "",
        learningObjective: initialData.learningObjective || "",
        duration: initialData.duration?.toString() || "",
      };
      setFormData(formattedData);
      setOriginalData(formattedData);
    }
  }, [moduleId, initialData]);

  useEffect(() => {
    // Check if there are changes
    const dataChanged =
      formData.title !== originalData.title ||
      formData.learningObjective !== originalData.learningObjective ||
      formData.duration !== originalData.duration;

    setHasChanges(dataChanged);
  }, [formData, originalData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
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
      newErrors.title = "Module title is required";
    }

    if (!formData.learningObjective.trim()) {
      newErrors.learningObjective = "Learning objective is required";
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      newErrors.duration = "Valid duration is required";
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

        const updatedData: ModuleData = {
          id: moduleId || "",
          title: formData.title,
          learningObjective: formData.learningObjective,
          duration: Number(formData.duration),
        };

        onUpdate?.(updatedData);
        console.log("Module Updated:", updatedData);

        // Update original data to reflect the save
        setOriginalData({ ...formData });
        setHasChanges(false);
      } catch (error) {
        console.error("Failed to update module:", error);
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-400"></div>
              <span className="text-gray-600">Loading module data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Edit Module</h2>
            {moduleId && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ID: {moduleId}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* Module Title */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Module Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Enter module title"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Learning Objective */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Learning Objective *
              </label>
              <textarea
                name="learningObjective"
                value={formData.learningObjective}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Describe what students will learn and achieve after completing this module"
                disabled={loading}
              />
              {errors.learningObjective && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.learningObjective}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Duration (hours) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="0.5"
                step="0.5"
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="2.5"
                disabled={loading}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
              <p className="text-gray-600 text-sm mt-1">
                Enter duration in hours (e.g., 2.5 for 2 hours 30 minutes)
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
                  "Update Module"
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

          {/* Module Preview */}
          {formData.title && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Module Preview
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-800">{formData.title}</span>
                </div>
                {formData.duration && (
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-gray-800">
                      {formData.duration} hours
                    </span>
                  </div>
                )}
                {formData.learningObjective && (
                  <div>
                    <span className="font-medium text-gray-700">
                      Learning Objective:
                    </span>
                    <p className="ml-2 text-gray-800 mt-1">
                      {formData.learningObjective}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Changes Summary */}
          {hasChanges && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">
                Changes Summary
              </h4>
              <div className="space-y-3">
                {formData.title !== originalData.title && (
                  <div>
                    <span className="text-blue-700 text-sm font-medium">
                      Title:
                    </span>
                    <div className="ml-4 space-y-1">
                      <div className="text-blue-600 text-sm">
                        Original: {originalData.title}
                      </div>
                      <div className="text-blue-800 text-sm font-medium">
                        Updated: {formData.title}
                      </div>
                    </div>
                  </div>
                )}
                {formData.duration !== originalData.duration && (
                  <div>
                    <span className="text-blue-700 text-sm font-medium">
                      Duration:
                    </span>
                    <div className="ml-4 space-y-1">
                      <div className="text-blue-600 text-sm">
                        Original: {originalData.duration} hours
                      </div>
                      <div className="text-blue-800 text-sm font-medium">
                        Updated: {formData.duration} hours
                      </div>
                    </div>
                  </div>
                )}
                {formData.learningObjective !==
                  originalData.learningObjective && (
                  <div>
                    <span className="text-blue-700 text-sm font-medium">
                      Learning Objective:
                    </span>
                    <div className="ml-4 space-y-1">
                      <div className="text-blue-600 text-sm">
                        Original: {originalData.learningObjective}
                      </div>
                      <div className="text-blue-800 text-sm font-medium">
                        Updated: {formData.learningObjective}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModuleForm;
