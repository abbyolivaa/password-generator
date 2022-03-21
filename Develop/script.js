// Assignment code here

//#region variables
let lowercase = false;
let uppercase = false;
let numeric = false;
let special = false;
const animationTime = 65;
let animationI = 0;


const Characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: '!"#$%&\'( )*+,-./:;<=>?@[\\]^_`{|}~'
};
//#endregion

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

const validated = ((options) => {
  let valid = 0;
  if(!(document.getElementById('passwordLength').value >= 8 && document.getElementById('passwordLength').value <= 128)) return false;
  for (let i = 0; i < options.length; i++) {
    //console.log('options[i]', options[i]);
    //console.log('valid', valid);
    if(valid < 1){
      if (options[i]) valid++;
    } else break;
  }
  return (valid > 0) ? true : false;
});

const noticeRequire = () => {
  document.getElementsByClassName('notice')[0].innerHTML = 'You must choose at least one option.';
  if(!(document.getElementById('passwordLength').value >= 8 && document.getElementById('passwordLength').value <= 128)){
    document.getElementsByClassName('notice')[0].innerHTML += '<br /> Minimum password length: 8 characters <br /> Maximum password length: 128 characters';
  }
  FadeToggle('notice');
  setTimeout(() => {
    FadeToggle('notice');
  }, 2500);
  
}

const generatePassword = (() =>{
  const inputs = document.getElementsByName("characterOpt");
  let options = [];
  for (let q = 0; q < inputs.length; q++) {
    options.push(inputs[q].checked);
  }
  if(validated(options)) {
    FadeToggle('popupContainer');
    
    const passwordLength = Math.round(document.getElementById('passwordLength').value > 0 ? document.getElementById('passwordLength').value : Math.round(Math.random() * 10) + 1);
    
    const characterOptions = '' + (((options[0]) ? Characters.lowercase : '') 
      + ((options[1]) ? Characters.uppercase : '') 
      + ((options[2]) ? Characters.numeric : '') 
      + ((options[3]) ? Characters.special.toString() : ''));
    
    //console.log('characterOptions', characterOptions);
    let passwordGenerated = '';

    //if(passwordLength < 1) passwordLength = ;

    for (let i = 0; i < passwordLength; i++) {
        const random = Math.round(Math.random() * (characterOptions.length - 1));
        const secondrandom = Math.round(Math.random() * (characterOptions.length - 1));
        passwordGenerated += (i == 0 && characterOptions[random] == ' ') ? characterOptions[Math.abs(random - secondrandom)] : characterOptions[random];
    }
    console.log('passwordGenerated: "' + passwordGenerated + '" ');
    writePassword(passwordGenerated);
    return true;
  } else {
    noticeRequire();
    return false;
  }
});

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
const submitOptions = document.querySelector("#submitOptions");

// Write password to the #password input
function writePassword(password) {
  var passwordText = document.querySelector("#password");
  passwordText.value += password + '\n';
};

window.addEventListener("load", () => {
  //generateBtn.addEventListener("click", writePassword);
  //submitOptions.addEventListener("onclick", generatePassword());
  generateBtn.onclick = (()=>{FadeToggle('popupContainer');});
  submitOptions.onclick = (()=>{generatePassword();});
});
