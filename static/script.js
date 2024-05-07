const keyword_label = document.querySelector("#keyword");

let question = {};

const setup_buttons = () => {
    for (let i = 0; i < 9; i++) {
        let btn = document.querySelector(`#${"abcdefghi"[i]}`);
        btn.addEventListener("click", () => check_answer(btn, `${"abcdefghi"[i]}`))
    }
}

const reset_buttons = () => {
    for (let i = 0; i < 9; i++) {
        let btn = document.querySelector(`#${"abcdefghi"[i]}`);
        btn.classList.remove("correct");
        btn.classList.remove("wrong");
    }
}

const get_question = async (id) => {
    reset_buttons()
    let res = await fetch(`/question/${id}`);
    question = await res.json(); 
    keyword_label.innerHTML = question.keyword;
    for (let i = 0; i < 9; i++) {
        let btn = document.querySelector(`#${"abcdefghi"[i]}`);
        let btn_image = btn.querySelector("img");
        btn_image.src = `kanjing/${question["abcdefghi"[i]]}.png`
        btn.setAttribute("index", id);
    }
    console.log(question);
}

const check_answer = (btn, opt) => {
    let index = parseInt(btn.getAttribute("index"));
    let t = 0;
    if (question["answer"] == opt) {
        let btn = document.querySelector(`#${opt}`);
        btn.classList.add("correct");
        t = 100;
    } else {
        let corr_btn = document.querySelector(`#${question["answer"]}`);
        corr_btn.classList.add("correct");
        let wrng_btn = document.querySelector(`#${opt}`);
        wrng_btn.classList.add("wrong");
        t = 1500;
    }
    setTimeout(() => get_question(index + 1), t);
}

setup_buttons();
get_question(0);