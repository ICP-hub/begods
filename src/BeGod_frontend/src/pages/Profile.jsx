import React, { useEffect, useState } from 'react';
import Navbar from '../components/Landing Page Components/Navbar';
import Footer from '../components/Footer';
import NftCard from '../components/NftCard';
import { Link } from 'react-router-dom';
import YellowButton from '../components/button/YellowButton';
import { useAuth } from '../utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ImageUploader from '../Admin/collection/ImageUploader';
import { RxCross2 } from "react-icons/rx";
import { Principal } from "@dfinity/principal";
import { BiCategory } from "react-icons/bi";
import { IoCheckmarkOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import MoonLoader from "react-spinners/MoonLoader";

import { City, Country } from 'country-state-city'; 

import { FaTelegram } from "react-icons/fa6";
import { RiFileCopyLine } from 'react-icons/ri';
import { CopyToClipboard } from 'react-copy-to-clipboard';



const buyingStatus = {
   initial : "INITIAL",
   deliveryInfo : "DELIVERYINFO",
   showCollection : "COLLECTION"
}

const Profile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardsLoading,setIsCardsLoading] = useState(true);
  const [noCards,updateNoCardsStatus] = useState(false);

  const [selectedList , updateSelectedList] = useState([]);
  const [currentOption,updateCurrentOption] = useState("mycollection");

  const allCollectionsList = useSelector((state)=> state.info.collectionList);

  console.log("all collection list in profile",allCollectionsList)

  const [favIds,setFavIds] = useState(undefined);
  
  const { principal } = useAuth();

  const [isUserDetailsLoadging,updateUserDetailsLoading] = useState(true);

  const [isDisplayCollectionDropDown , updateDropDownStatus] = useState(false);
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [remainingNftsCount,updateRemainingNfts] = useState([]);

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/')
     }else{
      console.log(principal,'principal')
     }
  },[isAuthenticated]);


const [placeOrderPopup , setplaceOrderPopup] = useState(false);
const [currentOrderingStatus , updateOrderingStatus] = useState(buyingStatus.showCollection);
const [selectedCountry , updateSelectedCountry] = useState("")
const [selectedCity , updateSelectedCity] = useState("");
const [phoneNo , updatePhoneNumber] = useState(NaN);
const [orderEmail,updateOrderEmail] = useState("");
const [streetAddress,updateStreetAddress] = useState('');
const [pinCode , updatePinCode] = useState(NaN);
const [landMark,updateLandMark] = useState("");

const countries = Country.getAllCountries().map((eachCountry) => ({
  id : eachCountry.isoCode,
  displayText : eachCountry.name,
}));

const [cityList,updateCityList] = useState([]);



const togglePlaceOrderPopup  = () => {
  setplaceOrderPopup(!placeOrderPopup);
  updateOrderingStatus(buyingStatus.showCollection);
}

const onChangeCoutry = (event) => {
  console.log(event.target.value);
  const cities = City.getCitiesOfCountry(event.target.value);
  updateCityList(cities);
  updateSelectedCountry(event.target.value)
}

const onChangeCity = (event) => {
  if(cityList.length != 0){
      updateSelectedCity(event.target.value)
  }
}
const onClickPlaceOrder = () => {
  if (
    selectedCountry.trim() !== "" &&
    selectedCity.trim() !== "" &&
    !isNaN(phoneNo) && 
    orderEmail.trim() !== "" &&
    /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(orderEmail) && 
    streetAddress.trim() !== "" &&
    !isNaN(pinCode) && pinCode.toString().length === 6
  ) {
    togglePlaceOrderPopup(true);
    toast.success("Order Placed Successfully")
  } else {
    toast.error("Please fill out all fields correctly, including a valid phone number, email, and pin code.")
  }
};


  const [currentDropDownOption , updateDropDownOption] = useState(0);


  const onOptionChange = async(updatedOption) => {
    updateCurrentOption(updatedOption)
    if(updatedOption !== currentOption){
      updateNoCardsStatus(false);
      setIsCardsLoading(true)
      if(updatedOption === "mycollection"){
        await fetchCollections();
      }else if(updatedOption === "favorite"){
        await fetchFavoriteCards();
      }
    }

  } 

  const fetchFavoriteCards = async() => {
    const result = await backendActor?.getFavorites(principal)
    console.log("resssssssult" , result);
    if(result.ok?.length>0){

      const favItems = result.ok;

      let favCardslist = [];
      favItems.map((eachFavToken)=>{
       for(let i=0;i<selectedList.length;i++){
        if(selectedList[i][0].tokenId === eachFavToken){
          favCardslist.push(selectedList[i][0]);
        }
       }
      })

      console.log("favList",favCardslist)

      setIsCardsLoading(false);

      updateSelectedList(favCardslist);


    }else{
      
      updateNoCardsStatus(true);
      
    }
    
  }

 


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? selectedList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === selectedList.length - 1 ? 0 : prevIndex + 1));
  };

   
   
  //  console.log("is authenticated in profile section" , isAuthenticated);
 
  useEffect(() => {
    setCurrentIndex(0);

  },[selectedList])

