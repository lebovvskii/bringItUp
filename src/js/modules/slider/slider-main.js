import { Slider }  from './slider'

export class MainSlider extends Slider {
    constructor(btns) {
        super(btns)
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length; 
        }
        try {
            this.hanson.style.opacity = '0';
            if (n == 3) {
                this.hanson.classList.add('animated');
                setTimeout(()=> {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('fadeInUp')
                }, 3000);
            } else {
                this.hanson.classList.remove('fadeInUp');
            }
        } catch(err) {}
        
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });
        this.slides[this.slideIndex - 1].style.display = 'block';
    };

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    };

    bindTriggers() {      
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
            const homeBtn = btn.parentNode.previousElementSibling
            homeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
        const prevModuleArrows = document.querySelectorAll('.prevmodule')
        const nextModuleArrows = document.querySelectorAll('.nextmodule')
        prevModuleArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                this.plusSlides(-1)
            })
        })
        nextModuleArrows.forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1)
            })
        })
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson')
            } catch(err) {}
            this.bindTriggers();
            this.showSlides(this.slideIndex);
        }
    } 
}