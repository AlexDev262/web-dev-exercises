const input = document.querySelector("#text-input");
const result = document.querySelector("#result");
const check = document.querySelector("#check-btn");
const display = document.querySelector(".display");






document.addEventListener ("keydown", (event) => {
  if (event.key === "Enter") {
    checks();
  }
});



const checks = () => {
  if (input.value.trim() === "") {
    alert("Please input a value");
  } else {
    result.style.display = "flex";
    
   
    
    let palindrome = input.value;
    let mPalindrome = palindrome.replace(/[^a-zA-Z0-9]/g, "");
    mPalindrome = mPalindrome.toLowerCase();

    let rPalindrome = [];
    for (let i=0; i < palindrome.length; i++){
      rPalindrome[i] = mPalindrome[palindrome.length - i-1];
    }  
    rPalindrome = rPalindrome.join("");
    

    if (mPalindrome === rPalindrome) {
      result.textContent = `${palindrome} is a palindrome.`;
    } else {
      result.textContent = `${palindrome} is not a palindrome.`;
    }

    /*result.textContent += " " + mPalindrome + " and " + rPalindrome;*/
  }
};

check.addEventListener("click", checks);