const {t} = useTranslation();
const { backendActor } = useAuth({});

const [userDetails,updateUserDetails] = useState({})
const [userName,updateUserName] = useState("");
const [email,updateEmail] = useState("");
const [telegramUrl,updateTelegramUrl] = useState("");

const [isDisplayEditProfile,updateEditProfileStatus] = useState(false);
const [profileUpdateInProcess,setProfileUpdateInProcess] = useState(false);
// const [displayProfileUpdateSuccess,updateDisplayProfileUpdateSuccess] = useState(false);



const onClickUpdateUserDetails = async() => {
    setProfileUpdateInProcess(true)
  
    let updatedName = userName === "" ? userDetails.name : userName;
    let updatedEmail = email === "" ? userDetails.email : email;
    let updatedTelegramUrl = telegramUrl === "" ? userDetails.telegramUrl : telegramUrl;
    
    
    console.log("updated user details",updatedName,updatedEmail,updatedTelegramUrl);

    await backendActor?.updateUserDetails(Principal.fromText(principal),updatedName,updatedEmail,updatedTelegramUrl,[]);
    updateUserDetails({name:updatedName,email:updatedEmail,telegramUrl:updatedTelegramUrl});
    toast.success("Updated Successfully!")
    setProfileUpdateInProcess(false);
    updateUserName("");
    updateEmail("");
    updateTelegramUrl("");
    updateEditProfileStatus(false);
    // updateDisplayProfileUpdateSuccess(true);
  //  console.log("updatedUserDetails result",updateResult);
}

useEffect(()=>{
  fetchUserDetails()
},[])

const fetchUserDetails= async () => {
     const fetchUserResults= await backendActor?.getUserDetails(Principal.fromText(principal));
      console.log("user details" , fetchUserResults)
     if(Array.isArray(fetchUserResults.ok)){
       const result = fetchUserResults.ok;
        
      const newDetails = {
        name : result[3],
        email : result[4],
        telegramUrl : result[5],
       }
       updateUserDetails((prev)=>({...prev,...newDetails}))
       updateUserDetailsLoading(false);
     }
    
}


  const checkIsFavourite = async(tokenId) => {
      const ids = await backendActor?.getFavorites(principal);
      // console.log("iddddddddds",ids);
      if(ids.ok?.length>0){
        console.log("inside if")
        for(let i=0;i<ids.ok.length;i++){
        console.log("fav token id",ids.ok[i]);
        if(ids.ok[i] == tokenId){
          return true;
        }
      }
      }
      
      return false;
  

  }

