import { createTheme }  from '@mui/material/styles'

const theme = createTheme({
    palette: {
      primary: {
        main: "#a85d69",
      },
    },
    typography:{
      button:{
        textTransform:'none',
        fontWeight:"bold",
        fontFamily:'Amazon Ember',
        fontSize:'1.1rem'
      }
    }
  });
export default theme;