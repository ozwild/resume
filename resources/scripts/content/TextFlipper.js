export default class TextFlipper{
  constructor(selector, items){
    
    this.container = $(selector);
        
    this.flipTime = 300;
    
    this.flipInterval = 3500;
    
    if(items == undefined){
       items = [this.container.text()];
    }else{
      if(!(items instanceof Array)){
        items = [items];
      }
    }
    
    this.items = items;
        
    this.currentIndex = 0;
    
    this.interval = null;
    
  }
  
  start(){
    let self = this;
    this.interval = setInterval(function(){
      self.flip();
    },self.flipInterval);
  }
  
  stop(){
    clearInterval(this.interval);
    this.interval = null;
  }
  
  getNextString(){

    this.currentIndex++;
    
    if(this.currentIndex >= this.items.length){
      this.currentIndex = 0;
    }

    return this.items[this.currentIndex];
    
  }
  
  flip(){
    
    let self = this;
    let nextString = this.getNextString();
        
    this.container.velocity({
      rotateX:90
    },self.flipTime/2, ()=>{
      
      self.container.text(nextString);
      self.container.velocity({
        rotateX:0
      },self.flipTime/2);
      
    });
    
  }
}