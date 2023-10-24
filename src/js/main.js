import { MiniSlider,  MainSlider, VideoPlayer, Difference, Form, ShowInfo   } from "./modules"

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({
        container: '.page',
        btns: '.next'
    });
    slider.render();
  
    const modulesMainSlider = new MainSlider({
        container: '.moduleapp ',
        btns: '.next   '
    })
    modulesMainSlider.render();   
    
    const miniSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    miniSlider.init()

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init()

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active',
        animate: true,
        autoplay: true
    });
    feedSlider.init()

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
    const modulesPlayer = new VideoPlayer('.module__video-item .play', '.overlay');
    modulesPlayer.init();  

    const difference = new Difference('.officerold', '.officernew', '.officer__card-item')
    difference.init()

    const form = new Form('.form')
    form.init()

    const showInfo = new ShowInfo('.plus__content');
    showInfo.init()
}); 