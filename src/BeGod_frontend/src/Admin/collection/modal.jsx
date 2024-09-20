import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ImageUploader from "./ImageUploader";
import toast from "react-hot-toast";
import YellowButton from "../../components/button/YellowButton";

const Modal = (props) => {
  const { getAddedNftDetails } = props;
  const [nftId, setNftId] = useState("254");
  const [nftName, setNftName] = useState("");
  const [nftType, setNftType] = useState("NORMAL");
  const [nftQuantity, setNftQuantity] = useState("");
  const [nftPrice, setPrice] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImage, setNftImage] = useState();
  const [nftImageURL, setNftImageURL] = useState("");
  const { toggleModal } = props;

  const onClickAddButton = () => {
    // event.preventDefault();
    if (
      nftId &&
      nftName &&
      nftType &&
      nftQuantity &&
      nftPrice &&
      nftDescription &&
      nftImage &&
      nftImageURL
    ) {
      const nftDetails = {
        nftId,
        nftName,
        nftType,
        nftQuantity,
        nftImage,
        nftImageURL,
        nftPrice,
        nftDescription,
      };
      console.log("nft details", nftDetails);
      getAddedNftDetails(nftDetails);
      toggleModal();
      toast.success("NFT Card Added");
    } else {
      toast.error("Enter All NFT Card Details");
    }
  };

  const captureUploadedNftImageFile = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();

      // Convert the file to a Base64 string when it's loaded
      reader.onloadend = () => {
        console.log("in handlefiless", reader.result);
        setNftImage(reader.result); // The base64-encoded string is stored here
      };
      reader.readAsDataURL(file);
      // Read the file as a Data URL (Base64 format)
    }
    // setNftImage(files);
  };

  const captureUploadedNftImage = (pic) => {
    setNftImageURL(pic);
    console.log(nftImageURL);
    // console.log("img", files);
  };

  return (
    <div className="add_new_nft_popup_bg_container">
      <div className="flex items-center justify-end">
        <button className="text-[#ffffff]" onClick={() => toggleModal()}>
          <RxCross2 size={25} />
        </button>
      </div>
      <form className="flex flex-col gap-5">
        <div className="mt-1">
          <label className="mt-4 w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[18px] leading-[25px]">
            NFT Name
            <input
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              type="text"
              className="mt-1 pl-4 w-[100%] h-[38px]  bg-[#29292C] rounded-md  text-[16px]  text-[#8a8686]"
            />
          </label>
        </div>

        <div className="mt-1 flex flex-col sm:flex-row sm:gap-4 md:flex-row md:gap-4 w-full h-[120px] md:h-[60px] mb-0">
          <label className="w-full sm:w-1/2 flex flex-col text-[#FFFFFF] gap-2 md:gap-2 text-[14px] md:text-[18px] leading-[25px]">
            Type:
            <select
              className=" h-[38px] bg-[#29292C] text-[16px] p-2 rounded-md text-[#8a8686]"
              value={nftType}
              onChange={(e) => setNftType(e.target.value)}
            >
              <option value="common" className="text-[16px] text-[#8a8686]">
                Common
              </option>
              <option value="mythic" className="text-[16px] text-[#8a8686]">
                Mythic
              </option>
              <option value="rare" className="text-[16px] text-[#8a8686]">
                Rare
              </option>
              <option value="uncommon" className="text-[16px] text-[#8a8686]">
                Uncommon
              </option>
            </select>
          </label>

          <label className="w-full sm:w-1/2 flex flex-col text-[#FFFFFF] gap-2 md:gap-2 text-[14px] md:text-[18px] leading-[25px]">
            Quantity:
            <input
              value={nftQuantity}
              onChange={(e) => setNftQuantity(e.target.value)}
              type="text"
              className="pl-4 rounded-md h-[38px] p-2 bg-[#29292C] text-[16px] text-[#8a8686]"
            />
          </label>
        </div>

        <div className="mt-1">
          <label className="w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[18px] leading-[25px]">
            Image
            <ImageUploader
              captureUploadedNftImage={captureUploadedNftImage}
              captureUploadedNftImageFile={captureUploadedNftImageFile}
            />
          </label>
        </div>

        <div className="mt-1">
          <label className="mt-[20px] w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
            Price(in Dollor)
            <input
              value={nftPrice}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="pl-4 w-[100%] h-[38px] bg-[#29292C] rounded-md text-[16px]  text-[#8a8686] "
            />
          </label>
        </div>

        <div className="mt-1">
          <label className="w-[100%] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
            NFT's Description
            <textarea
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              type="textarea"
              rows={5}
              className="pl-2 w-[100%] h-[100px]  bg-[#29292C] rounded-md mt-1   text-[16px]  text-[#8a8686] "
            ></textarea>
          </label>
        </div>
        <div className="flex justify-center mt-2 md:mt-3">
          <YellowButton methodName={() => onClickAddButton()}>Add</YellowButton>
          {/* <button
            type="submit"
            className="h-[38px] w-[150px] border-0 bg-[#FCD37B] text-[#000000] rounded-sm"
            onClick={onClickAddButton}
          >
            ADD
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Modal;
