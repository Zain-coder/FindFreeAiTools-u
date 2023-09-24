import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import {
  db,
  doc,
  setDoc,
  ref,
  storage,
  getDownloadURL,
  uploadBytes,
} from "../../services";
import { TagsInput, CategorySelect } from "../../components";

import { useStateContext } from "../../context";

const AddTool = () => {
  const { copiedData } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState(copiedData ? copiedData?.tags : []);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    copiedData ? copiedData?.category : ""
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [selected, setSelected] = useState(false);
  const [file, setFile] = useState(null);
  console.log("Add Tool", copiedData);

  // FORM VALIDATION
  const formSchema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    link: yup.string().required("Link is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: copiedData ? copiedData?.title : "",
      description: copiedData ? copiedData?.description : "",
      link: copiedData ? copiedData?.link : "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (tags.length === 0) {
      return toast.error("Cannot Add Tool without tags!", {
        position: "top-right",
      });
    }

    if (selectedCategory === "") {
      return toast.error("Cannot Add Tool without Tool Category!", {
        position: "top-right",
      });
    }

    if (!selectedFile) {
      return toast.error("Cannot Add Tool without Website Image!", {
        position: "top-right",
      });
    }

    setIsLoading(true);
    data.tags = tags;
    data.category = selectedCategory;
    // console.log(data);

    await handleUpload(selectedFile, data);
  };

  const handleImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
    setSelected(true);
  };

  // UPLOAD IMAGE
  const handleUpload = async (Incidentimage, data) => {
    if (Incidentimage == null) return;
    const imageRef = ref(storage, `/images/${Date.now()}`);

    // COMPRESSING IMAGE
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(Incidentimage, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB

      // UPLOAD FILE
      uploadBytes(imageRef, compressedFile)
        .then(() => {
          getDownloadURL(imageRef)
            .then(async (downloadUrl) => {
              data.image = downloadUrl;
              // console.log("Data: ", data);
              await setDoc(doc(db, "tools", Date.now().toString()), data);
              toast.success("Tool Added!", {
                position: "top-right",
              });
              reset();
              setTags([]);
              setSelectedCategory("");
              setSelected(false);
              setIsLoading(false);
            })
            .catch((error) => {
              // console.log(error);
              setIsLoading(false);
              toast.error("Tool Could not be Added!", {
                position: "top-right",
              });
            });
        })
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full w-full flex-col justify-center py-2 sm:px-6 lg:px-8">
        <div className="sm:mx-auto w-full">
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add Tool
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto w-full">
          <div className="bg-white pb-12 pt-4 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" autoComplete="off">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Title:
                </label>
                <div className="mt-2">
                  <input
                    {...register("title")}
                    autoComplete="off"
                    className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors?.title
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                    placeholder="Tool Title"
                  />
                  {errors?.title ? (
                    <div className="text-red-500 text-small">
                      {errors?.title?.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description:
                </label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    {...register("description")}
                    autoComplete="off"
                    className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors?.description
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                    placeholder="Tool Description"
                  />
                  {errors?.description ? (
                    <div className="text-red-500 text-small">
                      {errors?.description?.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Tool Link:
                </label>
                <div className="mt-2">
                  <input
                    {...register("link")}
                    autoComplete="off"
                    className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors?.link
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                    placeholder="Tool Link"
                  />
                  {errors?.link ? (
                    <div className="text-red-500 text-small">
                      {errors?.link?.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* IMAGE */}
              <div
                className="flex flex-col my-3
          items-start justify-start"
              >
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Website Image
                </label>

                {!selected ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                ) : (
                  <img
                    src={file}
                    alt="selectedImage"
                    className="w-full h-64 object-contain"
                  />
                )}
              </div>
              {/* IMAGE */}

              <TagsInput
                tags={tags}
                setTags={setTags}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />

              <CategorySelect
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <div>
                {!isLoading && (
                  <button
                    className="flex w-full justify-center rounded-md bg-buttonRed py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#bd2b1e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd2b1e]
                    mt-8"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Add Tool
                  </button>
                )}
                {isLoading && (
                  <button
                    disabled=""
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-md bg-buttonRed py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#b12013] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Adding Tool...
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTool;
