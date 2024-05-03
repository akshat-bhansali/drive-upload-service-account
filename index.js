const { google } = require("googleapis");
const stream = require("stream");

async function fileUploader(keyFileLocation, parentFileName, files) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFileLocation,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({
      version: "v3",
      auth,
    });
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: [parentFileName],
        },
        media: {
          body: bufferStream,
        },
      });
      const fileUrl = `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`;
      uploadedFiles.push({ ...response.data, url: fileUrl });
    }
    return uploadedFiles;
  } catch (e) {
    throw e;
  }
}


module.exports = { fileUploader };