import { AxiosResponse } from 'axios';
//import { Ifilm } from './interface';
import './scss/style.scss';
import { movieService } from './service/film';


async function showMovies() {
  const responseDiscover = await movieService.discoverMovie();
  const responseGenre = await movieService.getMovieList();
  let numberPage: number = responseDiscover.data.page

  createPoster(responseDiscover, responseGenre)
  let buttons = document.querySelector<HTMLDivElement>(".buttons")
  let btnBack = document.querySelector<HTMLButtonElement>(".btnBack")
  let btnNext = document.querySelector<HTMLButtonElement>(".btnNext")

  if (numberPage == 1) {
    buttons!.style.justifyContent = "flex-end"
    btnBack!.style.display = "none"
  } else if (numberPage + 1 == null) {
    buttons!.style.justifyContent = "flex-start"
    btnNext!.style.display = "none"
  } else {
    buttons!.style.justifyContent = "space-between"
    btnBack!.style.display = "block"
    btnNext!.style.display = "block"
  }

  //console.log(numberPage)

  // numberPage = numberPage + 1
  // //console.log(numberPage)

  // for (numberPage = 1; numberPage < 9; numberPage = numberPage + 1) {
  //   //console.log(numberPage);
  //   // more statements
  // }
}

function createPoster(responseDiscover: AxiosResponse, responseGenre: AxiosResponse) {
  let baseImgUrl = 'https://image.tmdb.org/t/p/original'
  let allPoster = document.querySelector(".allPoster");
  //let movie: Ifilm[]

  for (let i = 0; i < 1; i++) {

    let poster = document.createElement("div");
    poster.classList.add("poster")
    allPoster!.appendChild(poster);

    let imgFilme = document.createElement("div");
    imgFilme.classList.add("imgFilme")
    poster!.appendChild(imgFilme)

    let img = document.createElement("img");
    img.src = `${baseImgUrl}${responseDiscover.data.results[i].poster_path}`
    img.style.width = '280px'
    img.style.height = '300px'
    imgFilme!.appendChild(img)

    let allCards = document.createElement("div");
    allCards.classList.add("allCards")
    poster!.appendChild(allCards)

    let card = document.createElement("div");
    let lengthGenre = responseDiscover.data.results[i].genre_ids.length
    let numberGenre = responseDiscover.data.results[i].genre_ids[lengthGenre - 1]
    console.log(responseGenre.data.genres)
    console.log(responseDiscover.data.results[i].genre_ids)
    while (lengthGenre > 0) {
      let g = 0
      while (responseGenre.data.genres[g].id != numberGenre) {
        responseGenre.data.genres[g++].id
      }
      let idGenre = responseGenre.data.genres[g].id
      if (numberGenre == idGenre) {
        card.textContent = responseGenre.data.genres[g].name
        card.classList.add("card")
        allCards!.appendChild(card)
      }
      else {
        console.error("O id do gênero não existe");
      }
      console.log(numberGenre)
      lengthGenre--
    }


    let titulo = document.createElement("div");
    titulo.textContent = responseDiscover.data.results[i].title
    titulo.classList.add("titulo")
    poster.appendChild(titulo)

    let dataEstreia = document.createElement("div");
    let dataOriginal = responseDiscover.data.results[i].release_date
    dataEstreia.textContent = dataOriginal.split('-').reverse().join('/')
    dataEstreia.classList.add("dataEstreia")
    poster.appendChild(dataEstreia)
  }

}

showMovies()




