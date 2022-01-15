import React from "react";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
import ShowProducts from "../ProductComponets/ShowProducts";
import SideBarComponet from "../SideBarComponet/SideBarComponet";

const LandingPage = () => {
  return (
    <div>
        <NavBarComponet />

        {/* <SideBarComponet/> */}
        <ShowProducts />
    </div>
  );
};
export default LandingPage;
