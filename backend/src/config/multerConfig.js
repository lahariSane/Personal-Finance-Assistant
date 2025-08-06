import multer from "multer"

// Configure multer for PDF file upload
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF, PNG, and JPEG files are allowed"), false)
    }
  },
})
