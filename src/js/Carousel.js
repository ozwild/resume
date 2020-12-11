import Eventful from "./EventfulClass"

export default class Carousel extends Eventful{

  constructor(selector, height){

    super();   

    this.wrapper = $(selector);
    this.items = this.wrapper.children();
    this.container = null;

    this.controls = {};

    this._setup();
    this.reset();

  }
  _setup(){

    let self = this;
    
    this.wrapper.addClass('carousel-wrapper');    
    this.items.addClass('item');

    this.container = $("<div>",{class:"carousel-container"}).appendTo(this.wrapper);
    this.items.appendTo(this.container);
    
    this.controls.previous = $("<div>",{class:"control previous"});
    this.controls.previous.appendTo(this.wrapper);
    this.controls.next = $("<div>",{class:"control next"});
    this.controls.next.appendTo(this.wrapper);

    this.controls.previous.on('click',()=>{
      self.previous();
    });

    this.controls.next.on('click',()=>{
      self.next();
    });

  }
  activate(item){
    this.activeItem = item;
    this.items.removeClass('active');
    item.addClass('active');
  }
  reset(){
    this.activate(this.items.first());
  }
  next(){
    console.log(this.activeItem.next());
    if(this.activeItem.next().length > 0){
      this.activate(this.activeItem.next());
    }
  }
  previous(){
    if(this.activeItem.prev().length > 0){
      this.activate(this.activeItem.prev());
    }
  }

}