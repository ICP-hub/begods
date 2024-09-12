import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuthClient';
import { FaUserLarge } from "react-icons/fa6";

const Navbar = ({ mobileView }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [lang, setLang] = useState('en'); // Default to English
    const [modal , setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropDown , setProfileDropDown] = useState(false);
    const [connectWalletDropdown , setConnectWalletDropdown] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        mobileView();
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const toggleProfileDropDown = () => {
        setProfileDropDown(!profileDropDown);
    }
    const { i18n, t } = useTranslation();

    const { reloadLogin, isAuthenticated, logout ,login } = useAuth();

    useEffect(() => {
        // Reload login and set login status when the component mounts
        const checkLoginStatus = async () => {
            await reloadLogin(); // Ensure that login status is refreshed
             // Update state based on authentication
        };

        checkLoginStatus();

        if(modal === true) {
            toggleModal(false);
        }
    }, [isAuthenticated, reloadLogin]); // Re-run effect when `isAuthenticated` changes

    useEffect(() => {
        // Change language when `lang` changes
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

   // console.log("isLogged In" , isAuthenticated)
    

    const onClickLogout = async() => {
       
        await logout();
        navigate("/")
        
    }

    const toggleConnectWalletDropdown = () => {

        setConnectWalletDropdown(!connectWalletDropdown);

    }
    

        

    return (
        <div  className='max-w-[1920px] mx-auto w-full h-[10vh] flex items-center justify-between text-white relative'>
            {/* Mobile View */}
            <div className='md:hidden w-full flex items-center justify-between gap-4 relative'>
                <Link to="/" className='flex md:hidden pt-20'>
                    <img src="/Hero/logo.png" alt="" />
                </Link>
                <button onClick={toggleMenu} className='mr-8 z-30'>
                    {isOpen ? <FaTimes size={36} /> :<img src='/Hero/hamburger.png' className='h-12'/>}
                </button>

            </div>

            {/* Desktop View */}
            <div className='max-w-[1920px] mx-auto w-full h-[10vh] hidden md:flex items-center justify-between text-white font-caslon' >
                <Link to="/" className='pt-20'>
                    <img src="/Hero/logo.png" alt="" />
                </Link>
                <div className='p-5  flex space-x-5 items-center'>
                    <Link to="" className='pt-4 text-[24px] font-[500] leading-[28.92px] text-[#FCD37B]'>Collection</Link>

                    <li className='relative list-none pt-4 w-[130px] flex justify-center '>
                         <button
                          onClick={toggleDropdown}
                          className="text-[24px] font-[500] leading-[28.92px] pt-0.5 text-[#FCD37B] flex justify-center items-center"
                        >
                          符 ENG <span className="ml-2 text-sm ">▼</span>
                        </button>
                        {dropdownOpen && (
                          <ul className="absolute left-0 mt-10 bg-slate-900 text-[#FCD378]  rounded shadow-lg w-36 p-0 list-none">
                            <li className="px-4 py-2 hover:bg-purple-900 cursor-pointer">
                              English
                            </li>
                            <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                            <li className="px-4 py-2 hover:bg-purple-900 cursor-pointer">
                              Hindi
                            </li>
                            <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                            <li className="px-4 py-2 hover:bg-purple-900 cursor-pointer">
                              Telugu
                            </li>
                          </ul>
                        )}
                    </li> 
                 
                      {isAuthenticated ?  (
                       <nav className='relative list-none pt-4 w-[180px] h-[50px] flex justify-center items-center'>
                       <button
                        onClick={toggleProfileDropDown}
                        className="text-[24px] font-[500] leading-[28.92px] pt-0.5 h-full w-full rounded-sm text-white   flex justify-center items-center  bg-[#000000] border border-solid border-white"
                      >
                     <span className="mr-1"><FaUserLarge size={15} /></span> Dcd4-744
                      </button>
                      {profileDropDown && (
                        <ul className="absolute top-4 left-2 mt-10 bg-black text-[#FCD378]  rounded shadow-lg w-36 p-0 list-none">
                          <li to="/profile" className="px-4 py-2 hover:bg-purple-900 cursor-pointer" onClick={() => navigate("/profile")}>
                            Profile
                          </li>
                          <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                          <li className="px-4 py-2 hover:bg-purple-900 cursor-pointer">
                            Activity
                          </li>
                          <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                          <li className="px-4 py-2 hover:bg-purple-900 cursor-pointer" onClick={onClickLogout}>
                            Logout
                          </li>
                        </ul>
                      )}
                  </nav> 
                        
                      ):(

                        <div className='relative w-[180px] h-[50px] flex gap-8 mr-12 pt-2 '>
                        <button className='flex items-center bg-[#FCD37B] text-black  justify-center text-xl border-0  w-[100%] h-[100%] rounded-sm font-medium font-caslon hover:bg-[#000000] hover:text-[#FCD37B] ' onClick={toggleConnectWalletDropdown}>{t('button')}</button>
                        {connectWalletDropdown && (
                        <ul className="absolute top-4 mx-1  mt-10 bg-black text-[#FCD378]  rounded shadow-lg w-[170px] p-0 list-none">
                          <li  className="px-2 py-2 hover:bg-purple-900 cursor-pointer flex items-center" onClick={() => login("Identity")}>
                          <span className='mr-4'><img src="https://i.ibb.co/8gNN3v1/icp.png" className='size-6 rounded-full' /></span> Internet Identity
                          </li>
                          <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                          <li  className="px-2 py-2 hover:bg-purple-900 cursor-pointer flex items-center" onClick={() => login("Nfid")}>
                          <span className='mr-4'><img src="https://i.ibb.co/Y8ZMXhn/image.png" className='size-6 rounded-full' /></span>Nfid
                          </li>
                          <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                          <li  className="px-2 py-2 hover:bg-purple-900 cursor-pointer flex items-center">
                          <span className='mr-4'><img src="https://i.ibb.co/sm6rrPD/image.png" className='size-6 rounded-full' /></span>Bifinity
                          </li>
                          <hr style={{ backgroundColor: '#FCD378', height: '0.5px', border: 'none', width: '100%' }} />
                          <li  className="px-2 py-2 hover:bg-purple-900 cursor-pointer flex items-center">
                          <span className='mr-4'><img src="https://docs.plugwallet.ooo/imgs/logo.png" className='size-6 rounded-full' /></span>Plug
                          </li>
                        </ul>
                        
                      )}
                    </div>
                    

                      )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className='absolute pt-24 top-0 left-0 bottom-0 w-full h-screen bg-black bg-opacity-70 backdrop-blur-lg text-white flex flex-col items-center gap-8 py-8 z-10 md:hidden'>
                    <Link to="/" className='text-[24px] font-[400] leading-[30px]'>
                        {t('nav1')}
                    </Link>
                    <div className='text-[24px] font-[400] leading-[30px]'>
                        {t('nav2')}
                    </div>
                 
                        {isAuthenticated ?  (
                        <>
                       
                    <Link to="/profile" className='flex items-center justify-center text-lg border-[2px] border-gray-200 w-[60vw] h-[4vh] rounded-md' >
                            Profile
                        </Link>
                     
                    <div  className='flex items-center justify-center text-lg border-[2px] border-gray-200 w-[60vw] h-[4vh] rounded-md' onClick={onClickDisconnect}>
                            Disconnect
                        </div>
                        </>
                        
                      ):(

                        <div  className='flex items-center justify-center text-lg border-[2px] border-gray-200 w-[60vw] h-[4vh] rounded-md' onClick={toggleModal}>
                        {t('button')}
                    </div>
                      )}
                </div>
            )}

            {modal && (
                <div className='w-screen h-screen top-0 bottom-0 left-0 right-0 fixed z-40'>
                    <div className='w-screen h-screen top-0 bottom-0 left-0 right-0 fixed bg-[rgba(49,49,49,0.8)]'>
                        <div className='h-screen flex justify-center items-center'>
                            <div className='w-[80vw] h-[40vh] md:h-[35vh] lg:h-[33vh] xl:h-[55vh] sm:w-[50vw] lg:w-[35vw] 2xl:w-[25vw] bg-gray-800 rounded-mdp-[20px] font-Roboto   md:p=[30px] overflow-auto'>
                                <div className="flex justify-end items-center">
                                    <button className="text-[#ffffff]" onClick={() => toggleModal()}>
                                        <RxCross2 size={25} />
                                    </button>
                                </div>
                                <h1 className='text-center text-[25px] md:text-[30px] m-0 font-Roboto'>Connect Wallet</h1>
                                <div className='flex flex-col h-[70%] overflow-y-auto'>
                                    <button className='pl-3 mt-5 h-[40px] w-full bg-gray-700 rounded-lg flex justify-start items-center text-[16px] sm:text-[20px] hover:text-slate-200 ' onClick={()=>login("Identity")}><span className='mr-4'><img src="https://i.ibb.co/8gNN3v1/icp.png" className='size-8 rounded-full' /></span> Internet Identity</button>
                                    <button className='pl-3 mt-5 h-[40px] w-full bg-gray-700 rounded-lg flex justify-start items-center text-[16px] sm:text-[20px]  hover:text-slate-200  ' onClick={()=>login("Nfid")}><span className='mr-4'><img src="https://i.ibb.co/Y8ZMXhn/image.png" className='size-8 rounded-full' /></span>Nfid</button>
                                    <button className='pl-3 mt-5 h-[40px] w-full bg-gray-700 rounded-lg flex justify-start items-center text-[16px] sm:text-[20px]  hover:text-slate-200  '><span className='mr-4'><img src="https://i.ibb.co/sm6rrPD/image.png" className='size-8 rounded-full' /></span>Bifinity</button>
                                    <button className='pl-3 mt-5 h-[40px] w-full bg-gray-700 rounded-lg flex justify-start items-center text-[16px] sm:text-[20px]  hover:text-slate-200 '><span className='mr-4'><img src="https://docs.plugwallet.ooo/imgs/logo.png" className='size-8 rounded-full' /></span>Plug</button>
                                </div>
                            </div>
                        </div>
                    </div>      
                </div>
            )}
        </div>
    );
};

export default Navbar;