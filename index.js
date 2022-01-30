let button =  document.querySelector("button");
let ques = document.querySelector("#ques");
let ans1 = document.querySelector("#ans1")
let ans2 = document.querySelector("#ans2")
let ans3 = document.querySelector("#ans3")
let ans4 = document.querySelector("#ans4")
let sameAnswers = document.querySelectorAll(".sameanswers");
let wrong = document.querySelector("#wrong");


window.addEventListener("load",()=>
{
    getData();
   
})

button.addEventListener("click",()=>
{
    window.location.reload();
    getData();
})


function getData()
{
 
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(response => {
        if (response.status === 200)
        return response.json();
        else
        console.log("Questions Not Available");
    })
    .then(data=>
        {

            let question = data.results[0].question;
            let answer1 = data.results[0].correct_answer;
            let answer2 = data.results[0].incorrect_answers[0];
            let answer3 = data.results[0].incorrect_answers[1];
            let answer4 = data.results[0].incorrect_answers[2];
            let ans = answer1;
            let list = [0,1, 2, 3]
            list = list.sort(() => Math.random() - 0.5);

            let answersList = [ answer1,answer2,answer3,answer4];
            ques.innerHTML = question;

            ans1.innerHTML = answersList[list[0]];
            ans2.innerHTML = answersList[list[1]];
            ans3.innerHTML = answersList[list[2]];
            ans4.innerHTML = answersList[list[3]];

            rightAnwers(ans,answersList);
           
        })
    
        .catch(error => {
            console.log(error);
        
        });
}



function rightAnwers(ans,answersList)
{
    sameAnswers.forEach(q=>
        {
            q.addEventListener("click",()=>
            {
                // console.log(`Right Answer : ${ans}`);

                if (q.innerHTML === ans)
                {
                  
                    alert("Right Answer!");
                    window.location.reload();
                    getData();
                   
                }
                else if (q.innerHTML !== ans)
                {
                    ans1.style.pointerEvents = "none";
                    ans2.style.pointerEvents = "none";
                    ans3.style.pointerEvents = "none";
                    ans4.style.pointerEvents = "none";

                    wrong.style.display = "block";
                    wrong.innerHTML=`Wrong Asnwer! Try Again 😔! <br> Right Answer is:  <span style = "color : red">${ans}</span>`;
                    
                }
            })
        })
}
