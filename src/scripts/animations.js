import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function getTriggerConfig(el) { // Determinamos el tipo de trigger del elemento
        const triggerType = el.dataset.trigger; // 'immediate' | 'scroll'

        if (triggerType === 'immediate') {
            return {
                trigger: el,
                start: "top 100%", // se dispara nada mas asomar al viewport
            };
        }
        return {
            trigger: el,
            start: "top 75%", // tarda mas, hay que scrollear más para verlo
        };
    }


    const texts = document.querySelectorAll('.title');
    texts.forEach((title) => {
    gsap.fromTo(title, { 
            y:10,
            autoAlpha: 0,
            },
            {
            y:0,
            delay: 0.2,
            duration: 1.0,
            ease: 'power2.out',
            autoAlpha: 1,
            clearProps: 'transform',
            scrollTrigger: getTriggerConfig(title),

        });
    });


    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
    gsap.fromTo(card, { 
        y:20,
        autoAlpha: 0,
        },
        {
        y:0,
        delay: 1.0,
        duration: 1.0,
        ease: 'power2.out',
        autoAlpha: 1,
        clearProps: 'transform',
        scrollTrigger: getTriggerConfig(card),

        });
    });


    const text = document.querySelectorAll('.text'); 
    text.forEach((text) => {
    gsap.fromTo(text, {
        y:10,
        autoAlpha: 0,
        },
        {
        y: 0,
        delay: 0.7,
        duration: 1.0,
        ease: 'power2.out',
        autoAlpha: 1,
        scrollTrigger: getTriggerConfig(text),

    });
});