const fetchCollections = async () => {
     console.log("all collection list ",allCollectionsList);
    if(allCollectionsList.length === 0){
      updateNoCardsStatus(true);
      return;
    }
    const currentSelectedCollection = allCollectionsList[currentDropDownOption];
    await getSelectedOptionCards(currentSelectedCollection.collectionId);
};

  const getSelectedOptionCards =  async(collectionId) => {
    let updatedCardsList = [];
    const collectionDetailsResult = await backendActor.userNFTcollection(collectionId,principal)
    const ownedNfts = collectionDetailsResult.ok.boughtNFTs;
   // console.log("owned nfts after fetching",ownedNfts);
    const notOwnedNfts = collectionDetailsResult.ok.unboughtNFTs;
   // console.log("not owned nfts after fetching",notOwnedNfts);
    const updatedOwnedList = await getUpdatedList(collectionId,ownedNfts,[],true);
   // console.log("owned nfts",updatedOwnedList);
    updatedCardsList = updatedOwnedList;
    const updatedNotOwnedNfts = await getUpdatedList(collectionId,notOwnedNfts,updatedOwnedList,false);
   // console.log("not owned nfts",updatedNotOwnedNfts);
    updateRemainingNfts(updatedNotOwnedNfts.length);
    updatedCardsList = [...updatedOwnedList,...updatedNotOwnedNfts];
    setIsCardsLoading(false);
    if(updatedCardsList.length >0){
      updateSelectedList(updatedCardsList);
    }else{
      updateNoCardsStatus(true);
    }
    

  }

  const getUpdatedList= async(collectionId,cardsList,ownedList,isOwned)=>{

      
      console.log("cards list",cardsList)
      const formatedList = [];
      let tempIndex = 0;
      for(let i=0;i<cardsList.length;i++){
        const eachCard = cardsList[i];
        console.log("each card",eachCard);
        const cardDetails = eachCard[2].nonfungible;
        let skipCard = false;
        if(!isOwned){
          console.log("owned list in getUpdatedlist",ownedList)
          for(let i = 0; i< ownedList.length;i++) {
            if(ownedList[i][0].cardName === cardDetails.name){
              skipCard = true;
              continue;
            }
          }
        }
        if(skipCard){
          continue;
        }

          console.log("card details",cardDetails)
          const metadata = JSON.parse(cardDetails.metadata[0].json);
          let isFav = false;
          if(isOwned){
           isFav = await checkIsFavourite(eachCard[0]);
          }
          // console.log("all collections",allCollectionsList,"currentindex",currentDropDownOption);
          
          const tempcard= {
                tokenId:eachCard[0],
                index : eachCard[1],
                collectionId,
                cardName:cardDetails.name,
                cardImageUrl:cardDetails.thumbnail,
                cardType:metadata.nftType,
                isOwned,
                isFavourite : isFav,
                borderColor : metadata.nftcolor,
                collectionColor : allCollectionsList[currentDropDownOption].collectionColor,
                price : parseInt(eachCard[5][0])/100000000
             }
             if(tempIndex === 0){
              formatedList.push([tempcard]);
              tempIndex++;
              }else if(formatedList[tempIndex-1][0].cardName === tempcard.cardName){
                  formatedList[tempIndex-1].push(tempcard);
              }else{
                  formatedList.push([tempcard]);
                  tempIndex++;
              }

      }

      return formatedList;
    
  }
   

   useEffect(()=>{
      fetchCollections()
   },[])


   

const removeFromFavorites = async(tokenId) => {
  const removeFavResult = await backendActor?.removeFromFavorites(principal,tokenId);
  console.log("remove fav result",removeFavResult);
  toast.success(removeFavResult.ok);
  if(currentOption === "favorite"){
    const updatedFavList = selectedList.filter((eachItem)=> (eachItem.tokenId != tokenId));
    updateSelectedList(updatedFavList);
  }else{
    const modifiedSelectedList = selectedList.map((eachItem)=>{
      if(eachItem[0].tokenId === tokenId){
        return  [{...eachItem[0],isFavourite:false},...eachItem.slice(1)];
      }
      return eachItem;
     })
     updateSelectedList(modifiedSelectedList)

  }
}

const addToFavorites = async(tokenId)=>{
  const result = await backendActor?.addToFavorites(principal,tokenId);
            console.log("add to fav result",result.ok);
            if(result.ok){
                // fetchCollections();
                
                const modifiedSelectedList = selectedList.map((eachItem)=>{
                  const eachCard = eachItem[0];
                  if(eachCard.tokenId === tokenId){
                    return [{...eachCard,isFavourite : true},...eachItem.slice(1)];
                     
                  }
                  return eachItem;
                 })
                 updateSelectedList(modifiedSelectedList)
                 toast.success(result.ok)

            }else{
                toast.error(result.err.Other)
            }

            
    
}

