import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import bytesToMegabytes from "lib/bytesToMegabytes";
// import updateFormikValue from "lib/updateFormikValue";
// import DeleteButton from "../DeleteButton/DeleteButton";
import styles from "./ImageUpload.module.scss";

export default function ImageUpload({ label, name, value, onChange, error, required }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const onDrop = useCallback(async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "form_upload");

    const response = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT, formData, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const progress = Math.round((loaded * 100) / total);
        setIsUploading(true);
        setUploadProgress(progress);
        setLoadedBytes(loaded);
        setTotalBytes(total);
      },
    });

    // updateFormikValue(name, response.data.secure_url, onChange);

    onChange({ target: { name, value: response.data.secure_url } });
  }, []);

  useEffect(() => {
    setUploadProgress(0);
    setIsUploading(false);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: "image/x-png,image/gif,image/jpeg",
    multple: false,
  });

  return (
    <div className={styles.container}>
      <label>
        {label}
        {required ? " * " : null}
        {error ? <span style={{ color: "red" }}>{error}</span> : null}
      </label>
      {value ? (
        <div className={styles.imagePreview}>
          <img src={value} />
          <button onClick={() => updateFormikValue(name, "", onChange)}>Delete</button>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${
            isUploading
              ? styles.uploading
              : isDragAccept
              ? styles.dropzoneAccept
              : isDragReject
              ? styles.dropzoneReject
              : ""
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <>
              <span>Uploading</span>
              <span className={styles.fileSize}>
                ({bytesToMegabytes(loadedBytes)} MB/
                {bytesToMegabytes(totalBytes)} MB)
              </span>
              <span className={`${styles.icon} ${styles.loadingIcon}`} />
            </>
          ) : isDragAccept ? (
            <>
              <span>Looks good, drop it here</span>
              <span className={styles.icon}>📤</span>
            </>
          ) : isDragReject ? (
            <>
              <span>Sorry, we can't use that</span>
              <span className={styles.icon}>📤</span>
            </>
          ) : isDragActive ? (
            <>
              <span>Drop the files here ...</span>
              <span className={styles.icon}>📤</span>
            </>
          ) : (
            <>
              <span>Select file or drag & drop</span>
              <span className={styles.icon}>📤</span>
            </>
          )}

          <motion.div
            className={styles.progressBar}
            animate={{ width: `${uploadProgress}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 100 }}
          />
        </div>
      )}
    </div>
  );
}
