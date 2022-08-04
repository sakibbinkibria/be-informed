import '../App.css';
import { Toolbar, AppBar, IconButton, Typography, InputAdornment, TextField, stepClasses } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import SideBarComponent from './side-drawer';
import config from '../config';

export default function AppBarComponent({ setCurrentCategory, search, filterByCountry, searchQuery, setSearchQuery, selectedCountry, setSelectedCountry }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      setSearching(false);
      search(event.target.value);
    }
  }

  function searchBox() {
    return (
      <div style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}>
        <TextField
          value={searchQuery}
          style={{ maxHeight: "46px", width: config.isMobileDevice ? "50vw" :"30vw", alignSelf: "center", background: "#f0e6e8", position: "absolute", top: "7px", left: "50%", transform: "translate(-50%, 0)" }}
          onChange={(e) => { setSearchQuery(e.target.value) }}
          onKeyDown={handleKeypress}
          label="Search"
          InputLabelProps={{
            style:{
              alignSelf:"center"
            }
          }}
          InputProps={{
            style: {
              maxHeight: "46px"
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  setSearching(false);
                  search(searchQuery);
                }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        >

        </TextField>
      </div>
    )
  }

  return (
    <AppBar position="static">
      <Toolbar className='app-bar'>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon onClick={() => { setSidebarOpen(true) }} />
        </IconButton>

        {
          !config.isMobileDevice ?
            <div className="logo-text" onClick={() => { setCurrentCategory('home') }}> Be Informed </div>
            : !searching ?
              <div className="logo-text" style={{ position: "absolute", top: "9px", left: "50%", transform: "translate(-50%, 0)" }} onClick={() => { setCurrentCategory('home') }}> Be Informed </div>
              : ''
        }

        {
          !config.isMobileDevice || (config.isMobileDevice && searching) ?
            searchBox()
            : ''
        }
        {
          config.isMobileDevice &&
          <IconButton
            size="small"
            edge="end"
            color="inherit"
            style={{position:"absolute", top:"9px", right:"10px"}}
          >
            {
              searching ?
                <CancelIcon onClick={() => { setSearching(!searching) }}/>
              :
                <SearchIcon onClick={() => { setSearching(!searching) }} />
            }
          </IconButton>
        }
      </Toolbar>

      <SideBarComponent
        sidebarOpen={sidebarOpen}
        toggleSideBar={toggleSideBar}
        setCurrentCategory={setCurrentCategory}
        filterByCountry={filterByCountry}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

    </AppBar>
  );
}
