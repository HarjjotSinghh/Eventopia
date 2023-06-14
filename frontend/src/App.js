import './App.css';
import { Heading } from './components/Heading';
import { SubHeading } from './components/SubHeading';
import Navbar from './components/Navbar';
import { MainPageVector } from './components/MainPageVector';
import { Pragraph } from './components/Paragraph';
import { Button } from "./components/Button"
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer';
import { animate, inView, stagger } from 'motion';
import { useEffect } from 'react';


// def app():
// function app() { ... }

function App() {
  const {user} = useAuthContext();
  // useEffect(() => {
  //   // const subHeading = document.querySelector("#sub-heading");
  //   // const getElement = (str) => {
  //   //   return document.querySelector(str);
  //   // } 
  //   // const easing = [.22, .03, .26, 1];
  //   // animate(
  //   //   [getElement("#sub-heading"), getElement("#heading"), getElement("#paragraph"), getElement("#main-button")],
  //   //   { x: [-1200, 0], opacity: [0, 1] },
  //   //   {
  //   //     duration: 1,
  //   //     delay: stagger(1),
  //   //     easing: easing
  //   //   }
  //   // );
  //   // animate(
  //   //   getElement("#main-page-vector-container"),
  //   //   { opacity: [0, 1] },
  //   //   {
  //   //     duration: 1,
  //   //     delay: 2,

  //   //     easing: [.22, .03, .26, 1]
  //   //   }
  //   // )
  // }, []);
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
        <div id='main-page-vector-container' className='justify-center items-center lg:flex hidden'>
          <MainPageVector/>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}

export default App;
