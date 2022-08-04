import { useState } from "react";
import { Drawer, Autocomplete, List, ListItemButton, ListItemIcon, ListItemText, Collapse, TextField } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import config from '../config';

import '../App.css';

export default function SideBarComponent({ sidebarOpen, toggleSideBar, setCurrentCategory, filterByCountry, selectedCountry, setSelectedCountry }) {
    const [catgoryOpen, setCategoryOpen] = useState(false);
    const [countryOpen, setCountryOpen] = useState(false);

    const filterWithCountry = (e)=>{
        if(selectedCountry){
            filterByCountry(config.countryCodes[config.countries.indexOf(selectedCountry)]);
        }
        handleClose();
    }

    const handleKeypress = (event)=>{
        if(event.key === "Enter"){
          filterWithCountry(config.countryCodes[config.countries.indexOf(event.target.value)]);
        }
      }

    const handleCHange = (e, newValue)=>{
        setSelectedCountry(newValue)
    }

    const handleClose = () =>{
        toggleSideBar();
        setCountryOpen(false);
    }
    return (
        <Drawer
            anchor={"left"}
            open={sidebarOpen}
            onClose={handleClose}
        >
            <div className="sidebar-container">
                <List
                    sx={{ width: '100%' }}
                    subheader={
                        <div className="logo-text" style={{ background: "#e6d5d5", padding: "5px", margin: "0px auto", width: "100%", boxSizing: "border-box", textAlign: "center" }}> Be Informed </div>
                    }
                >
                    
                    <ListItemButton onClick={() => { setCategoryOpen(!catgoryOpen) }}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                        {catgoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={catgoryOpen} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {
                                config.categories.map((category) => {
                                    return (
                                        <ListItemButton
                                            sx={{ pl: 8 }}
                                            onClick={() => { setCurrentCategory(category.toLowerCase()) }}
                                        >
                                            <ListItemText primary={category} />
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => { setCountryOpen(!countryOpen) }}>
                        <ListItemIcon>
                            <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Countries" />
                        {countryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={countryOpen} timeout="auto" unmountOnExit>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <Autocomplete
                            disablePortal
                            options={config.countries}
                            sx={{ width: "60%", pl:4, margin:"5px 10px" }}
                            value={selectedCountry}
                            onChange={handleCHange}
                            onKeyDown={handleKeypress}
                            renderInput={(params) => <TextField {...params} variant="standard" label="" />}
                        />
                        <ListItemIcon onClick={filterWithCountry}>
                            <SearchIcon />
                        </ListItemIcon>
                        </div>
                    </Collapse>
                </List>
            </div>

        </Drawer>
    )
}