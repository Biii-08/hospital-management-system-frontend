import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Booking from "../pages/Booking/Booking";
import Contact from "../pages/ContactUs/ContactUs";
import Team from "../pages/Team/Team";
import AboutUs from "../pages/AboutUs/AboutUs";
import RequireAuth from "..//navigation/RequireAuth";
import BaseUser from "../navigation/BaseUser";
import AuthNav from "../navigation/AuthNav";
import RootLayout from "../navigation/RootLayout";
import LoginPage from "../features/auth/LoginPage";
import RegisterPagePatient from "../features/auth/PatientRegistration/RegisterPagePatient";
import RegisterPageDoctor from "../features/auth/DoctorRegistration/RegisterPageDoctor";
import PatientUser from "../navigation/PatientUser";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfileCompletion from "../pages/Profiles/ProfileCompletion";
import DoctorDetails from "../pages/DoctorDetails/DoctorDetails";
import DoctorAvailibilityContainer from "../pages/Profiles/DoctorAvailabilityContainer";
import ProfileUpdation from "../pages/Profiles/ProfileUpdation";
import Success from "../features/payments/Success";
import Cancel from "../features/payments/Cancel";
import PaymentAccess from "../features/payments/PaymentAccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import PatientAppointments from "../pages/Dashboard/PatientAppointments";
import DoctorAppointments from "../pages/Profiles/DoctorAppointments";
import DoctorUser from "../navigation/DoctorUser";

const stripe_key =
  "pk_test_51Mwd0LE8c6uPwh6RhXAUdyjtOg1ZXX1A7nTRkGWOkpQKuwnV5oxHyjoDpbtTBtlroGDovwX9gtPybkx93r4d2Nfy00rwFHv6NI";
const stripePromise = loadStripe(stripe_key);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <AuthNav />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register_patient",
            element: <RegisterPagePatient />,
          },
          {
            path: "/register_doctor",
            element: <RegisterPageDoctor />,
          },
        ],
      },
      {
        element: <BaseUser />,
        children: [
          {
            index: "true",
            element: <Home />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "about",
            element: <AboutUs />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <RequireAuth />,
        children: [
          {
            element: <PatientUser />,
            children: [
              {
                index: "true",
                element: <Dashboard />,
              },
              {
                path: "booking",
                element: <Booking />,
              },
              {
                path: "doctors",
                element: <Team />,
              },
              {
                path: "doctors/:id",
                element: <DoctorDetails />,
              },
              {
                path: "doctor_appointments",
                element: <DoctorAppointments />,
              },
              {
                path: "complete_profile",
                element: <ProfileCompletion />,
              },
              {
                path: "update",
                element: <ProfileUpdation />,
              },
              {
                path: "appointments",
                element: (
                  <Elements stripe={stripePromise}>
                    <PaymentAccess />
                  </Elements>
                ),
                children: [
                  {
                    path: "",
                    element: <PatientAppointments />,
                  },
                  {
                    path: "success",
                    element: <Success />,
                  },
                  {
                    path: "failed",
                    element: <Cancel />,
                  },
                ],
              },
              {
                path: "setup_availability",
                element: <DoctorAvailibilityContainer />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <>Not Found</>,
  },
]);

export default Router;
