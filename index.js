import { google } from 'googleapis';
import fs from 'fs';


export async function fileUploader(keyFileLocation,parentFileName,files){
    try{
        const auth = new google.auth.GoogleAuth ({
            keyFile: keyFileLocation,
            scopes: ["https://www.googleapis.com/auth/drive"],
            });
            const drive = google. drive ({
                version: "v3", auth,
                });
                const uploadedFiles = []
                for(let i=0;i<files.length;i++){
                    const file = files[i];
                    const response = await drive.files.create({
                        requestBody: {
                            name: file.originalname, 
                            mimeType: file.mimetype,
                            parents: [parentFileName],
                        },
                        media: {
                            body: fs.createReadStream(file.path),
                        },
                    })
                    uploadedFiles.push(response.data);
                }
                // res.json({ files: uploadedFiles });
                return(uploadedFiles);
    }catch (e){
        console.log(e);
        throw e;
    }
}