export class VideoPlayer {
    constructor(triggers, overlay) {
        try {
            this.btns = document.querySelectorAll(triggers);
            this.overlay = document.querySelector(overlay);
            this.close = this.overlay.querySelector('.close');
            this.onPlayerStateChange = this.onPlayerStateChange.bind(this);  
        } catch (err) {}   
    }

    bindTriggers() {
        this.btns.forEach((btn, index) => {
            try {
                const blockedElement = btn.closest('.module__video-item').nextElementSibling; 
                if (index %  2 == 0) {
                    blockedElement.setAttribute('data-disabled', 'true')
                }  
            } catch (err) {   }
                
            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') ||   btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;
                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex'
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url')
                            this.player.loadVideoById({videoId: this.path});  
                        }
                    } else { 
                        this.path = btn.getAttribute('data-url')
                        this.createPlayer(this.path)   
                    }
                }
            })
        })
    }

    bindClose() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo()   
        })
    }

    createPlayer(videoId) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });
        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) { 
        try {
            const blockedElement = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
            if (state.data === 0) {
                const playCircle = blockedElement.querySelector('.play__circle');
                if (playCircle.classList.contains('closed')) {
                    playCircle.classList.remove('closed');
                    playCircle.appendChild(playBtn);
                    blockedElement.querySelector('svg').remove()
                    blockedElement.querySelector('.play__text').textContent = 'play video';
                    blockedElement.querySelector('.play__text').classList.remove('attention')
                    blockedElement.style.opacity = '1';
                    blockedElement.style.filter = 'none';
                    blockedElement.setAttribute('data-disabled', 'false   ')
                }
            } 
        } catch (err) {}
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.querySelector('script');
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)      
            
            this.bindTriggers()
            this.bindClose()
        }  
    }
}