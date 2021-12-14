import React,{useState} from "react";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SideBarComponet=()=>{
    const [value1,SetValue1] = useState(0)
    return(
        <div className="sidebar-componet" style={{float:"left",width:"10vw",height:"100vw"}}>
            <Range
                max={100}
                min={10}
            />
            <Slider
                max={100}
                min={10}
                
            />
        </div>
    )
}
export default SideBarComponet