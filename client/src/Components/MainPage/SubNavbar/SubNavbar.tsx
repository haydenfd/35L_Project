import React, { useState } from "react";
import './index.css';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Price from './Price';
import Amenities from './Amenities'
import Facilities from "./Facilities";
import Bathrooms from './Bathrooms';
import bedrooms from './Bedrooms';
import Bedrooms from "./Bedrooms";
 
function SubNavbar(props:any) {
 
   const upward_caret = <AiOutlineDown size={12} style={{verticalAlign:'bottom', marginLeft:'3px', fontWeight:"bold"}}/>
   const downward_caret = <AiOutlineUp size={12} style={{ marginLeft:'3px', fontWeight:"bold"}}/>
 
   const initialState:any = {
       "price": false,
       "bedrooms": false,
       "bathrooms": false,
       "amenities": false,
       "facilities": false
   };
 
   const [buttons, setButtons] = useState(initialState);
 
   function adjustStyles(button:string) {
       if (buttons[button]) {
           setButtons({...initialState})
       }
       else {
           setButtons({
               ...initialState,
               [button]: true,
           })   
       }
   }
 
   function isButtonClicked(button:string):boolean {
       if (buttons[button]) {
           return true;
       }
       return false;
   }

   function reload() {
       window.location.reload()
   }
 
   return (
       <div>
           <br></br>
           <div className="flex">

               <span className="separator"></span>
                <div>
                <div className="buttonWrapper">
                <button className={isButtonClicked("price") ? 'baseButton clicked': 'baseButton'} onClick={() => adjustStyles("price")}>Price <span>{isButtonClicked("price") ? downward_caret : upward_caret}</span> </button>
                   <div className={isButtonClicked("price") ? 'base_dropdown price_dropdown' : 'notClickedDisplay'}>
                       <Price {...props} adjustStyles={adjustStyles} />
                    </div>
                </div>
                </div>

                <span className="separator"></span>
                <div>
                <div className="buttonWrapper">
                <button className={isButtonClicked("bedrooms") ? 'baseButton clicked': 'baseButton'} onClick={() => adjustStyles("bedrooms")}>Bedrooms <span>{isButtonClicked("bedrooms") ? downward_caret : upward_caret}</span> </button>
                   <div className={isButtonClicked("bedrooms") ? 'base_dropdown counter_dropdown' : 'notClickedDisplay'}>
                       <Bedrooms {...props} adjustStyles={adjustStyles} />
                   </div>
                </div>
                </div>

                <span className="separator"></span>

                <div>
                <div className="buttonWrapper">
                <button className={isButtonClicked("bathrooms") ? 'baseButton clicked': 'baseButton'} onClick={() => adjustStyles("bathrooms")}>Bathrooms <span>{isButtonClicked("bathrooms") ? downward_caret : upward_caret}</span> </button>
                <div className={isButtonClicked("bathrooms") ? 'base_dropdown counter_dropdown' : 'notClickedDisplay'}>
                    <Bathrooms {...props} adjustStyles={adjustStyles}/>
                </div>
                </div>
                </div>

                <span className="separator"></span>
                
                <div>
                <button className={isButtonClicked("amenities") ? 'baseButton clicked': 'baseButton'} onClick={() => adjustStyles("amenities")}>Amenities <span>{isButtonClicked("amenities") ? downward_caret : upward_caret}</span> </button>
                <div className={isButtonClicked("amenities") ? 'base_dropdown checklist_dropdown' : 'notClickedDisplay'}>
                    <Amenities {...props} adjustStyles={adjustStyles}/>
                </div>
                </div>

                <span className="separator"></span>

                <div>
                <button className={isButtonClicked("facilities") ? 'baseButton clicked': 'baseButton'} onClick={() => adjustStyles("facilities")}>Facilities <span>{isButtonClicked("facilities") ? downward_caret : upward_caret}</span> </button>
                <div className={isButtonClicked("facilities") ? 'base_dropdown facilities_dropdown' : 'notClickedDisplay'}>
                    <Facilities {...props} adjustStyles={adjustStyles}/>
                </div>

                <span className="separator"></span>
                </div>

                <span className="separator"></span>

                <div>
                <button className='baseButton' onClick={reload}>Reset Filters </button>

                <span className="separator"></span>
                </div>


           </div>
       </div>
   )
}
 
export default SubNavbar;

