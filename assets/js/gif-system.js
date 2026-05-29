/* gif-system.js - Contextual GIPHY Reaction System */

class GifReaction {
    constructor() {
        this.container = null;
        this.queue = [];
        this.active = false;
        this.triggered = new Set();
        this.apiKey = window.portfolioData?.apis?.giphy || null;
        
        this.fallbacks = {
            onSiteReveal: "https://media.giphy.com/media/3o7TKP9ln2Dr6ze6f6/giphy.gif",
            onContactSuccess: "https://media.giphy.com/media/OK27wINdQS5YQ/giphy.gif",
            onContactError: "https://media.giphy.com/media/26n6Gx9moCgs1pUuk/giphy.gif",
            on404: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
            onResumeDownload: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
            onSkillsReveal: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
            onProjectHover: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
            onLongDwell: "https://media.giphy.com/media/l2JHVUriDGEtWOx0c/giphy.gif",
            onFullScroll: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
        };
        
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.id = 'gif-reaction-container';
        document.body.appendChild(this.container);
        
        // Expose to window so other scripts can call it
        window.triggerGif = (moment) => this.trigger(moment);
        
        this.setupTriggers();
    }
    
    setupTriggers() {
        // Resume Download
        const resumeBtns = document.querySelectorAll('a[download]');
        resumeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.trigger('onResumeDownload', 'Downloading data...'));
        });
        
        // Intersection Observers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'arsenal') {
                        this.trigger('onSkillsReveal', 'Loading arsenal...');
                    }
                    if (entry.target.id === 'footer') {
                        this.trigger('onFullScroll', 'End of line.');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        const arsenal = document.getElementById('arsenal');
        const footer = document.getElementById('footer');
        if (arsenal) observer.observe(arsenal);
        if (footer) observer.observe(footer);
        
        // Hover on projects
        const delegateProjectHover = (e) => {
            if (e.target.closest('.project-card')) {
                this.trigger('onProjectHover', 'Analyzing architecture...');
                document.removeEventListener('mouseover', delegateProjectHover);
            }
        };
        document.addEventListener('mouseover', delegateProjectHover);
        
        // Long dwell time
        setTimeout(() => {
            this.trigger('onLongDwell', 'Still there?');
        }, 240000); // 4 minutes
    }

    async trigger(moment, text = '') {
        if (this.triggered.has(moment)) return;
        this.triggered.add(moment);
        
        this.queue.push({ moment, text });
        if (!this.active) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.queue.length === 0) {
            this.active = false;
            return;
        }
        
        this.active = true;
        const current = this.queue.shift();
        
        await this.show(current);
        
        setTimeout(() => {
            this.processQueue();
        }, 500); // Wait between GIFs
    }

    async show({ moment, text }) {
        let gifUrl = this.fallbacks[moment] || this.fallbacks.onSiteReveal;
        
        if (this.apiKey) {
            try {
                // Determine query based on moment
                let query = 'hacker';
                if (moment === 'onContactSuccess') query = 'success';
                else if (moment === 'onContactError') query = 'error';
                else if (moment === 'onResumeDownload') query = 'download matrix';
                else if (moment === 'onFullScroll') query = 'mind blown';
                
                const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&tag=${encodeURIComponent(query)}&rating=g`);
                
                // timeout control
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000));
                
                const data = await Promise.race([response.json(), timeoutPromise]);
                if (data && data.data && data.data.images) {
                    gifUrl = data.data.images.downsized_medium.url;
                }
            } catch (err) {
                console.warn('Giphy API failed or timed out, using fallback.', err);
                // Fallback URL already assigned
            }
        }
        
        return new Promise((resolve) => {
            const card = document.createElement('div');
            card.className = 'gif-reaction-card glass-card slide-up';
            
            card.innerHTML = `
                <div class="gif-header">
                    <span class="gif-dot red"></span>
                    <span class="gif-title">Reaction // ${moment}</span>
                    <button class="gif-close">&times;</button>
                </div>
                <div class="gif-body">
                    <img src="${gifUrl}" alt="Reaction GIF" class="gif-img">
                    ${text ? `<div class="gif-text mono">${text}</div>` : ''}
                </div>
            `;
            
            this.container.appendChild(card);
            
            const closeBtn = card.querySelector('.gif-close');
            let dismissTimeout;
            
            const dismiss = () => {
                clearTimeout(dismissTimeout);
                card.classList.remove('slide-up');
                card.classList.add('fade-out');
                setTimeout(() => {
                    if(card.parentNode) card.remove();
                    resolve();
                }, 400);
            };
            
            closeBtn.addEventListener('click', dismiss);
            dismissTimeout = setTimeout(dismiss, 6000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gifSystem = new GifReaction();
});
