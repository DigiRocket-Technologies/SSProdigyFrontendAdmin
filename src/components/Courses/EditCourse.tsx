import React, { useState, useEffect } from "react";

interface CourseData {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  bannerImage: File | null;
  description: string;
  instructorName: string;
  instructorDescription: string;
  instructorImage: File | null;
  courseCertificate: string;
  validity: number;
  rating: number;
  liveStatus: boolean;
  duration: number;
  faqs: string;
}

interface FormData {
  title: string;
  originalPrice: string;
  discountedPrice: string;
  bannerImage: File | null;
  description: string;
  instructorName: string;
  instructorDescription: string;
  instructorImage: File | null;
  courseCertificate: string;
  validity: string;
  rating: string;
  liveStatus: boolean;
  duration: string;
  faqs: string;
}

interface FormErrors {
  title?: string;
  originalPrice?: string;
  discountedPrice?: string;
  description?: string;
  instructorName?: string;
  instructorDescription?: string;
  courseCertificate?: string;
  validity?: string;
  rating?: string;
  duration?: string;
  faqs?: string;
}

interface EditCourseFormProps {
  courseId?: string;
  onUpdate?: (data: CourseData) => void;
  onCancel?: () => void;
  initialData?: Partial<CourseData>;
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  courseId,
  onUpdate,
  onCancel,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    bannerImage: null,
    description: "",
    instructorName: "",
    instructorDescription: "",
    instructorImage: null,
    courseCertificate: "",
    validity: "",
    rating: "",
    liveStatus: false,
    duration: "",
    faqs: "",
  });

  const [originalData, setOriginalData] = useState<FormData>({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    bannerImage: null,
    description: "",
    instructorName: "",
    instructorDescription: "",
    instructorImage: null,
    courseCertificate: "",
    validity: "",
    rating: "",
    liveStatus: false,
    duration: "",
    faqs: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Simulate fetching data from backend
  const fetchCourseData = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock data - replace with actual API call
      const mockData: CourseData = {
        id: id,
        title: initialData?.title || `Complete React Course ${id}`,
        originalPrice: initialData?.originalPrice || 199.99,
        discountedPrice: initialData?.discountedPrice || 149.99,
        bannerImage: initialData?.bannerImage || null,
        description:
          initialData?.description ||
          `This comprehensive React course covers everything from basics to advanced concepts. Learn React hooks, state management, routing, and much more in this hands-on course designed for developers of all levels.`,
        instructorName: initialData?.instructorName || "John Doe",
        instructorDescription:
          initialData?.instructorDescription ||
          "Senior React Developer with 8+ years of experience. Has worked with companies like Google and Facebook, specializing in modern JavaScript frameworks and web development.",
        instructorImage: initialData?.instructorImage || null,
        courseCertificate:
          initialData?.courseCertificate ||
          "Certificate of Completion - React Mastery",
        validity: initialData?.validity || 365,
        rating: initialData?.rating || 4.8,
        liveStatus: initialData?.liveStatus || true,
        duration: initialData?.duration || 40,
        faqs:
          initialData?.faqs ||
          "Q: Is this course suitable for beginners? A: Yes, we start from the basics and gradually progress to advanced topics.\n\nQ: Do I get lifetime access? A: Yes, you get lifetime access to all course materials and updates.\n\nQ: Is there a certificate? A: Yes, you receive a certificate upon successful completion.",
      };

      const formattedData: FormData = {
        title: mockData.title,
        originalPrice: mockData.originalPrice.toString(),
        discountedPrice: mockData.discountedPrice.toString(),
        bannerImage: mockData.bannerImage,
        description: mockData.description,
        instructorName: mockData.instructorName,
        instructorDescription: mockData.instructorDescription,
        instructorImage: mockData.instructorImage,
        courseCertificate: mockData.courseCertificate,
        validity: mockData.validity.toString(),
        rating: mockData.rating.toString(),
        liveStatus: mockData.liveStatus,
        duration: mockData.duration.toString(),
        faqs: mockData.faqs,
      };

      setFormData(formattedData);
      setOriginalData(formattedData);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId);
    } else if (initialData) {
      const formattedData: FormData = {
        title: initialData.title || "",
        originalPrice: initialData.originalPrice?.toString() || "",
        discountedPrice: initialData.discountedPrice?.toString() || "",
        bannerImage: initialData.bannerImage || null,
        description: initialData.description || "",
        instructorName: initialData.instructorName || "",
        instructorDescription: initialData.instructorDescription || "",
        instructorImage: initialData.instructorImage || null,
        courseCertificate: initialData.courseCertificate || "",
        validity: initialData.validity?.toString() || "",
        rating: initialData.rating?.toString() || "",
        liveStatus: initialData.liveStatus || false,
        duration: initialData.duration?.toString() || "",
        faqs: initialData.faqs || "",
      };
      setFormData(formattedData);
      setOriginalData(formattedData);
    }
  }, [courseId, initialData]);

  useEffect(() => {
    // Check if there are changes
    const dataChanged =
      formData.title !== originalData.title ||
      formData.originalPrice !== originalData.originalPrice ||
      formData.discountedPrice !== originalData.discountedPrice ||
      formData.description !== originalData.description ||
      formData.instructorName !== originalData.instructorName ||
      formData.instructorDescription !== originalData.instructorDescription ||
      formData.courseCertificate !== originalData.courseCertificate ||
      formData.validity !== originalData.validity ||
      formData.rating !== originalData.rating ||
      formData.liveStatus !== originalData.liveStatus ||
      formData.duration !== originalData.duration ||
      formData.faqs !== originalData.faqs ||
      formData.bannerImage !== originalData.bannerImage ||
      formData.instructorImage !== originalData.instructorImage;

    setHasChanges(dataChanged);
  }, [formData, originalData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.originalPrice || Number(formData.originalPrice) <= 0)
      newErrors.originalPrice = "Valid original price is required";
    if (!formData.discountedPrice || Number(formData.discountedPrice) <= 0)
      newErrors.discountedPrice = "Valid discounted price is required";
    if (!formData.description.trim())
      newErrors.description = "Course description is required";
    if (!formData.instructorName.trim())
      newErrors.instructorName = "Instructor name is required";
    if (!formData.instructorDescription.trim())
      newErrors.instructorDescription = "Instructor description is required";
    if (!formData.courseCertificate.trim())
      newErrors.courseCertificate = "Course certificate is required";
    if (!formData.validity || Number(formData.validity) <= 0)
      newErrors.validity = "Valid validity period is required";
    if (
      !formData.rating ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    )
      newErrors.rating = "Rating must be between 0 and 5";
    if (!formData.duration || Number(formData.duration) <= 0)
      newErrors.duration = "Valid duration is required";
    if (!formData.faqs.trim()) newErrors.faqs = "FAQs section is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (): Promise<void> => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API update call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const updatedData: CourseData = {
          id: courseId || "",
          title: formData.title,
          originalPrice: Number(formData.originalPrice),
          discountedPrice: Number(formData.discountedPrice),
          bannerImage: formData.bannerImage,
          description: formData.description,
          instructorName: formData.instructorName,
          instructorDescription: formData.instructorDescription,
          instructorImage: formData.instructorImage,
          courseCertificate: formData.courseCertificate,
          validity: Number(formData.validity),
          rating: Number(formData.rating),
          liveStatus: formData.liveStatus,
          duration: Number(formData.duration),
          faqs: formData.faqs,
        };

        onUpdate?.(updatedData);
        console.log("Course Updated:", updatedData);

        // Update original data to reflect the save
        setOriginalData({ ...formData });
        setHasChanges(false);
      } catch (error) {
        console.error("Failed to update course:", error);
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-400"></div>
              <span className="text-gray-600">Loading course data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Edit Course</h2>
            {courseId && (
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ID: {courseId}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* Course Title */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Enter course title"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Original Price *
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="0.00"
                  disabled={loading}
                />
                {errors.originalPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.originalPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Discounted Price *
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="0.00"
                  disabled={loading}
                />
                {errors.discountedPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discountedPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Banner Image (JPG/PNG)
              </label>
              <input
                type="file"
                name="bannerImage"
                onChange={handleInputChange}
                accept=".jpg,.jpeg,.png"
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-lime-400 file:text-gray-800 file:font-semibold hover:file:bg-lime-500"
                disabled={loading}
              />
              {formData.bannerImage && (
                <p className="text-gray-600 text-sm mt-1">
                  Selected: {formData.bannerImage.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Course Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Enter detailed course description"
                disabled={loading}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Instructor Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Instructor Information
              </h3>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Instructor Name *
                </label>
                <input
                  type="text"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="Enter instructor name"
                  disabled={loading}
                />
                {errors.instructorName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instructorName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Instructor Description *
                </label>
                <textarea
                  name="instructorDescription"
                  value={formData.instructorDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="Enter instructor biography and qualifications"
                  disabled={loading}
                />
                {errors.instructorDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instructorDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Instructor Image (JPG/PNG)
                </label>
                <input
                  type="file"
                  name="instructorImage"
                  onChange={handleInputChange}
                  accept=".jpg,.jpeg,.png"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-lime-400 file:text-gray-800 file:font-semibold hover:file:bg-lime-500"
                  disabled={loading}
                />
                {formData.instructorImage && (
                  <p className="text-gray-600 text-sm mt-1">
                    Selected: {formData.instructorImage.name}
                  </p>
                )}
              </div>
            </div>

            {/* Course Certificate */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Course Certificate *
              </label>
              <input
                type="text"
                name="courseCertificate"
                value={formData.courseCertificate}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Enter certificate type or details"
                disabled={loading}
              />
              {errors.courseCertificate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseCertificate}
                </p>
              )}
            </div>

            {/* FAQs Section */}
            <div>
              <label className="block text-gray-800 font-bold mb-2 text-lg">
                Frequently Asked Questions (FAQs) *
              </label>
              <textarea
                name="faqs"
                value={formData.faqs}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                placeholder="Enter frequently asked questions and their answers. Format: Q: Question? A: Answer."
                disabled={loading}
              />
              {errors.faqs && (
                <p className="text-red-500 text-sm mt-1">{errors.faqs}</p>
              )}
            </div>

            {/* Validity, Rating, Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Validity (days) *
                </label>
                <input
                  type="number"
                  name="validity"
                  value={formData.validity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="365"
                  disabled={loading}
                />
                {errors.validity && (
                  <p className="text-red-500 text-sm mt-1">{errors.validity}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="4.5"
                  disabled={loading}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-2 text-lg">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-lime-400 focus:outline-none text-gray-800"
                  placeholder="10"
                  disabled={loading}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Live Status */}
            <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
              <input
                type="checkbox"
                name="liveStatus"
                id="liveStatus"
                checked={formData.liveStatus}
                onChange={handleInputChange}
                className="w-5 h-5 text-lime-400 bg-white border-2 border-gray-300 rounded focus:ring-lime-400 focus:ring-2"
                disabled={loading}
              />
              <label
                htmlFor="liveStatus"
                className="text-gray-800 font-bold text-lg"
              >
                Live Course Status
              </label>
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
                  "Update Course"
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

          {/* Course Preview */}
          {formData.title && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Course Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-800">{formData.title}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.duration} hours
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Original Price:
                  </span>
                  <span className="ml-2 text-gray-800">
                    ${formData.originalPrice}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Discounted Price:
                  </span>
                  <span className="ml-2 text-gray-800">
                    ${formData.discountedPrice}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Rating:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.rating}/5
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.liveStatus ? "Live" : "Not Live"}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Instructor:</span>
                  <span className="ml-2 text-gray-800">
                    {formData.instructorName}
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

export default EditCourseForm;
