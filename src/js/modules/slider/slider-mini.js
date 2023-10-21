import { Slider } from "./slider";

export class MiniSlider extends Slider {
    constructor({ container, next, prev, activeClass, animate, autoplay }) {
        super({ container, next, prev, activeClass, animate, autoplay })
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide()  );
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    const active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorateSlide();
                    break;
                }
            }
        })
    }

    decorateSlide() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass)
            if (this.animate) { 
                const title = slide.querySelector('.card__title');
                const arrow = slide.querySelector('.card__controls-arrow'); 
                if (title && arrow) {
                    title.style.opacity = '0.4';
                    arrow.style.opacity = '0';
                }
            }
            
        })
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        if (this.animate) {
            const title = this.slides[0].querySelector('.card__title');
            const arrow = this.slides[0].querySelector('.card__controls-arrow');
            if (title && arrow) {
                title.style.opacity = '1';
                arrow.style.opacity = '1';
            }
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[2]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[0]);
            this.decorateSlide()
        } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[2]);
            this.container.appendChild(this.slides[1]);
            this.decorateSlide();
        } else {
            this.container.appendChild(this.slides[0])
            this.decorateSlide()
        }  
    }
 
    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;   
        `
        this.bindTriggers();
        this.decorateSlide();
        if (this.autoplay) {
            setInterval(() => {
                this.nextSlide()
            }, 5000)
        }
           
    }
}