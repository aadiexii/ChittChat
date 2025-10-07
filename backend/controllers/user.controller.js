import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		// Normalize/augment returned users so frontend always has fullName and profilePic
		const users = filteredUsers.map((u) => {
			const user = u.toObject();
			// Prefer existing fullName, then name, then fallback to part of the email
			user.fullName = user.fullName || user.name || (user.email ? user.email.split("@")[0] : "User");

			// If profilePic missing or empty string, provide a generated avatar (UI Avatars)
			if (!user.profilePic) {
				const initials = encodeURIComponent(user.fullName);
				user.profilePic = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&rounded=true&size=128`;
			}

			return user;
		});

		res.status(200).json(users);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getProfile = async (req, res) => {
  try {
    // req.user is populated by authMiddleware
    const { fullName, email, username, profilePic } = req.user;

	console.log(fullName)

    res.status(200).json({
      name: fullName,
      email,
      avatar: profilePic,
      username
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
