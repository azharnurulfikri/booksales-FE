import { Outlet } from "react-router-dom";
import Navbar from "../componens/navbar";
import Footer from "../componens/footer";

export default function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}