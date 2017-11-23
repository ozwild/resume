import Eventful from "./EventfulClass"

/**
  * Class Content
  * used to handle notes and caller behaviour
  * @parameter noteSelector selector string used for notes
  * @parameter callerSelector selector string used for note callers
  */
export default class Content extends Eventful{

  constructor(noteSelector, callerSelector){

    /**
      * Initializes Eventful parent class
      */
    super();

    let self = this;

    this.isSwitching = false;
    this.activeNote = null;
    this.$backgrounds = $(".backgrounds");
    this.$notes = $(noteSelector);
    this.ids = this.$notes.map(function(a,b){
      return this.getAttribute('id');
    });
    this.$notes.velocity({
      rotateZ:0,
      rotateY:0,
      translateX: "-50%"
    },0);
    
        
    this.$notes.on('click','.close',()=>{
      self.hideNotes();
    });
    
    let close = $("<i>",{class:'material-icons close'}).text('close');
    this.$notes.children(".card").append(close);
    
  }

  /**
    * Returns a jQuery object corresponding to an id
    */
  getNoteById(id){
    return this.$notes.filter(id);
  }

  /**
    * Returns the active note as jQuery object
    */
  getActiveNote(){
    return this.$notes.filter(function(a,b){
      return b.classList.contains('active');
    });
  }
  runOrderNotesAnimation(){

    this.$notes.children(".card").addClass("backfaced");

    return this.$notes.velocity({
      rotateZ:0,
      rotateY:180,
      translateX: "-50%"
    },375);

  }
  runShuffleNotesAnimation(){

    let self = this;
    
    return this.$notes
      .filter(":not(.active)")
      .map((a,b)=>{
      
      return $(b).velocity({        
        rotateZ:-(a*10),
        translateX: "-50%"
      },375, ()=>{
            
      self.$notes.velocity({
        rotateY:0,
      },375, ()=>{
        
        self.$notes.children(".card").removeClass("backfaced");
        self.isSwitching = false;
        
      });
      
    });
      
    });
  }

  hideNotes(){
    this._hideNotes();
    $('body').removeClass('presentation');
  }

  /**
    * Reset all notes back to their initial state
    */
  _hideNotes(){

    let self = this;

    this.$notes.removeClass('active');

    this.ids.map(function(a,b){
      $('body').removeClass(b);
    });    
    
    this.trigger('hide-note', this.activeNote);

  }

  /**
    * Turns to active the state of a note by Id
    */
  showNote(id){
    
    if(this.isSwitching){
      console.log('Currently switching notes. Request aborted.');
      return;
    }
    
    this.isSwitching = true;
    
    this.activeNote = id;
    
    let requestedNote = this.getNoteById("#"+id);
    let activeNote = this.getActiveNote();

    if(activeNote.length > 0){
      activeNote.removeClass('active');
    }else{
      $('body').addClass(id).addClass('presentation');
    }

    this.runOrderNotesAnimation();
    
    this._hideNotes();

    requestedNote.addClass('active');

    $("body").addClass(id);
    
    this.runShuffleNotesAnimation();

    this.trigger('show-note', this.activeNote);

  }

}