// services/student/student.service.js
import API from '../../api/authApi'; // Your configured API instance

/**
 * Fetches a student's profile by ID
 * @param {string} studentId - The ID of the student
 * @returns {Promise<Object>} Student profile data
 */
export const getStudentProfile = async (studentId) => {
  try {
    const response = await API.get(`/students/${studentId}`);
    return response.data.data; // Assuming your API wraps data in a data object
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error; // Re-throw for error handling in components
  }
};

/**
 * Creates a new student profile
 * @param {Object} profileData - The student profile data to create
 * @returns {Promise<Object>} Created student profile
 */
export const createStudentProfile = async (profileData) => {
  try {
    const response = await API.post('/students', profileData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating student profile:', error);
    throw error;
  }
};

/**
 * Updates an existing student profile
 * @param {Object} params - Contains userId and profile data
 * @param {string} params.userId - The ID of the student to update
 * @param {Object} params.profileData - The updated profile data
 * @returns {Promise<Object>} Updated student profile
 */
export const updateStudentProfile = async ({ userId, ...profileData }) => {
  try {
    const response = await API.put(`/students/${userId}`, profileData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating student profile:', error);
    throw error;
  }
};

/**
 * Uploads a student profile picture
 * @param {string} userId - The ID of the student
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} Response with image URL
 */
export const uploadProfilePicture = async (userId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    const response = await API.post(`/students/${userId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

/**
 * Deletes a student profile
 * @param {string} userId - The ID of the student to delete
 * @returns {Promise<Object>} Delete confirmation
 */
export const deleteStudentProfile = async (userId) => {
  try {
    const response = await API.delete(`/students/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student profile:', error);
    throw error;
  }
};