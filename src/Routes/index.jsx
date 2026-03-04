import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";
import ForgetPassword from "../Pages/Auth/forget-password";
import Login from "../Pages/Auth/login";
import Register from "../Pages/Auth/register";
import AlbumDetails from "../Pages/BeatMixedSet/AlbumDetails";
import BeatMixedSet from "../Pages/BeatMixedSet/BeatMixedSet";
// import { ComingSoon } from "../Pages/ComingSoon";
import ContactUs from "../Pages/ContactUs";
import { Home } from "../Pages/Home";
import MusicLicenseDisclosure from "../Pages/MusicLicenseDisclosure/MusicLicenseDisclosure";
import Payment from "../Pages/Payment/Payment";
import ChangePassword from "../Pages/Profile/ChangePassword";
import EditProfile from "../Pages/Profile/EditProfile";
import Profile from "../Pages/Profile/Profile";
import SnpLive from "../Pages/SNPLive";
import SnpVideos from "../Pages/SnpVideos";
import SubscriptionLogs from "../Pages/SubscriptionLogs/SubsceriptionLogs";
import SubscriptionPlan from "../Pages/SubscriptionPlan/SubscriptionPlan";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import { useGetDataQuery } from "../Redux/Services/General";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import SubscriptionPlansListing from "../Pages/SubscriptionPlansListing";
import AlbumPage from "../Pages/AlbumPage";

export default function UserRoutes() {
  const {} = useGetDataQuery({}, { refetchOnFocus: true });

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/purchase-album" element={<AlbumPage />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ForgetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/beat-mixed-set" element={<BeatMixedSet />} />
        <Route path="/album-details/:id" element={<AlbumDetails />} />
        <Route
          path="/subscription-plans"
          element={<SubscriptionPlansListing />}
        />
        <Route path="/subscription-plan/:id" element={<SubscriptionPlan />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route
          path="/subscription-logs"
          element={
            <PrivateRoute>
              <SubscriptionLogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route path="/privacy-policy" element={<MusicLicenseDisclosure />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/snp-live" element={<SnpLive />} />
        <Route path="/snp-videos" element={<SnpVideos />} />
      </Routes>
    </BrowserRouter>
  );
}
