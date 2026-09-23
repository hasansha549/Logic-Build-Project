let generatedOTP;
let typedNumber;

let intvalidID;
let timeoutID;
const otpExpireElem = document.getElementById("otp-expires-id");
const againsentOTP = document.getElementById("sentOTP");
function expireOTP() {
    const totalTime = 15000;
    const interval = 1000;

    let slice = totalTime / interval;

    intvalidID = setInterval(function () {
        otpExpireElem.innerHTML = `OTP will expire in ${slice} seconds`;
        slice = slice - 1;
    }, interval);

    timeoutID = setTimeout(function () {
        otpExpireElem.innerHTML = "OPT Expired";
        clearInterval(intvalidID);
        generateOTP();
    }, totalTime);
}

function tackleOTPBoxes() {
    const boxes = document.getElementById("otp-box-list-id");

    // Typing
    boxes.addEventListener("input", function (e) {
        const target = e.target;
        const value = target.value;

        // only number allow
        if (isNaN(value)) {
            target.value = "";
            return;
        }

        // type start next input selected
        const nextElement = target.nextElementSibling;
        if (nextElement) {
            nextElement.focus();
        }

        validateOTP();
    });

    // Bacspace handle Second
    boxes.addEventListener("keydown", function (e) {
        const target = e.target;
        if (e.key === "Backspace") {
            if (target.value !== "") {
                target.value = "";
                const prviousElemnet = target.previousElementSibling;

                if (prviousElemnet) {
                    prviousElemnet.focus();
                }
                e.preventDefault();
            } else if (e.key === "Backspace") {
                target.value == "";
                const previousElement = target.previousElementSibling;
                if (previousElement) {
                    previousElement.focus();
                }
                e.preventDefault();
            }
        }
    });
}

function generateOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    // console.log(generateOTP);

    const otpElement = document.getElementById("geenerated-otp-id");

    otpElement.innerHTML = `<span>Your OPT</span> <strong>${generatedOTP}</strong>`;
    // otpElement.append(` ${generateOTP}`);

    expireOTP();
}

function validateOTP() {
    typedNumber = "";
    const boxListElem = document.getElementById("otp-box-list-id");
    [...boxListElem.children].forEach((elem) => {
        typedNumber = typedNumber + elem.value;
    });

    if (typedNumber.length !== 4) {
        return;
    }
    console.log(generatedOTP, typedNumber);
    const result = generatedOTP === parseInt(typedNumber, 10);
    const resultElem = document.getElementById("result-id");
    // const child = boxListElem.children;

    // const childList = Array.from(boxListElem);
    // console.log(childList);

    if (result) {
        resultElem.innerText = "OTP has been validate successfully";

        resultElem.classList.remove("faild");
        resultElem.classList.add("success");

        //Timer off
        clearInterval(intvalidID);
        clearTimeout(timeoutID);

        // OTP mathch message
        otpExpireElem.innerText = "OPT has been validate";
    } else {
        resultElem.innerText = "OTP is Invalid";
        resultElem.classList.remove("success");
        resultElem.classList.add("faild");
        // otpExpireElem.remove("otpExpireElem");
    }
}

function init() {
    console.log("JavaScript initialization done!!!");
    tackleOTPBoxes();
    setTimeout(generateOTP, 2000);
}
init();
// againsentOTP.addEventListener("click", init);

// focus() → These DOM Element- built-in method/ These Browser's from DOM API Built-in Methods
// element.focus();
// element.blur();
// element.click();
// element.remove();

// JavaScript id, class, added
// element.classList.add("box");   // class add
// element.id = "box-1";           // id add
