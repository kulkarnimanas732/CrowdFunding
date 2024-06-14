import logo from './logo.svg';
import './App.css';
import FirstStep from './SignUp/Forms/FirstStep';
import SecondStep from './SignUp/Forms/SecondStep/SecondStep';
import SignUp from './SignUp/signup';
import StepperJsx from './SignUp/Stepper';
import LoginJSX from './Login/LoginJSX';
import HeaderJSX from './Header/HeaderJSX';
import FooterJSX from './Footer/FooterJSX';
import DashboardJSX from './Dashboard/DashboardJSX';
import InvestorDashboardJSX from './Dashboard/InvestorDashboardJSX';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeJSX from './Dashboard/HomeJSX';
import AboutJSX from './AboutUs/AboutJSX';
import ContactUsJSX from './ContactUs/ContactUsJSX';
import { Counter } from './ReducerSetUp/Counter';
import EditNgoCampaignDetailsJSX from './Dashboard/CampaignDetails/EditDetails/EditNgoCampaignDetailsJSX';
import EditArtistCampaignDetails from './Dashboard/CampaignDetails/EditDetails/EditArtistCampaignDetailsJSX';
import LoaderJSX from './Loader/LoaderJSX';
import { useAppContext } from './ReducerSetUp/AppContext';
import AlertComponent from './Utility/AlertComponent';
import NgoDonationHistory from './Dashboard/CampaignDetails/ViewDontaionHistory/NgoDonationHistory';
import ArtistCampaignDetailsJSX from './Dashboard/CampaignDetails/ArtistCampaignDetailsJSX';
import ArtistDonationHistory from './Dashboard/CampaignDetails/ViewDontaionHistory/ArtistDonationHistory';
import InvestorDonationHistory from './Dashboard/CampaignDetails/ViewDontaionHistory/InvestorDonationHistory';

function App() {
  const { role, success, error, info } = useAppContext();

  console.log("Success",success, "Error",error, "Info",info);

  return (
    <div className="App">
      <HeaderJSX/>
      {/* <AlertComponent/> */}
      {/* <SignUp /> */}
      {/* <StepperJsx /> */}
      {/* <LoginJSX/> */}
      {/* <DashboardJSX/> */}
      {/* <DashboardJSX/> */}
      {/* <InvestorDashboardJSX/> */}
      {(success || error || info) && <AlertComponent/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeJSX/>}/>
          <Route path="/aboutus" element={<AboutJSX/>}/>
          <Route path="/contactus" element={<ContactUsJSX/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LoginJSX/>}/>
          <Route path="/dashboard" element={ role==='investor' ? <InvestorDashboardJSX/> : <DashboardJSX/>}/>
          <Route path="/counter" element={<Counter/>}/>
          <Route path="/dashboard/editngodetails" element={<EditNgoCampaignDetailsJSX/>}/>
          <Route path="/dashboard/editartistdetails" element={<EditArtistCampaignDetails/>}/> 
          <Route path="/circularprogress" element={<LoaderJSX/>}/>
          <Route path="/dashboard/donationhistory/:id" element={<NgoDonationHistory/>}/>
          <Route path="/dashboard/donation-history/:id" element={<ArtistDonationHistory/>}/>
          <Route path="/dashboard/donor-history/:id" element={<InvestorDonationHistory/>}/>
        </Routes>
      </BrowserRouter>
      <FooterJSX/>
    </div>
  );
}
export default App;
