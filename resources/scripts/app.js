require("./content/Velocity")
require("./content/Loop")

import Nav from "./content/NavClass";
import Notes from "./content/ContentNotesClass";
import CodeRain from "./content/CodeRainClass";
import PictureReel from "./content/PictureReel";
import Carousel from "./content/Carousel";
import TextFlipper from "./content/TextFlipper";

const nav = new Nav();
const notes = new Notes(".note", ".caller");
const rain = new CodeRain();
const reel = new PictureReel();
const carousel = new Carousel('.carousel','500px');
const headerFlip = new TextFlipper('.header-flip',[
  'Software Development',
  'Business Analysis',
  'Workforce Management',
  'Task Automation',
  'Continuous Improvement',
  'Creativity Unleashed',
  'Super Cool',
  'Legen... dary'
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

