// Assignment code here

// region variables
let lowercase = false;
let uppercase = false;
let numeric = false;
let special = false;
const animationTime = 65;
let animationI = 0;

const Characters = {
  lowercase: 'abcdefghijklmnopqrstuvwyxyz',
  uppercase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: '!"#$%&\'( )*+,-./:;<=>?@[\\]^_`{|}~'
};
// end region

let FadeToggle = (targetElement) => {
  if(Math.fround((document.getElementsByClassName(targetElement)[0].getAttribute("style").split(";")[1].split(":")[1]).trim()) == 0) {
    let animation = setInterval(()=>{
      if(animationI >= animationTime){
          document.getElementsByClassName(targetElement)[0].setAttribute("style", "display: flex; opacity: 1;");
          clearInterval(animation);
          animationI = 0;
      } else{
        let opacityPerUpdate = Math.fround((1 / animationTime));
        
      
        const currentOpacity = Math.fround((document.getElementsByClassName(targetElement)[0].getAttribute("style").split(";")[1].split(":")[1]).trim());
        document.getElementsByClassName(targetElement)[0].setAttribute("style", "display: flex; opacity: " + (currentOpacity + opacityPerUpdate));

        animationI++;
      }
    }, 1);
  } else {
    let animation = setInterval(()=>{
      if(animationI >= animationTime){
          document.getElementsByClassName(targetElement)[0].setAttribute("style", "display: none; opacity: 0;");
          clearInterval(animation);
          animationI = 0;
      } else{
        let opacityPerUpdate = Math.fround((1 / animationTime));

        const currentOpacity = Math.fround((document.getElementsByClassName(targetElement)[0].getAttribute("style").split(";")[1].split(":")[1]).trim());
        document.getElementsByClassName(targetElement)[0].setAttribute("style", "display: flex; opacity: " + (currentOpacity - opacityPerUpdate));
        
        animationI++;
      }
    }, 1);
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
 function writePassword() {
  function generatePassword(){
    var password = generatePassword();
  }
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
