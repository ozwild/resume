export function random(min, max){
  
  if(min == undefined)
    min = 0;
  
  if(max == undefined)
    max = 1;
  
  console.log(min, max);
    
  return Math.floor(Math.random() * (max - min)) + min;
  
};