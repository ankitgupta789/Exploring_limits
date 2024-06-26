const Prof = require("../models/Prof")



exports.createProfile = async (req, res) => {
    const { gender, dateOfBirth, about, contactNumber, email, address } = req.body;
    

    try {
        
        // Create a new feedback with the given details
		console.log("email is,",email);
		console.log("am i called or not");
        const newProfile = await Prof.create({
			gender, dateOfBirth, about, contactNumber, email, address
        });
        
        
        console.log(newProfile);
        // Return the new feedback and a success message
        return res.status(200).json({
            success: true,
            data: newProfile,
            message: "profile Created Successfully",
        });
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Profile",
            error: error.message,
        });
    }
};
exports.getProfileByEmail = async (req, res) => {
    const { email } = req.query;
    
    try {
		console.log("check");
        console.log("email is",email);
        const profile = await Prof.findOne({ email:email });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
		console.log("fetched profile is",profile)
        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get Profile",
            error: error.message,
        });
    }
};


// Function to update the profile
exports.updateProfile = async (req, res) => {
  const { email } = req.params; // Assuming email is passed as a parameter in the URL
  const updates = req.body; // Data to update, expected in the request body
  
  try {
    const updatedProfile = await Prof.findOneAndUpdate(
      { email: email }, // Find the profile by email
      updates, // Update with the data from req.body
      { new: true } // Return the updated document
    );
    
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.status(200).json(updatedProfile); // Send back the updated profile
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};