const onChangeFilterOption = (eachCollection) => {
  if (eachCollection.index != currentDropDownOption) {
    updateDropDownOption(eachCollection.index);
    updateDropDownStatus(!isDisplayCollectionDropDown);
    setIsCardsLoading(true);
    getSelectedOptionCards(eachCollection.collectionId);
  }
  
}
console.log("selected List",selectedList);
 
  return (
    <div className='font-caslon'>
      <div style={{ backgroundImage: `url('/Hero/smoke 1.png')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", }}>
        <Navbar />
        <div className='max-w-[1920px] mx-auto pl-[3%] mt-[5%] sm:mt-[3%] flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[30%]'>
            <h1 className='text-center lg:text-start text-[#FFFFFF] text-[32px] sm:text-[40px] leading-[60px] font-[400]'>{t('myProfile')}</h1>
            
              {!isUserDetailsLoadging && (
                <div className='flex gap-8 mt-[5%] lg:mt-[2%] ml-[2%]'>
                <div className='flex flex-col items-center'>
                  <img src="/image/Frame.png" alt="" />
                  <div className='mt-5'>
                    <a href={userDetails.telegramUrl} target="_blank"><FaTelegram size={25} color='#24A1DE' /></a>
                  </div>
                </div>
                <div>       
                    <div className='flex items-center'>
                      <div>
                      <h1 className='text-[20px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px]'>
                       {userDetails.name}
                          </h1>
                            <h1 className='text-[13px] sm:text-[16px] font-[400] text-[#FFFFFF] leading-[40px]'>{userDetails.email}</h1>
                        </div>
                      </div>
                {/* <h2 className='ext-[20px] sm:text-[22px] font-[400] text-[#FFFFFF] leading-[25px]'>Wallet ID: 581918156</h2>
                <h2 className='ext-[20px] sm:text-[22px] font-[400] text-[#FFFFFF] leading-[25px]'>Balance: 200 ICP</h2> */}
                <h2 className='ext-[20px] sm:text-[22px] font-[400] text-[#FFFFFF] leading-[25px] flex items-center'>User Id: {principal.slice(0,4)}....{principal.slice(-4)}

                <CopyToClipboard text={principal}>
                <span className="ml-2 cursor-pointer text-slate-300" onClick={()=>toast.success("Copied")}>
                            <RiFileCopyLine />
                          </span>
                        </CopyToClipboard>    
                </h2>
                    
                <button
            onClick={()=>updateEditProfileStatus(true)}
            className=' flex items-center justify-center mt-4 w-[130px]  h-[30px] sm:w-[100px] sm:h-[28px] bg-blue-400 text-black border-3px border-gray-100 shadow-lg transform transition-transform hover:scale-105 font-caslon rounded-sm'>Edit Profile
            </button>
              </div>
              </div>
              )}
            
            
          </div>

          <div className='w-full lg:w-[70%]'>
            <div className='flex items-center justify-center gap-[10%] mt-8 lg:mt-0'>
              <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${currentOption === "mycollection" ? 'border-b-4 border-[#FFD700]' : ''}`}
                onClick={() => onOptionChange("mycollection")}
              >
                {t('myCollection')}
              </div>
              <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${currentOption === "favorite" ? 'border-b-4 border-[#FFD700]' : ''}`}
                onClick={() => onOptionChange("favorite")}
              >
                {t('favorite')}
              </div>
              {/* <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${category === "favorite" ? 'border-b-4 border-[#FFD700] pb-2' : ''}`}
              >
                My Achievements
              </div> */}
            </div>
            {allCollectionsList.length >0 && (
              <div className="relative z-10 flex items-center justify-between mt-5 md:w-full ">
                           
              <button
                  onClick={()=>updateDropDownStatus(!isDisplayCollectionDropDown)}
                  className={`rounded-full flex justify-center items-center gap-1 
                 min-w-[120px] h-[35px] sm:h-[40px]  md:w-[180px] p-2 bg-[#000] text-[#FCD378]  hover:border-[#FCD378] border-2 border-gray-800`}
              >
                  <BiCategory />
                  {allCollectionsList[currentDropDownOption].name}
              </button>
              {isDisplayCollectionDropDown && (
                      <ul className="absolute top-10 left-0 mt-2  bg-black text-[#FCD378] rounded shadow-lg  p-0 list-none  min-w-[120px]   md:w-[180px] max-h-[160px] overflow-y-auto ">
                          {allCollectionsList.map((eachCollection,index)=>(
                              <>
                                  <div key={eachCollection.index} className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-purple-900'
                                  onClick={()=>onChangeFilterOption(eachCollection)}>
                                      <li key={eachCollection.index}>{eachCollection.name}</li>
                                      {currentDropDownOption === eachCollection.index && (
                                        <IoCheckmarkOutline />
                                      )}
                                  </div>
                                  {index != allCollectionsList.length-1 && ( <hr className="m-0 border-t border-[#FCD378]" />)}
                              </>
                          ))}
                      </ul>
                  )}
                {currentOption === "mycollection" && (
                      <div className='flex flex-col items-center mr-5 md:items-end lg:mr-20'>
                      <div className='flex items-center justify-end '>
                            <div className={`relative ${remainingNftsCount>0 && "group"}`}>
                              <button 
                                disabled={remainingNftsCount > 0} 
                                className={`bg-[#FCD378] border-none text-[#000000] h-[35px] w-[150px] rounded-sm ${remainingNftsCount === 0 ? "opacity-100" : "opacity-40 cursor-not-allowed"}`}
                                onClick={togglePlaceOrderPopup}
                              >
                                Unlock Achievement
                              </button>
                              
                                <span className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#000000] text-[#FCD378] w-[150px] lg:w-[250px] text-center py-1 rounded`}>
                                Buy remaining {remainingNftsCount} nfts to place order!
                              </span>
                              
                            </div>
                          </div>
  
  
                        
                      </div>
                    )}
          </div>
            ) }
            {/* Small screen view for single image display with prev and next buttons */}
            <div className='z-0 flex items-center justify-between mt-8 sm:hidden'>
              
              <button onClick={handlePrev}>
                <img src="/Hero/up.png" alt="Previous" className='w-10 h-10 -rotate-90' />
              </button>
              {isCardsLoading?(
                  <SkeletonTheme baseColor="#161616" highlightColor="#202020">
                  <div className='mb-8'>
                      <Skeleton count={1} width={250} height={350} />
                  </div>
              </SkeletonTheme>
                  
                ):(
                  noCards ? (
                    <h1 className='text-[#FFD700] text-[22px] my-20'>No Cards Availalbe</h1>
                  ):(
                    selectedList.length>0 ? (
                      <div>
                      <NftCard img={selectedList[0][currentIndex]} key={currentIndex} removeFromFavorites={removeFromFavorites} addToFavorites = {addToFavorites}/> 
                    </div>
                    ):(
                      <h1 className='text-[#FFD700] text-[22px] my-20'>No Cards Availalbe</h1>
                    )
                  )
                  
                )}
              
              <button onClick={handleNext}>
                <img src="/Hero/down.png" alt="Next" className='w-10 h-10 -rotate-90' />
              </button>
            </div>
          
            {/* Grid view for larger screens */}
            {noCards ? (
                <div className='hidden w-[90%] h-[65vh] sm:flex justify-center items-center '>
                  <h1 className='text-[#FFD700] text-[40px]'>No Cards Available</h1>
                </div>
            ):(
              
               (isCardsLoading ? (
                        <div className="pb-10">
                        <SkeletonTheme baseColor="#161616" highlightColor="#202020">
                          <div className="justify-around hidden gap-5 m-5 md:grid md:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 10 }).map((_, index) => (
                              <Skeleton
                                key={index}
                                count={1}
                                width={210}
                                height={300}
                              />
                            ))}
                          </div>
                        </SkeletonTheme>
                        </div>
                    ):(
                      <>
                     
                    {selectedList.length === 0 ? (
                      <div className='hidden w-[90%] h-[65vh] sm:flex justify-center items-center '>
                      <h1 className='text-[#FFD700] text-[40px]'>No Cards Available</h1>
                    </div>
                    ):( 
                      <>
                      <div className='hidden w-[90%] min-h-[65vh] sm:grid sm:grid-cols-3 2xl:grid-cols-4 gap-24 lg:gap-4 mt-8 sm:mx-10 mb-8'>
                      {selectedList.length > 0 && selectedList.map((img, index) => (
                        <div className='w-full rounded-lg flip-card'>
                          {currentOption === "mycollection" ? (
                            <NftCard img={img[0]} key={index} removeFromFavorites={removeFromFavorites} addToFavorites = {addToFavorites} quantity = {img.length} />
                          ):(
                            <NftCard img={img} key={index} removeFromFavorites={removeFromFavorites} addToFavorites = {addToFavorites}  />
                          )}
                        </div>
                      ))}
                        
                    </div>
                    
                    </>
                    )}
                    </>
                    ))
            )}
          </div>
        </div>
      </div>

      <div style={{backgroundImage: `url('/Hero/footer 1.png')`, backgroundRepeat: "no-repeat" }} className='relative overflow-hidden bg-center bg-cover'>
        <Footer />
      </div>
      {isDisplayEditProfile && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 w-screen h-screenn">
        <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-[rgba(49,49,49,0.8)]">
          <div className="flex items-center justify-center h-screen">
            <div
              className="h-[40vh] w-[90vw] md:h-[40vh]  lg:w-[30vw] bg-[#111] text-white font-caslon p-5 rounded-md overflow-y-auto drop-shadow-lg "
            >
              <div className="relative flex items-center justify-end">
                <button
                  className="text-[#ffffff] absolute bottom-1 top-1 z-10"
                  onClick={() => updateEditProfileStatus(false)}
                >
                  <RxCross2 size={20} />
                </button>
              </div>
                <div>
                  <div className='mt-10 mb-5'>
                <div className='flex flex-col mb-1'>
                  <label>Name</label>
                  <input onChange={(e)=>updateUserName(e.target.value)} type='text' placeholder='Enter your name' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm ' value={userName}/>
                </div>
                <div className='flex flex-col'>
                  <label>Email</label>
                  <input onChange={(e)=>updateEmail(e.target.value)} type='email' placeholder='Enter your email' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm' value={email} />
                </div>
                <div className='flex flex-col'>
                  <label>Telegram</label>
                  <input onChange={(e)=>updateTelegramUrl(e.target.value)} type='text' placeholder='Enter your telegram link' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm' value={telegramUrl} />
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <button className={`w-20 border-none bg-[#FCD378] text-black h-6 mr-3 rounded-full `}  
                >Cancel</button>
                {profileUpdateInProcess ? (
                  <div className='flex justify-center items-center w-20 border-none bg-[#FCD378] text-black h-6 rounded-full'>
                  <MoonLoader
                  color="#000000"
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                </div>
                ):(
                  <button className={`w-20 border-none bg-[#FCD378] text-black h-6 rounded-full `}
                onClick={()=>onClickUpdateUserDetails()}
                >Update</button>
                )}
              </div>
                </div>
          </div> 
        </div>
    </div>
  </div>
      )}
      {placeOrderPopup && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 w-screen h-screen">
        <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-[rgba(49,49,49,0.8)]">
          <div className="flex items-center justify-center h-screen">
          <div className={`  bg-[#111] text-white font-caslon p-3 md:p-8 rounded-md overflow-y-auto drop-shadow-lg ${
            currentOrderingStatus === buyingStatus.deliveryInfo
              ? "w-[95vw] md:w-[95vw] md:h-[50vh] lg:w-[50vw] lg:h-[40vh] 2xl:h-[70vh] "
              : "h-[70vh] w-[95vw] md:w-[50vw] md:h-[50vh] lg:w-[40vw] lg:h-[50vh] 2xl:h-[60vh] "
          }`}>
             <div className="relative flex items-center justify-end">
                  <button
                    className="text-[#ffffff] absolute bottom-1 top-1"
                    onClick={() => togglePlaceOrderPopup()}
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
            {currentOrderingStatus === buyingStatus.showCollection && (
              <div className="h-[90%]  flex flex-col items-center justify-center gap-2 mt-4">
                <h1 className="text-xl lg:text-3xl font-semibold text-[#FCD37B] ">CONGRATULATIONS!!!</h1>
                <p className="my-1 text-sm font-medium font-caslonAntique">You Unlocked</p>
                <img src={allCollectionsList[currentDropDownOption].image} className=" w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full drop-shadow-lg" />
                <h1 className="my-3 text-lg font-semibold lg:text-3xl">
                  {allCollectionsList[currentDropDownOption].name.toUpperCase()} {'  '} {' '} COLLECTION
                </h1>
                {/* <button
                  
                  className="mt-3 w-40 border border-white border-solid cursor-pointer bg-[#1E62AC]"
                >
                  Get A Hard Copy
                </button> */}
                <div className=" w-[190px] lg:w-[220px] p-2 border-[1px] border-[#FCD37B]">
                <button
                  className="w-full text-black bg-[#FCD37B] border border-[#FCD37B] rounded-[3px] hover:bg-[#D4A849] hover:border-[#D4A849] h-[30px] font-caslon font-semibold "
                  onClick={() => updateOrderingStatus(buyingStatus.deliveryInfo)}
                >
                  Get Hard Copy
                </button>
                
              </div>
              </div>
            )}
            {currentOrderingStatus === buyingStatus.deliveryInfo && (
              <div className="md:mt-5">
                <h1 className="text-2xl font-semibold">Delivery Info.</h1>
                <div className="relative flex items-center my-3">
                  <img
                    src={allCollectionsList[currentDropDownOption].image}
                    className=" w-[70px] h-[70px]  rounded-full"
                  />
                  <div className="ml-2">
                    <h1 className="text-lg font-semibold">{allCollectionsList[currentDropDownOption].name.toUpperCase()} {'  '} {' '} COLLECTION</h1>
                    <p className="text-sm font-extralight">Hard Copy</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col w-[40%] relative">
                    <label className="text-lg font-semibold">
                      Phone No.<span className="absolute text-red-700 -top-1">*</span>
                    </label>
                    <input
                      type="number"
                      className="bg-transparent border-0 border-b border-white border-solid"
                      value={phoneNo}
                      onChange={(e)=>updatePhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-[40%] relative">
                    <label className="text-lg font-semibold">
                      Email<span className="absolute text-red-700 -top-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-transparent border-0 border-b border-white border-solid"
                      value={orderEmail}
                      onChange={(e)=>updateOrderEmail(e.target.value)}
                    />
                  </div>
                </div>
                <h1 className="mt-3 text-lg font-semibold">Address</h1>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col w-[35%]">
                    <label className="relative text-sm font-extralight">
                      H No, St No
                      <span className="absolute text-red-700 -top-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="bg-transparent border-0 border-b border-white border-solid"
                      value={streetAddress}
                      onChange={(e)=>updateStreetAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-[35%]">
                    <label className="relative text-sm font-extralight">
                      City<span className="absolute text-red-700 -top-1">*</span>
                    </label>
                    <select
                      className="bg-transparent border-b font-Quicksand"
                      value={selectedCity}
                      onChange={onChangeCity}
                    >
                      <option value="" disabled hidden></option>
                      {!selectedCountry ? (
                        <option
                          value=""
                          disabled
                          className="text-white bg-black border-0 border-none font-Quicksand"
                        >
                          Select a country first
                        </option>
                      ) : cityList.length === 0 ? (
                        <option value="" disabled>
                          No cities available
                        </option>
                      ) : (
                        cityList.map((eachCity) => (
                          <option
                            value={eachCity.name}
                            key={eachCity.name}
                            className="bg-black border-0 border-none font-Quicksand"
                          >
                            {eachCity.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col w-[20%] relative">
                    <label className="text-sm font-extralight">
                      Country
                      <span className="absolute text-red-700 -top-1">*</span>
                    </label>
                    <select
                      className="bg-transparent border-b font-Quicksand"
                      value={selectedCountry}
                      onChange={onChangeCoutry}
                    >
                      <option value="" disabled hidden></option>
                      {countries.map((eachCountry) => (
                        <option
                          value={eachCountry.id}
                          key={eachCountry.id}
                          className="bg-black border-0 border-none font-Quicksand"
                        >
                          {eachCountry.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex flex-col w-[35%] mb-3 mr-9">
                    <label className="text-sm font-extralight">
                      Pincode
                      <span className="absolute text-red-700 -top-1">*</span>
                    </label>
                    <input
                      type="number"
                      className="bg-transparent border-0 border-b border-white border-solid"
                      value={pinCode}
                      onChange={(e)=>updatePinCode(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-[35%] mb-3">
                    <label className="text-sm font-extralight">
                      Nearby LandMark(Optional)
                    </label>
                    <input
                      type="text"
                      className="bg-transparent border-0 border-b border-white border-solid"
                      value={landMark}
                      onChange={(e)=>updateLandMark(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-extralight">
                    <span className="mr-2 text-red-700">*</span>
                    Mandatory Information
                  </p>
                </div>
                <div className='flex justify-center'>
                <div className="flex justify-center w-[190px] lg:w-[220px] p-2 border-[1px] border-[#FCD37B]">
                  <button className="w-full text-black bg-[#FCD37B] border border-[#FCD37B] rounded-[3px] hover:bg-[#D4A849] hover:border-[#D4A849] h-[35px] font-caslon font-semibold "
                  onClick={onClickPlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
                </div>
                
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Profile;