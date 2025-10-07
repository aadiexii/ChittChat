import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		// getting the limit and cursor from the req.query object if they are defined the defaults for limit and cursor are 20 and null respectively
		const limit = parseInt(req.query.limit) || 20
		const cursor = req.query.cursor ? new mongoose.Types.ObjectId(req.query.cursor) : null;


		// building the filter
		let filter = {
			_id: { $ne: loggedInUserId }
		}

		// if the cursor is provided
		if(cursor){
			filter._id = {
				$gt: cursor,
				$ne: loggedInUserId
			}
		}

		const filteredUsers = await User.find(filter)
										.select("-password")
										.sort({_id:1})
										.limit(limit+1)// an extra user is fetched to check if more users are available to be fetched or if this is the last batch of avaiable users

		const hasNextPage = filteredUsers.length > limit 
		const slicedusers = hasNextPage ? filteredUsers.slice(0,-1) : filteredUsers // remove the extra fetched user

		// Normalize/augment returned users so frontend always has fullName and profilePic
		const users = slicedusers.map((u) => {
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

		// updated the response structure
		res.status(200).json({
			users,
			nextCursor: hasNextPage ? slicedusers[slicedusers.length - 1]._id : null,
			hasNextPage
		});
		
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
