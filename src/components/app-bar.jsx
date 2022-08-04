import '../App.css';
import { Toolbar, AppBar,  IconButton,  Typography, InputAdornment, TextField} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import SideBarComponent from './side-drawer';

export default function AppBarComponent({setCurrentCategory, search, filterByCountry, searchQuery, setSearchQuery, selectedCountry, setSelectedCountry}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSideBar = ()=>{
    setSidebarOpen(!sidebarOpen);
  }

  const handleKeypress = (event)=>{
    if(event.key === "Enter"){
      search(event.target.value);
    }
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
            <MenuIcon onClick={()=>{setSidebarOpen(true)}}/>
        </IconButton>

        <div className="logo-text" onClick={()=>{setCurrentCategory('home')}}> Be Informed </div>

        <div style={{margin:"0px 10px", display:"flex", flexGrow:1}}>
          <TextField
            value = {searchQuery}
            style={{height: "46px",width:"30vw", alignSelf:"center", background:"#f0e6e8", position:"absolute", top:"9px", left:"50%", transform:"translate(-50%, 0)" }}
            onChange={(e)=>{setSearchQuery(e.target.value)}}
            onKeyDown={handleKeypress}
            label="Search"
            InputProps={{
              style:{
                height: "46px"
              },
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={()=>{search(searchQuery)}}>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >

          </TextField>
        </div>
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
