import './App.css';
import { Heading } from './components/Heading';
import { SubHeading } from './components/SubHeading';
import Navbar from './components/Navbar';
import { MainPageVector } from './components/MainPageVector';
import { Pragraph } from './components/Paragraph';
import { Button } from "./components/Button"
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer';


// def app():
// function app() { ... }

function App() {
  const {user} = useAuthContext();
  return (
    <>
      <Navbar/>
      <div className='main flex justify-center gap-[100px] items-center w-[100%] select-none pl-10 pr-10 pb-[400px] 2xl:pt-[10%] pt-[20vh] 2xl:flex-row flex-col overflow-x-hidden'>
        <div className='flex justify-center 2xl:items-start items-center flex-col 2xl:max-w-[30%]'>
          <SubHeading SubHeadingText="Welcome to"/>
          <Heading HeadingText="Eventopia!"/>
          <Pragraph ParagraphText="The ultimate hub for university and college events, offering a comprehensive listing of events happening around you."/>
          <Button ButtonText= {!user ? "Get Started" : "Browse Events"}/>
        </div>
        <div className='flex justify-center items-center'>
          <MainPageVector/>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}

export default App;
