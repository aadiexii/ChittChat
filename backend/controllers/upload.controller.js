const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Construct the publicly accessible URL for the file
    // This will be something like /uploads/1678886400000-my-image.png
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({ fileUrl, fileType: req.file.mimetype });
};

export { uploadFile };