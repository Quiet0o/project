import React, { useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
// import { priceMax, priceMin } from "../ProductComponets/ShowProducts";

const SideBarComponet = () => {
  const [value1, SetValue1] = useState(0);
  // console.log(priceMax,priceMin);
  return (
    <div
      className="sidebar-componet"
      style={{ float: "left", width: "13vw", height: "100vw", padding: "20px" }}
    >
      <Range min={0} max={100} tipFormatter={(value) => `${value}%`} />
      <form action="*">
        <label>Wybież marke:</label>
        <br />
        <input className="check" type={"checkbox"} /> Harnaś
        <br />
        <input className="check" type={"checkbox"} /> Perła
        <br />
        <input className="check" type={"checkbox"} /> Tyskie
        <br />
        <input className="check" type={"checkbox"} /> Żubr
        <br />
        <input className="check" type={"checkbox"} /> Warka
        <br />
        <input className="check" type={"checkbox"} /> Lech
        <br />
        <input className="check" type={"checkbox"} /> Książęce
        <br />
        <input className="check" type={"checkbox"} /> Dębowe
        <br />
        <input className="check" type={"checkbox"} /> Redd's
        <br />
        <input className="check" type={"checkbox"} /> Hardmade
        <br />
        <input className="check" type={"checkbox"} /> Captain Jack
        <br />
        <input className="check" type={"checkbox"} /> Kozel
        <br />
        <input className="check" type={"checkbox"} /> Pilsner Urquell
        <br />
        <input className="check" type={"checkbox"} /> Tatra
        <br />
        <input className="check" type={"checkbox"} /> Łomża
        <br />
      </form>
    </div>
  );
};
export default SideBarComponet;
