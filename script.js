const MAIN_URL = 'https://usersdogs.dmytrominochkin.cloud/';

async function getDogs() {
    const url = MAIN_URL + 'dogs';
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
        document.querySelector('.dog').innerHTML += `<p class="error">Error</p>`;
    } finally {
        document.querySelector('.loading_gif').style.display = "none";
    }
}

function modalOpen(dog) {
    document.querySelector('body').style.overflow = "hidden";
    const modal = document.querySelector('.modal');
    modal.classList.add("show");
    modal.innerHTML = `
        <div class="modal_body" style="top: ${window.pageYOffset}px">
            <img class="modal_photo" src="${MAIN_URL + dog.dogImage}" alt="dog">
            <div class="modal_content">
                <h2 class="modal_name">${dog.title}</h2>
                <p class="modal_suptitle">Sex</p>
                <h3 class="modal_sex">${dog.sex.toLowerCase()}</h3>
                <p class="modal_suptitle">Age</p>
                <h3 class="modal_age">${dog.age}</h3>
                <p class="modal_suptitle">Personality</p>
                <p class="modal_description">${dog.description}</p>
                <button class="modal_btn">
                    <img class="modal_phone" src="phone-solid.svg">
                    Adopt Me
                </button>
            </div>
        </div>
    `;
}

function modalClose() {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".modal").classList.remove("show");
}

async function renderPage() {
    
    const section = document.querySelector('.dog');
    section.innerHTML += `<img class="loading_gif" src="loading.gif" alt="loading">`;

    const dogs = await getDogs();
    
    if (!dogs || dogs.error) {
        section.innerHTML += `<p class="error">Error</p>`;
        return;
    }

    section.innerHTML += `
        <ul class="dog_list">
        </ul>

        <div class="modal">
        </div>
    `;
    
    dogs.forEach(item => {
        const dog = document.createElement("li");
        dog.classList.add("dog_item");
        dog.innerHTML += `
            <img class="dog_img" src=${MAIN_URL + item.dogImage} alt="dog">
            <div class="dog_text">
                <h2 class="dog_name">${item.title}</h2>
                <p class="dog_sex">${item.sex.toLowerCase()}</p>
            </div>
        `;
        dog.addEventListener("click", () => modalOpen(item));
        document.querySelector('.dog_list').append(dog);
    });
    
    document.addEventListener("click", event => {
        if (!event.target.closest(".modal_body") && !event.target.closest(".dog_item")) modalClose();
    });

    document.addEventListener("keyup", event => {
        if (event.code === "Escape") modalClose();
    });
}

renderPage();