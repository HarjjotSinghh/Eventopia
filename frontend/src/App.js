import './App.css';
import { Heading } from './components/Heading';
import { SubHeading } from './components/SubHeading';
import Navbar from './components/Navbar';
import { MainPageVector } from './components/MainPageVector';
import { Pragraph } from './components/Paragraph';
import { Button } from "./components/Button"

function App() {
  return (
    <>
      <Navbar/>
      <div className='main flex justify-center gap-[100px] items-center w-[100%] select-none pl-10 pr-10 pb-[100px] xl:pt-[10%] pt-[15%] xl:flex-row flex-col'>
        <div className='flex justify-center xl:items-start items-center flex-col xl:max-w-[30%]'>
          <SubHeading SubHeadingText="Welcome to"/>
          <Heading HeadingText="Eventopia!"/>
          <Pragraph ParagraphText="Sample text about the website. Should be about 3 lines. Gives a brief of the website. Text goes here too."/>
          <Button ButtonText= "Get Started"/>
        </div>
        <div className='flex justify-center items-center'>
          <MainPageVector/>
        </div>
      {/* <BrowserRouter>
        <Routes>
          <Route 
            path='/home'
            element = {<NavbarHeading NavbarHeadingText="Home"/>}
          />
          <Route 
            path='/events'
            element = {<NavbarHeading NavbarHeadingText="Events"/>}
          />
          <Route 
            path='/apply'
            element = {<NavbarHeading NavbarHeadingText="Add An Event"/>}
          />
          <Route 
            path='/contact'
            element = {<NavbarHeading NavbarHeadingText="Contact Us"/>}
          />
        </Routes>
      </BrowserRouter> */}

      </div>
    </>
    
  );
}

export default App;
