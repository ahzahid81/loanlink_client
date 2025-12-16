import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axiosSecure from "../../services/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";


const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const MAX_FILES = 5;
const MAX_FILE_MB = 3;

async function uploadFileToImgbb(file) {
  const options = { maxSizeMB: 1.0, maxWidthOrHeight: 1920, useWebWorker: true };
  let fileToUpload = file;
  try {
    fileToUpload = await imageCompression(file, options);
  } catch (err) {
    console.log(err);
  }

  const form = new FormData();
  form.append("image", fileToUpload);

  const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`imgbb upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  // data.data.url (or display_url) contains the image URL
  return data.data.secure_url || data.data.url;
}

const ManagerAddLoan = () => {
  const { user } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      interest: "",
      maxLimit: "",
      requiredDocuments: "",
      emiPlans: [{ months: "", monthlyAmount: "" }],
      showOnHome: false,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "emiPlans" });

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length + files.length > MAX_FILES) {
      Swal.fire("Limit reached", `Maximum ${MAX_FILES} images allowed.`, "warning");
      return;
    }
    for (const f of selected) {
      if (f.size / 1024 / 1024 > MAX_FILE_MB) {
        Swal.fire("File too large", `Each file must be < ${MAX_FILE_MB} MB`, "warning");
        return;
      }
    }
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFileAt = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const addEmi = () => append({ months: "", monthlyAmount: "" });
  const removeEmi = (i) => {
    if (fields.length === 1) return;
    remove(i);
  };

  const onSubmit = async (data) => {
    if (!data.emiPlans || data.emiPlans.length === 0) {
      return Swal.fire("Validation", "Add at least one EMI plan", "warning");
    }

    // Upload images to imgbb and collect URLs
    let imageUrls = [];
    if (files.length > 0) {
      if (!IMGBB_KEY) {
        return Swal.fire("Configuration", "IMGBB API key missing. Set VITE_IMGBB_API_KEY in .env", "error");
      }

      setUploading(true);
      try {
        // upload sequentially or in parallel
        const uploads = files.map((f) => uploadFileToImgbb(f));
        imageUrls = await Promise.all(uploads);
      } catch (err) {
        console.error("Image upload error", err);
        Swal.fire("Upload failed", err.message || "Failed to upload images", "error");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Prepare payload
    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      interest: Number(data.interest),
      maxLimit: Number(data.maxLimit),
      requiredDocuments: (data.requiredDocuments || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      emiPlans: data.emiPlans.map((p) => ({
        months: Number(p.months),
        monthlyAmount: Number(p.monthlyAmount),
      })),
      images: imageUrls, // imgbb urls
      createdBy: user?.email || "manager@example.com",
      createdAt: new Date().toISOString(),
      showOnHome: Boolean(data.showOnHome),
    };

    try {
      const res = await axiosSecure.post("/loans", payload);
      if (res.data?.success) {
        await Swal.fire("Success", "Loan created successfully", "success");
        reset();
        setFiles([]);
      } else {
        throw new Error(res.data?.message || "Server error");
      }
    } catch (err) {
      console.error("Create loan failed", err);
      Swal.fire("Error", err.message || "Failed to create loan", "error");
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Add Loan</h2>
      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-base-100 p-6 rounded-lg border border-base-200">
        <div>
          <label className="label"><span className="label-text">Title *</span></label>
          <input type="text" className="input input-bordered w-full" {...register("title", { required: true })} />
          {errors.title && <p className="text-xs text-red-500 mt-1">Title is required</p>}
        </div>

        <div>
          <label className="label"><span className="label-text">Description *</span></label>
          <textarea className="textarea textarea-bordered w-full" {...register("description", { required: true })} />
          {errors.description && <p className="text-xs text-red-500 mt-1">Description is required</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="label"><span className="label-text">Category *</span></label>
            <input type="text" className="input input-bordered w-full" {...register("category", { required: true })} />
            {errors.category && <p className="text-xs text-red-500 mt-1">Category is required</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Interest (%) *</span></label>
            <input type="number" step="0.01" className="input input-bordered w-full" {...register("interest", { required: true })} />
            {errors.interest && <p className="text-xs text-red-500 mt-1">Interest is required</p>}
          </div>
          <div>
            <label className="label"><span className="label-text">Max Limit *</span></label>
            <input type="number" className="input input-bordered w-full" {...register("maxLimit", { required: true })} />
            {errors.maxLimit && <p className="text-xs text-red-500 mt-1">Max limit is required</p>}
          </div>
        </div>

        <div>
          <label className="label"><span className="label-text">Required Documents (comma separated)</span></label>
          <input type="text" className="input input-bordered w-full" {...register("requiredDocuments")} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label"><span className="label-text">EMI Plans *</span></label>
            <button type="button" className="btn btn-sm" onClick={addEmi}>Add EMI</button>
          </div>

          <div className="space-y-2">
            {fields.map((f, idx) => (
              <div key={f.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <input type="number" placeholder="Months" className="input input-bordered w-full" {...register(`emiPlans.${idx}.months`, { required: true })} />
                </div>
                <div className="col-span-5">
                  <input type="number" placeholder="Monthly Amount" className="input input-bordered w-full" {...register(`emiPlans.${idx}.monthlyAmount`, { required: true })} />
                </div>
                <div className="col-span-2">
                  <button type="button" className="btn btn-sm btn-error" onClick={() => removeEmi(idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="label"><span className="label-text">Images (max {MAX_FILES}, each &lt; {MAX_FILE_MB}MB)</span></label>
          <input type="file" accept="image/*" multiple onChange={onFileChange} className="file-input file-input-bordered w-full" />
          {files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {files.map((f, i) => (
                <div key={i} className="px-2 py-1 bg-base-200 rounded-md text-xs flex items-center gap-2">
                  <span>{f.name}</span>
                  <button type="button" className="btn btn-xs btn-ghost" onClick={() => removeFileAt(i)}>x</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="toggle" {...register("showOnHome")} />
            <span className="ml-2 text-sm">Show on Home</span>
          </label>

          <button type="submit" className={`btn btn-primary ${isSubmitting || uploading ? "loading" : ""}`} disabled={isSubmitting || uploading}>
            {isSubmitting || uploading ? "Processing..." : "Create Loan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerAddLoan;
