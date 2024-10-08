import axios from "axios";
import { ChangeEvent, useRef, useState, useCallback } from "react";
import { useImages } from "./use-images";

type Status = "initial" | "uploading" | "error" | "done" | "retrying";
type FileUpload = {
  file: File;
  progress: number;
  status: Status;
  error?: string;
  retryCount: number;
  description: string;
  publicAccess: boolean;
};

const MAX_CONCURRENT_UPLOADS = 2;
const MAX_RETRY_COUNT = 3;
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/image/upload";

export const useFileUpload = () => {
  const { handleRefresh } = useImages();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [uploading, setUploading] = useState(false);
  const [cropFile, setCropFile] = useState<FileUpload | null>(null);

  const length = files.filter((file) => file.status !== "done").length;

  const handleRemoveRefCurrent = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleCropComplete = useCallback(
    (file: FileUpload, croppedFile: File) => {
      const updatedFile: FileUpload = {
        ...file,
        file: croppedFile,
      };

      // Eski dosyayı çıkar ve yeni crop edilmiş dosyayı ekle
      setFiles((prevFiles) => [
        ...prevFiles.filter((f) => f.file.name !== file.file.name),
        updatedFile,
      ]);

      setCropFile(null);
    },
    [],
  );

  const handleFileAdd = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // first delete all the done files from the list
    setFiles((prevFiles) => prevFiles.filter((file) => file.status !== "done"));

    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(
        (file): FileUpload => ({
          file,
          status: "initial",
          retryCount: 0,
          progress: 0,
          error: "",
          description: file.name.split(".").slice(0, -1).join("."),
          publicAccess: true,
        }),
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }, []);

  const handleFileRemove = useCallback(
    (file: FileUpload) => {
      setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
      handleRemoveRefCurrent();
    },
    [handleRemoveRefCurrent],
  );

  function updateFileAttributes(
    fileToUpdate: FileUpload,
    attributes: Partial<FileUpload>,
  ) {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.file === fileToUpdate.file ? { ...file, ...attributes } : file,
      ),
    );
  }

  const uploadFile = useCallback(
    async (file: FileUpload) => {
      if (file.retryCount >= MAX_RETRY_COUNT && file.status === "done") return;
      console.log("Uploading file:", file.file.name);

      const formData = new FormData();
      formData.append("file", file.file);
      formData.append(
        "data",
        JSON.stringify({
          description: file.description,
          publicAccess: file.publicAccess,
        }),
      );

      const status = file.retryCount > 0 ? "retrying" : "uploading";
      updateFileAttributes(file, { status, progress: 0 });

      try {
        const response = await axios.post(API_URL, formData, {
          timeout: 60000 * 2.5,
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            updateFileAttributes(file, { progress });
          },
        });

        if (response.status === 200) {
          updateFileAttributes(file, { status: "done", progress: 100 });
        }
      } catch (error) {
        console.error("Upload error:", error);
        updateFileAttributes(file, {
          status: "error",
          error: "Upload failed",
          retryCount: file.retryCount + 1,
          progress: 0,
        });
      }
    },
    [updateFileAttributes],
  );

  const processQueue = useCallback(async () => {
    const chunkedFiles = [];
    for (let i = 0; i < files.length; i += MAX_CONCURRENT_UPLOADS) {
      chunkedFiles.push(files.slice(i, i + MAX_CONCURRENT_UPLOADS));
    }

    for (const chunk of chunkedFiles) {
      await Promise.all(chunk.map(uploadFile));
    }

    handleRefresh();
    setUploading(false);
  }, [files, uploadFile]);

  const startUpload = useCallback(() => {
    setUploading(true);
    processQueue();
  }, [processQueue]);

  return {
    fileInputRef,
    files,
    uploading,
    handleFileAdd,
    handleFileRemove,
    startUpload,
    updateFileAttributes,
    length,
    cropFile,
    setCropFile,
    handleCropComplete,
  };
};
