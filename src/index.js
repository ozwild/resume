require("./js/Velocity")
require("./js/Loop")

import Nav from "./js/NavClass";
import Notes from "./js/ContentNotesClass";
import CodeRain from "./js/CodeRainClass";
import PictureReel from "./js/PictureReel";
import Carousel from "./js/Carousel";
import TextFlipper from "./js/TextFlipper";

const nav = new Nav();
const notes = new Notes(".note", ".caller");
const rain = new CodeRain();
const reel = new PictureReel();
const carousel = new Carousel('.carousel','500px');
const headerFlip = new TextFlipper('.header-flip',[
  'Software Development',
  'Business Analysis',
  'Automation',
  'Improvement',
  'Creative Thinking'
]);

window.tempcarousel = carousel;
window.tempreel = reel;

$("body").removeClass('no-js');

$(document).ready(()=>{
  
  nav.on("action", target => {
    notes.showNote(target);
  });

  notes.on("show-note",activeId=>{
    nav.activateLink(activeId);
    reel.stop();
  });

  $(".header.second-plane").click(e=>{
    notes.hideNotes();
  });
  
  notes.on("hide-note",activeId=>{
    nav.clear();
    reel.start();
  });

  $(".backgrounds, #rain-container").click(()=>notes.hideNotes());
  
  rain.start();
  rain.seed(9);
  reel.start();
  headerFlip.start();
  
});

