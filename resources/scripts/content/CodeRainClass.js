import Eventful from "./EventfulClass"

export default class Starry extends Eventful{
  constructor(density){
    super();
    
    this.interval = null;
    this.spawnInterval = 4000;
    this.data = [];
    this.density = density == undefined? 25:density;
  }
  seed(n){
    let self = this;
    Array.from({length: n}).map(a=>self.spawn());
  }
  start(){
    let self = this;
    
    animLoop(function( deltaT, now ) {

        if(self.interval == null || (now - self.interval) >= self.spawnInterval){
          self.interval = now;
          self.spawn();
        }

        if(self.interval == null){
          return false;
        }

      });
    
  }
  stop(){
    this.interval = null;
  }
  createStream(){

    let self = this;
    let steps = self.random().between(5,30);
    let node = $("<p>", { class: "stream" });
    let string = self.random().string();
    let x = self.random().column(), y = self.random().row();

    node.css({
      top: y,
      left: x,
      opacity:0,
      animation:"steps(" + steps + ",end) falling " + steps * 2 + "s 1 forwards"
    });

    node.velocity({
      rotateX:0,
      rotateY:-30,
      rotateZ:180,
      translate:"0,0",
      scale:self.random().between(40,70)/100,
    },0);

    node.velocity({
      opacity:1,
    },1500, ()=>{

      node.velocity({
        rotateX:0,
        rotateY:-30,
        rotateZ:180,
        translate:"0,-40vh",
        scale:self.random().between(85,100)/100
      },{
        fill: "forwards",
        easing: "steps(" + steps + ",end)",
        duration: steps * 2 * 1000,
        iterations: 1
      }, ()=>{

        self.removeNode(node);

      });

    });


    node.text(string);

    return {
      steps: steps,
      string: string,
      x: x,
      y: y,
      node: node,
      exit: ()=>self.removeNode(node)
    };
  }
  removeNode(node){
    return node.velocity({
      opacity:0
    }, 3000, function(){
      node.remove();
    });
  }
  random(){
    let self = this;

    return {

      between: (min, max)=>Math.floor(Math.random() * (max - min)) + min,

      row: ()=> (self.random().between(1,10)*5)+'vh',

      column: ()=>(self.random().between(3,47)*2)+'vw',

      string: ()=> Array.from({length: self.random().between(6,20)})
      .map(a=>String.fromCharCode(self.random().between(36,125)))
      .join("")

    };
  }
  spawn(n){

    if($("#rain-container").children().length > this.density){

      this.data.shift().exit();

    }

    let stream = this.createStream();

    stream.node.appendTo("#rain-container");

    this.data.push(stream);

    return stream;


  }

}

