// AppContext.js
import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../Login/slice/LoginSlice';
import { selectErrorAlerts, selectInfoAlerts, selectSuccessAlerts } from '../Utility/Slice/alertsSlice';

// Create a context
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext);
};

// Create a provider for the context
export const AppProvider = ({ children }) => {
    // Define the initial state
    const [organizationName, setOrganizationName] = useState(null);
    const [patientName, setPatientName] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);
    const [patientInfo, setPatientInfo] = useState(null);
    const [patientImages, setPatientImages] = useState(null);
    const [solution, setSolution] = useState(null);
    const [socialMediaLinks, setSocialMediaLinks] = useState(null);
    const [fundingTargetAmount, setFundingTargetAmount] = useState(null);
    const [artistName, setArtistName] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);
    const [artistDescription, setArtistDescription] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [amountRaised, setamountRaised] = useState(null);

    const [artistVision, setArtistVision] = useState(null);
    const [projectOverview, setProjectOverview] = useState(null);
    const [startupName, setStartUpName] = useState(null);
    const [description, setDescription] = useState(null);
    const [website, setWebsite] = useState(null);
    const [instagram, setInstagram] = useState(null);
    const [linkedIn, setLinkedIn] = useState(null);
    const [category, setCategory] = useState(null);
    const [vision, setVision] = useState(null);
    const [problemStatement, setProblemStatement] = useState(null);

    const [ngoCampaignDetails, setNgoCampaignDetails] = useState('');
    const [startupCampaignDetails, setStartupCampaignDetails] = useState('');
    const [artistCampaignDetails, setArtistCampaignDetails] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [amount, setAmount] = useState(null);

    const [accountNumber, setAccountNumber] = useState(null);
    const [bankName, setBankName] = useState(null);
    const [ifscCode, setIfscCode] = useState(null);

    const [donationHistory, setDonationHistory] = useState(null);
    const [name,setName]=useState(null);
    const [email,setEmail]=useState(null);
    const [subject,setSubject]=useState(null);
    const [message,setMessage]=useState(null);

    const [isEmailValid, setIsEmailValid]=useState(null);
    const [isNumberValid, setIsNumberValid]=useState(null);
    const [isPasswordMatched, setIsPasswordMatched]=useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function to update the name
    const updateName = (newName) => {
        setOrganizationName(newName);
    };

    const handleSelectedCardClick = (carddetails) => {
        // Set the selected Ngo and open the popover
        setSelectedCard(carddetails);
      };

    const isAuthenticatedUser = useSelector(isAuthenticated);
    const role = localStorage.getItem('role');
    const success = useSelector(selectSuccessAlerts);
    const error = useSelector(selectErrorAlerts);
    const info = useSelector(selectInfoAlerts);

    // Combine state and functions into a value object

    const value = {
        organizationName,
        setOrganizationName,
        patientName,
        setPatientName,
        hospitalName,
        setHospitalName,
        patientInfo,
        setPatientInfo,
        patientImages,
        setPatientImages,
        solution,
        setSolution,
        socialMediaLinks,
        setSocialMediaLinks,
        fundingTargetAmount,
        setFundingTargetAmount,
        artistName, 
        setArtistName, 
        projectTitle, 
        setProjectTitle, 
        artistDescription, 
        setArtistDescription, 
        phoneNumber, 
        setPhoneNumber, 
        socialMediaLinks, 
        setSocialMediaLinks, 
        artistVision, 
        setArtistVision, 
        projectOverview, 
        setProjectOverview,
        startupName, 
        setStartUpName, 
        description, 
        setDescription,
        website, 
        setWebsite, 
        instagram, 
        setInstagram, 
        linkedIn, 
        setLinkedIn, 
        category, 
        setCategory, 
        vision, 
        setVision, 
        problemStatement, 
        setProblemStatement,
        isAuthenticatedUser,
        role,
        ngoCampaignDetails,
        setNgoCampaignDetails,
        artistCampaignDetails,
        setArtistCampaignDetails,
        startupCampaignDetails,
        setStartupCampaignDetails,
        anchorEl,
        setAnchorEl,
        handleClick,
        handleClose,
        selectedCard,
        setSelectedCard,
        handleSelectedCardClick,
        amount,
        setAmount,
        success,
        error,
        info,
        accountNumber,
        setAccountNumber,
        bankName,
        setBankName,
        ifscCode,
        setIfscCode,
        donationHistory,
        setDonationHistory,
        updateName,
        name ,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        subject,
        setSubject,
        isEmailValid,
        setIsEmailValid,
        isNumberValid,
        setIsNumberValid,
        isPasswordMatched,
        setIsPasswordMatched
    };

    // Return the provider with the value
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
