export const submitCourseFormData = async (formData) => {
  try {
    console.log("Sending form data to server...");

    const response = await fetch("http://localhost:5173/submitcourseformdata", {
      method: "POST",
      body: formData, // No need to set Content-Type for FormData
      // Don't set Content-Type header - browser will set it automatically with boundary
      // Increase timeout for large files
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error("Server error:", response.status, errorData);
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error; // Re-throw to let the component handle it
  }
};
