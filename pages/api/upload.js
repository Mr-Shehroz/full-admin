import multiparty from 'multiparty';
import fs from 'fs';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new multiparty.Form();

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const uploadedFiles = files.file; // array of uploaded files
    const urls = [];

    for (const file of uploadedFiles) {
      const path = file.path;
      const result = await cloudinary.uploader.upload(path, {
        folder: "products",
      });
      urls.push(result.secure_url);
      fs.unlinkSync(path); // clean up local temp file
    }

    return res.status(200).json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}
