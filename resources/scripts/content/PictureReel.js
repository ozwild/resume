import Eventful from "./EventfulClass"
import {random} from "./Helpers"

export default class PictureReel extends Eventful{

  constructor(){

    super();

    this.data = [];

    this.interval = null;

    this.sourcePrefix = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1357379/";

    this.pictures = [
      {ref:"imageedit_35_9563221260.png",data:null},
      {ref:"imageedit_11_5857668258.png",data:null},
      {ref:"imageedit_16_6199340723.jpg",data:null},
      {ref:"imageedit_20_6741302900.png",data:null},
      {ref:"imageedit_24_3602036658.png",data:null},
      {ref:"imageedit_6_4653672888.png",data:null},
    ];


    this.currentSourceIndex = 0;

    this.currentPicture = null;

  }

  start(){
    let self = this;

    if(this.interval == null){

      animLoop(function( deltaT, now ) {

        if(self.interval == null || (now - self.interval) >= 8000){
          self.interval = now;
          self.reel();
        }

        if(self.interval == null){
          return false;
        }

      });

    }

  }

  stop(){

    this.interval = null;
  }

  getNextPicture(){

    let picture = this.pictures[this.currentSourceIndex];

    if(picture.data == null){
      picture.data = this.createPicture(picture.ref);
    }

    this.currentSourceIndex++;
    if(this.currentSourceIndex >= this.pictures.length){
      this.currentSourceIndex = 0;
    }

    return picture;
  }

  createPicture(ref){

    let self = this;

    const node = $("<div>",{class:"self-picture"});
    const source = this.sourcePrefix + ref;

    function reset(){
      node.velocity({
        left:"200vw",
        rotateZ:(5*360)-27,
        rotateX:20,
        opacity:0
      },0);
    }

    reset();
    node.appendTo("#picture-reel")

    return {
      node:node,
      source: source,
      load:(callback)=>{

        let loadTrack = new Image();
        loadTrack.onload = function(){

          node.css('background-image', "url(".concat(this.src,")"));

          if(typeof callback == "function"){
            callback.apply();
          }

        };
        loadTrack.onError = (e)=>{
          console.log('error loading',e);
        };

        loadTrack.src = source;

        return loadTrack;

      },
      enter: ()=>{
        node.velocity({
          left:"13em",
          rotateZ:-27,
          rotateX:20,
          opacity:1
        },1200);
      },
      exit: ()=>{
        node.velocity({
          left:"-200vw",
          rotateZ:(-5*360)-27,
          rotateX:20,
          opacity:0
        },1200, ()=>{
          reset();
        });
      }
    };

  }

  reel(){

    const self = this;

    const picture = this.getNextPicture();
    const data = picture.data;

    data.load(()=>{
      if(this.currentPicture != null){
        self.currentPicture.data.exit();  
      }
      data.enter();
      self.currentPicture = picture;
    });


  }


}