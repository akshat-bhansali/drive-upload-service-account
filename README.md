# Introduction

This npm package, `drive-upload-service-account`, provides functionality to upload files to Google Drive using service account authentication.

# Installation

To install the package, use npm:

```bash
npm i drive-upload-service-account
```

# Usage

First, import the required modules:

```javascript
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { fileUploader } = require("drive-upload-service-account");
```

Then, set up your Express app:

```javascript
const app = express();
const upload = multer();
app.use(upload.any());
app.use(cors());
```

Before using the package, you need to follow these steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/dashboard) and enable the Google Drive API.
2. Navigate to [Credentials](https://console.cloud.google.com/apis/credentials) in the Cloud Console.
3. Create service account credentials and download the JSON file.
4. Go to [Google Drive](https://drive.google.com) and select the folder you want to store your data into.
5. In the URL https://drive.google.com/drive/u/0/folders/parentFolderId, use this parentFolderId in the parentId variable.

Define a route for file upload:

```javascript
app.post("/upload", async (req, res) => {
  try {
    const keyFileLocation = "./path/to/key.json";
    const parentId = "folderID";
    const uploadedFiles = await fileUploader(
      keyFileLocation,
      parentId,
      req.files
    );
    res.json({ files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload files" });
  }
});
```

Finally, start the server:

```javascript
app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
```

To upload files from the frontend, you can use the following function:

```javascript
const handleFileupload = async () => {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      try {
        const response = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Uploaded files:", data.files);
      } catch (e) {
        console.log(e);
      }
    }
};
```

# Build

To build the project, use the following command:

```bash
npm run build
```

# Test

To run tests, use the following command:

```bash
npm run test
```

# Contribute

If you would like to contribute, you are welcome. Clone the repository and open a pull request.
