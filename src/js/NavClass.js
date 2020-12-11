import Eventful from "./EventfulClass"

export default class Nav extends Eventful{
  
  constructor(){

    /**
      * Initializes Eventful parent class
      */
    super();
    
    let self = this;

    this.$nav = $("nav");
    this.$links = $("nav a:not(.burger)");
    this.$burger = $("nav a.burger");

    
    this.$links.on("click",function(){
      self.hide();
      self.trigger('action',this.getAttribute('data-target'));
    });
    
    this.$burger.on('click', function(){
      self.toggle();
    });
    
  }
  activateLink(id){
    return this.$links.filter("[data-target="+id+"]").addClass('active');
  }
  clear(){
    this.$links.removeClass("active");
  }
  isVisible(){
    return this.$nav.hasClass("visible");
  }
  toggle(){
    this.$nav.toggleClass("visible");
  }
  show(){
    this.$nav.addClass("visible");
    this.trigger('nav-show');
  }
  hide(){
    this.$nav.removeClass("visible");
    this.trigger('nav-hide');
  }

}