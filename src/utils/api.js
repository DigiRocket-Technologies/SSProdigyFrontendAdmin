
export const submitCourseFormData = async (formData) => {
  try {
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/course/addcourse`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData), 
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

export const submitModuleFormData = async (formData) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/course/addmodule`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData), 
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

export const submitsubModuleFormData = async (formData) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/course/addsubmodule`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData), 
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
