import React,{useState} from 'react'
import RangeSlider from 'react-bootstrap-range-slider';

const SideBarComponet=()=>{
    const [value,setValue] = useState(0)
    return(
        <div className="sidebar-componet">
            <RangeSlider
                variant ="primary"
                value={value}
                onChange={e=>setValue(e.target.value)}
                max={}
                min={0}
            />
        </div>
    )
}
export default SideBarComponet