import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BackButton from "./BackButton";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../utils/useAuthClient.jsx";
import { Principal } from "@dfinity/principal";

const NftDetails = () => {
  const { id } = useParams();
  const { backendActor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // To handle loading state
  const [tokenid, settokenid] = useState();
  const [singletokendata, setsingletokendata] = useState();
  const nftdata = location.state?.list;
  const { list, collectiondata } = location.state || {};
  console.log(list);

  const tokenindex = nftdata?.[0];
  const userid = nftdata?.[1];

  const priceBigInt = nftdata[3]?.[0]?.toString() ?? "Price not found";
  const price = Number(priceBigInt) / 100000000;

  const metadataJson = nftdata[2]?.nonfungible?.metadata?.[0]?.json;
  const metadata = metadataJson ? JSON.parse(metadataJson) : null;
  console.log(nftdata[1]);

  const collid = collectiondata[1];

  const getListing = async (collid) => {
    setLoading(true);
    try {
      console.log(collid);
      const userPrincipalArray = collid;

      const principalString = Principal.fromUint8Array(userPrincipalArray._arr);

      const result = await backendActor?.listings(principalString);
      console.log("Listing", result);
      settokenid(result);
    } catch (error) {
      console.error("Error fetching listing:", error);

      return error; // Return error
    }
  };
  const getdata = async (collid, tokenindex, userid) => {
    setLoading(true);
    try {
      console.log(collid);
      const userPrincipalArray = collid;

      const principalString = Principal.fromUint8Array(userPrincipalArray._arr);

      const result = await backendActor?.getSingleNonFungibleTokens(
        principalString,
        tokenindex,
        userid
      );
      console.log("in single token", result);
      setsingletokendata(result);
    } catch (error) {
      console.error("Error fetching listing:", error);

      return error; // Return error
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getListing(collid);
        await getdata(collid, tokenindex, userid);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // If there's no NFT data, return a message or redirect back
  if (!nftdata && !loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">No NFT data found</p>
      </div>
    );
  }
  console.log(tokenid);

  const identifier = tokenid?.[0]?.[1] || "null";
  console.log("Identifier:", identifier);

  console.log(singletokendata);
  const owner = singletokendata?.[0]?.[1];
  const isOwned = singletokendata?.[0]?.[4];
  console.log(owner, isOwned);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#282828">
      <div className="2xl:mt-[10vh]">
        {/* Back Button */}
        <div className="flex justify-start items-center mx-auto w-11/12 pt-9 mb-8 hover:cursor-pointer">
          <div className="hidden sm:block">
            <BackButton />
          </div>
        </div>

        {/* NFT Details Section */}
        <div className="flex flex-col sm:flex-row mt-10 sm:mt-0 sm:ml-10 lg:ml-20 gap-6">
          {/* NFT Image */}
          <div className="flex justify-center mb-4 sm:mb-0">
            {loading ? (
              <Skeleton height={380} width={280} />
            ) : (
              <img
                src={nftdata[2]?.nonfungible?.thumbnail ?? "Image not found"}
                alt="NFT Thumbnail"
                className="object-cover rounded-md w-full max-w-[280px] h-auto"
              />
            )}
          </div>

          {/* NFT Details Card */}
          <div className="justify-center w-full sm:w-[50%] md:w-[60%] bg-[#29292c] mb-4 sm:mb-0  ml-[30%] sm:ml-0  rounded-md p-6 gap-4">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton width={150} height={25} />
                <Skeleton width={180} height={25} />
                <Skeleton width={120} height={25} />
                <Skeleton width={200} height={25} />
                <Skeleton width={100} height={25} />
                <Skeleton width={80} height={25} />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-white text-lg">
                  <span className="font-semibold">NFT Name: </span>
                  <span>
                    {nftdata[2]?.nonfungible?.name ?? "Name not found"}
                  </span>
                </p>
                <p className="text-white text-lg">
                  <span className="font-semibold">Collection:</span>
                  <span>{collectiondata[2] || "Not Available"}</span>
                </p>
                <p className="text-white text-lg">
                  <span className="font-semibold">NFT ID:</span>
                  <span>{identifier || id}</span>
                </p>
                <p className="text-white text-lg">
                  <span className="font-semibold">Owner:</span>
                  <span>{owner || "Unknown"}</span>
                </p>
                <p className="text-white text-lg">
                  <span className="font-semibold">Price:</span>
                  <span>{price || "Not Listed"} ICP</span>
                </p>
                <p className="text-white text-lg">
                  <span className="font-semibold">Listed:</span>
                  <span>{isOwned ? "Yes" : "No"}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default NftDetails;
