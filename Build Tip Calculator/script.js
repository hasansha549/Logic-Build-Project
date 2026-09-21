const peopleSum = document.getElementById("peopleSum");
const plusSum = document.getElementById("plusSum");
const minusSum = document.getElementById("minusSum");

let count = 1;
plusSum.addEventListener("click", function () {
    count++;
    peopleSum.textContent = count;
});

minusSum.addEventListener("click", function () {
    if (count > 1) {
        count--;
    }
    peopleSum.textContent = count;
});

const calculator = document.getElementById("calculator");
calculator.addEventListener("click", function () {
    const totalPerPerson = document.querySelector(".total_per_person");
    totalPerPerson.style.display = "block";

    const totalBill = Number(document.getElementById("totalBill").value);

    const tipMain = Number(document.getElementById("tipMain").value);

    let total = totalBill * (tipMain / 100);

    let finalPeople = peopleSum.innerHTML;

    //final Bill
    document.getElementById("finalBill").innerHTML = totalBill;
    document.getElementById("tipAmmount").innerHTML = total;
    const textAmount = (document.getElementById("taxAmmount").innerHTML = (totalBill + 5) / 100);

    document.querySelector("#totalPerPerson").innerHTML = ((totalBill + total + textAmount) / finalPeople).toFixed(2);
});
