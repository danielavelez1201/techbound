import React from "react";
import Sidebar from "react-sidebar";
import { useState } from "react";

function Menu() {

    const [openVar, setOpen] = useState(false);

    return (
    <div>
      <div>
      <Sidebar
        sidebar={<b> wheee </b>}
        open={openVar}
        styles={{ sidebar: { background: "white" } }}
      >
      <br>
      </br>   
      <br>
      </br>
      <br>
      </br>
      <button
      onClick={() => 
        {if (openVar) {
          console.log("open!");
          setOpen(false)
        }
        else {
          console.log("closed!");
          setOpen(true)
          }}}>
            Open menu
      </button>
      </Sidebar>
      </div>

      </div>
    );
}

export default Menu;


