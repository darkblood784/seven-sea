import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import banner from '../assets/banner.png';
import usdtbackground from '../assets/usdtplanbackground.png';
import mystake from '../assets/my_staking_btg.png'
import usdt from '../assets/usdt.png';
import bg_whale from '../assets/bg-whale.png';
import linktree from '../assets/social/linktree.png';
import discord from '../assets/social/discord.png';

import WhaleSlider from "../components/SliderComponent";
import PrimeInput from "../components/PrimeInput";
import DurationSelector from "../components/DurationSelector";

interface WhaleImagePaths {
    "0-25": string;
    "25-75": string;
    "75-100": string;
}

const headImages: WhaleImagePaths = {
    "0-25": './whale/TTTTWHALE.png',
    "25-75": './whale/25-75.png',
    "75-100": './whale/75-100.png'
};

function Staking() {
    const { t } = useTranslation();
    const [usdtduration, setUsdtDuration] = useState("");
    const [apr, setApr] = useState("15%");
    const [inputValueusdt, setInputValueusdt] = useState('');
    const [sliderValueusdt, setSliderValueusdt] = useState<number>(0);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);


    // Function to handle duration change and update APR accordingly
    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDuration = event.target.value;
        setUsdtDuration(selectedDuration);

        // Update APR based on selected duration
        if (selectedDuration === "30 Days") {
            setApr("15%");
        } else if (selectedDuration === "6 Months") {
            setApr("24%");
        } else if (selectedDuration === "1 Year") {
            setApr("36%");
        }
    };

    const durationOptions = [
        { key: 'day', percent: '15%' },
        { key: 'month', percent: '24%' },
        { key: 'year', percent: '36%' }
    ];

    const validatePrime = (value: string, setter: (value: string) => void) => {
        const num = Number(value);
        if (num !== Math.floor(num)) {
            return;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, ''); // Allow only digits and a single decimal point
        setter(validValue);
    };

    const getWhaleHeadSrcusdt = (): string => {
        if (sliderValueusdt <= 25) return headImages["0-25"];
        if (sliderValueusdt <= 75) return headImages["25-75"];
        return headImages["75-100"];
    };

    return (
        <div className="flex flex-col w-full items-center text-white">
            <div className="flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] relative justify-center">
                <img src={banner} alt="Whale" className="absolute w-full h-[100%] my-[20px] md:h-[auto]" />
                <div className="relative z-10 flex flex-col justify-center items-start w-full h-full px-4 mb-[-40px]">
                    <h1 className="font-bold">{t('swim')}</h1>
                    <h1 className="font-bold">{t('earn')}</h1>
                    <p className="mt-4 text-[15px] md:text-[25px]">{t('Join')}</p>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <h1 className="flex md:text-[60px] text-[30px] font-bold">{t('trading')}</h1>
                <p className="md:text-[20px] text-[13px] items-end flex">{t('risk')}</p>
            </div>

           {/* USDT Section */}
           <div className="flex flex-col w-full md:flex-grow p-6 mt-10 bg-black rounded-lg shadow-lg relative border-2 border-white">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <img src={usdt} alt="USDT" className="w-10 h-10 mr-2" />
                        <p className="text-xl font-bold text-white">USDT</p>
                    </div>
                    
                    {/* Tooltip and Info Button */}
                    <div 
                        className="relative" 
                        onMouseEnter={() => setIsTooltipVisible(true)} 
                        onMouseLeave={() => setIsTooltipVisible(false)}
                    >
                        <button className="text-gray-400 text-lg">i</button>
                        {isTooltipVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white p-2 rounded-lg shadow-lg">
                                Information about staking terms, risks, and more.
                            </div>
                        )}
                    </div>
                </div>



                {/* Balance Section */}
                <div className="flex justify-between mb-4">
                    <p className="text-gray-400">balance: 42069 USDT</p>
                    <p className="text-gray-400">≈ $42,069 USD</p>
                </div>

                {/* Content Section */}
                <div className="flex justify-between">
                    {/* Left Side */}
                    <div className="flex flex-col w-1/2 pr-4">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400">Duration:</p>
                            <select
                                value={usdtduration}
                                onChange={handleDurationChange}
                                className="bg-gray-800 text-white p-2 rounded"
                            >
                                <option value="30 Days">30 Days</option>
                                <option value="6 Months">6 Months</option>
                                <option value="1 Year">1 Year</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400">APR:</p>
                            <p className="text-white text-lg">{apr}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400">Unlock On:</p>
                            <p className="text-white text-lg">Nov 7 2024 08:00</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400">You Will Get:</p>
                            <p className="text-white text-lg">100 USDT</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col w-1/2 pl-4">
                        <div className="mb-4 items-right">
                            <PrimeInput
                                value={inputValueusdt}
                                setValue={setInputValueusdt}
                                validatePrime={() => {}}
                            />
                        </div>

                        <WhaleSlider
                            sliderValue={sliderValueusdt}
                            setSliderValue={setSliderValueusdt}
                            getWhaleHeadSrc={getWhaleHeadSrcusdt}
                        />
                    </div>
                </div>

                {/* Stake Button */}
                <button className="w-full mt-6 py-3 bg-blue-900 rounded-lg text-white font-bold">
                    STAKE ▼
                </button>
            </div>


            {/* Footer Section */}
            <div className="flex flex-col my-10 w-full h-auto bg-black">
                <img src={bg_whale} className="w-full h-auto" alt="" />
                <p className="lg:pl-20 pl-10 mt-[-90px] lg:mt-[-200px] text-[18px] md:text-[40px] font-bold lg:text-[51px]">{t('crypto')}</p>
            </div>
            <div className="flex w-full bg-black mt-10 lg:mt-40 justify-between">
                <a href="https://linktr.ee/WHALESTRATEGY" className="w-[45%] lg:w-[45%]">
                    <img src={linktree} alt="" className="w-full h-auto cursor-pointer" />
                </a>
                <a href="https://discord.gg/xpkF6U9KJY" className="w-[45%] lg:w-[45%]">
                    <img src={discord} alt="" className="w-full h-auto cursor-pointer" />
                </a>
            </div>
            <div className="flex justify-between w-full mt-32">
                <h1 className="flex md:text-[60px] text-[30px] font-bold">{t('staking')}</h1>
                <p className="md:text-[20px] text-[13px] items-end flex">{t('risk')}</p>
            </div>
            <div className="flex flex-wrap justify-center w-full gap-7">
                {/* USDT Section */}
                <div className="flex flex-wrap w-full lg:w-[47%] relative mt-10">
                    <img src={mystake} className="absolute w-full h-full" alt="" />
                    <div className="p-2 m-2 md:m-10 w-full relative z-10 md:p-0 md:justify-between">
                        <div className="my-autow-full md:w-[35%] ">
                            <div className="flex items-center">
                                <img src={usdt} alt="" className="w-14 h-14 mr-4" />
                                <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
                            </div>
                        </div>
                        <div className="flex mt-10 justify-between">
                            <div className="w-1/2">
                                <p>{t('total')}</p>
                                <p className="flex"><span className="text-[25px] md:text-[40px]">1045</span><span className="text-[13px] mt-3 ml-2 md:mt-6 md:ml-4" >USDT~$1045.00</span></p>
                            </div>
                            <div className="w-1/2">
                                <p>{t('available')}</p>
                                <p className="flex"><span className="text-[25px] md:text-[40px]">53</span><span className="text-[13px] mt-3 ml-2 md:mt-6 md:ml-4" >USDT~$1045.00</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-40"></div>
        </div>
    );
}

export default Staking;
