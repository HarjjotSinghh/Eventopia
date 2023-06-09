import './App.css';
import { Heading } from './components/Heading';
import { SubHeading } from './components/SubHeading';
import Navbar from './components/Navbar';
import { MainPageVector } from './components/MainPageVector';
import { Pragraph } from './components/Paragraph';
import { Button } from "./components/Button"


// def app():
// function app() { ... }

function App() {
  return (
    <>
      <Navbar/>
      <div className='main flex justify-center gap-[100px] items-center w-[100%] select-none pl-10 pr-10 pb-[100px] xl:pt-[10%] pt-[20vh] xl:flex-row flex-col overflow-x-hidden'>
        <div className='flex justify-center xl:items-start items-center flex-col xl:max-w-[30%]'>
          <SubHeading SubHeadingText="Welcome to"/>
          <Heading HeadingText="Eventopia!"/>
          <Pragraph ParagraphText="Sample text about the website. Should be about 3 lines. Gives a brief of the website. Text goes here too."/>
          <Button ButtonText= "Get Started"/>
        </div>
        <div className='flex justify-center items-center'>
          <MainPageVector/>
        </div>
      </div>
    </>
    
  );
}

export default App;
