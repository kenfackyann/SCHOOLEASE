document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/univ/getUniv')
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.getElementById('topranking_cards');
            console.log(data);
            
            data.forEach(school => {
                const card = document.createElement('div');
                card.className = 'topranking_card';

                const cardImage = document.createElement('div');
                cardImage.className = 'cardimage';
                cardImage.innerHTML = `<img src="${school.image_path}" alt="">`;
                card.appendChild(cardImage);

                const cardText = document.createElement('div');
                cardText.className = 'cardtext';

                const cardTitle = document.createElement('div');
                cardTitle.className = 'cardtext_title';
                cardTitle.innerHTML = `<h3>${school.name}</h3>`;
                cardText.appendChild(cardTitle);

                const cardPara = document.createElement('div');
                cardPara.className = 'cardtext_para';
                cardPara.innerHTML = `${school.description}`;
                cardText.appendChild(cardPara);

                const cardDetails = document.createElement('div');
                cardDetails.className = 'cardtext_details';
                cardDetails.innerHTML = `<a href="#">details</a>`;
                cardText.appendChild(cardDetails);

                card.appendChild(cardText);
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

let section = document.querySelector('#yann');
window.onscroll = () =>{
    
let  top = window.scrollY;
let offSet = section.offsetTop - 300;
let height = section.offsetHeight;

if(top >=offSet && top < offSet + height){
 section.classList.add('add_animate');
}
else{
    section.classList.remove('add_animate');
}

}
