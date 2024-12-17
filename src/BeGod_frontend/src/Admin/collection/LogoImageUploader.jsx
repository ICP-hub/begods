import { useEffect, useState } from "react";
import { RiFolder6Line, RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Skeleton from "react-loading-skeleton";
import { BeGod_assethandler } from "../../../../declarations/BeGod_assethandler";

function LogoImageUploader({ captureUploadedbloburl }) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [hideUpload, setHideUpload] = useState(false);
  const [fileType, setFileType] = useState("file");
  // const {captureUploadedNftImage} = props

  // rendering previews
  useEffect(() => {
    if (!files || files.length === 0) return;
    // Create preview URLs for each file
    const objectUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(objectUrls);
    setFileType("file");
    captureUploadedbloburl(files);
    // UploadedNftImage(objectUrls);
    // // console.log(files);
    // console.log(objectUrls);

    // Cleanup function to revoke all object URLs and free memory
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFileType("file");
    }, 1000);

    return () => clearTimeout(timer);
  }, [fileType]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setHideUpload(true);

    // Pass the selected files to the parent component or use them in this component
    // if (captureUploadedFiles) {
    //   captureUploadedFiles(selectedFiles);
    // }
  };

  // const UploadedNftImage = async (captureImage) => {
  //   if (BeGod_assethandler) {
  //     try {
  //       console.log(captureImage);

  //       const id = Date.now().toString();
  //       const response = await fetch(captureImage);
  //       const blob = await response.blob();

  //       // Step 2: Convert Blob to ArrayBuffer
  //       const arrayBuffer = await blob.arrayBuffer();

  //       const result1 = await BeGod_assethandler?.uploadImg(id, [
  //         ...new Uint8Array(arrayBuffer),
  //       ]);
  //       console.log(result1);

  //       // //return the url
  //       const acd = process.env.DFX_NETWORK;
  //       console.log(acd);
  //       if (acd == "local") {
  //         const url = `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_BEGOD_ASSETHANDLER}&imgid=${id}`;
  //         console.log("nft url", url);
  //         captureuploadedurl(url);
  //       } else if (acd === "ic") {
  //         const url = `https://${process.env.CANISTER_ID_BEGOD_ASSETHANDLER}.raw.icp0.io/?imgid=${id}`;
  //         console.log("nft url", url);
  //         captureuploadedurl(url);
  //       }

  //       // const url = `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_BEGOD_ASSETHANDLER}&imgid=${id}`;

  //       // //return the url
  //       // console.log("nft url", url);
  //       // captureuploadedurl(url);
  //       // setimageurl(url);
  //       // imageurlchange(url);
  //       // console.log(imageurl);
  //     } catch (error) {
  //       console.error("Error fetching uploadimg:", error);
  //     }
  //   }
  // };

  const toggleInputHide = () => {
    setHideUpload(!hideUpload);
    setPreviews(null);
    setFileType("none");
  };

  return (
    <div className="mt-1">
      {!hideUpload && (
        <input
          id={Date.now()}
          type={fileType}
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => {
            handleFileChange(e);
            toggleInputHide();
          }}
          style={{ display: "none" }}
        />
      )}
      {!hideUpload && (
        <div className="flex justify-end items-center pr-2  bg-[#29292C] h-[30px] md:h-[45px] m-0 rounded-md">
          <RiFolder6Line className="cursor-pointer" />
        </div>
      )}
      {previews &&
        previews.map((pic) => {
          return (
            <div className="relative w-[80px] h-[80px] m-0">
              <img
                src={pic}
                alt="Selected"
                className="object-cover w-full h-full rounded-full"
              />
              <button
                onClick={toggleInputHide}
                className="absolute top-0 right-0 bg-white rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 pt-[1px] pl-[1px] "
              >
                <RxCross2 className="text-black" size={13} />
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default LogoImageUploader;
