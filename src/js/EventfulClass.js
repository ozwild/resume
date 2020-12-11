/**
  * Class Eventful
  * Event handling functionality to be inherited by other classes
  * @method on registers a handler to an event
  * @method trigger runs all registered handlers to an event
  */
export default class Eventful{

  constructor(){
    this.handlers = {};
  }

  /**
    * @parameter eventName Name of the event to register to
    * @parameter f Callable handler to register
    */
  on(eventName, f){
    if(!(eventName in this.handlers)){
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(f)
  }

  /**
    * @parameter eventName Name of the event to trigger
    */
  trigger(eventName){
    let args = [].slice.call(arguments);
    args.shift();
    if(eventName in this.handlers){
      return this.handlers[eventName].map(function(f){
        return f.apply(this,args);
      });
    }
  }

}

