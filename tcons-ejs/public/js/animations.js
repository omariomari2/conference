(() => {
  const root = document.documentElement;
  const preloadClass = "gsap-preload";
  const releasePreload = () => root.classList.remove(preloadClass);

  const prefersReducedMotion = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runAnimations = () => {
    if (!window.gsap || prefersReducedMotion()) {
      releasePreload();
      return;
    }

    const { gsap } = window;
    const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
    if (hasScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);
    }

    gsap.defaults({ ease: "power2.out" });

    const setWillChange = (elements) => {
      elements.forEach((el) => {
        el.style.willChange = "transform, opacity";
      });
    };

    const preloadSelectors = [
      '#hero [data-framer-name="Chips & H1"] p',
      '#hero [data-framer-name="Chips & H1"] h1',
      '#hero [data-framer-name="Hero Info Blocks"] .framer-O9UkP',
      "#about",
      "#moments",
      "#faq",
      "#contact-us",
      "#speakers .framer-8CuKQ",
      "#partners .framer-yGQVR",
      "#blog .framer-ODUSC",
      "#resources .framer-IbXOz",
      '#testimonials [data-framer-name="Testimonial Card"]'
    ].join(",");

    const preloadTargets = gsap.utils.toArray(preloadSelectors);
    if (preloadTargets.length) {
      gsap.set(preloadTargets, { autoAlpha: 0, y: 20 });
    }
    releasePreload();

    const heroIntro = () => {
      const hero = document.querySelector("#hero");
      if (!hero) return;

      const heroChips = hero.querySelectorAll(
        '[data-framer-name="Chips & H1"] p'
      );
      const heroHeadings = hero.querySelectorAll(
        '[data-framer-name="Chips & H1"] h1'
      );
      const heroInfoCards = hero.querySelectorAll(
        '[data-framer-name="Hero Info Blocks"] .framer-O9UkP'
      );

      const timeline = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" }
      });

      setWillChange([...heroChips, ...heroHeadings, ...heroInfoCards]);

      timeline
        .to(heroChips, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0)
        .to(heroHeadings, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0.05)
        .to(heroInfoCards, { y: 0, autoAlpha: 1, stagger: 0.1 }, 0.2);
    };

    const revealOnScroll = (selector, options = {}) => {
      const elements = gsap.utils.toArray(selector);
      if (!elements.length) return;
      setWillChange(elements);

      const {
        y = 28,
        duration = 0.8,
        stagger = 0.12,
        start = "top 80%"
      } = options;

      gsap.set(elements, { autoAlpha: 0, y });

      if (hasScrollTrigger && window.ScrollTrigger.batch) {
        window.ScrollTrigger.batch(elements, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { y: 0, autoAlpha: 1, duration, stagger })
        });
      } else {
        gsap.to(elements, {
          y: 0,
          autoAlpha: 1,
          duration,
          stagger
        });
      }
    };

    const attachHoverLift = (selector, config = {}) => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      const {
        y = -8,
        scale = 1.02,
        duration = 0.25,
        shadow = "0 18px 40px rgba(0,0,0,0.18)"
      } = config;

      elements.forEach((element) => {
        element.style.willChange = "transform, box-shadow";
        const baseShadow = getComputedStyle(element).boxShadow;

        const hoverIn = () => {
          gsap.to(element, {
            y,
            scale,
            boxShadow: shadow,
            duration,
            ease: "power3.out",
            overwrite: "auto"
          });
        };

        const hoverOut = () => {
          gsap.to(element, {
            y: 0,
            scale: 1,
            boxShadow: baseShadow,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto"
          });
        };

        element.addEventListener("mouseenter", hoverIn);
        element.addEventListener("mouseleave", hoverOut);
        element.addEventListener("focus", hoverIn);
        element.addEventListener("blur", hoverOut);
      });
    };

    const attachHoverZoom = (cardSelector, mediaSelector) => {
      const cards = document.querySelectorAll(cardSelector);
      if (!cards.length) return;

      cards.forEach((card) => {
        const media = card.querySelector(mediaSelector);
        if (!media) return;
        const baseScale = gsap.getProperty(media, "scale") || 1;
        media.style.willChange = "transform";

        card.addEventListener("mouseenter", () => {
          gsap.to(media, {
            scale: baseScale + 0.05,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(media, {
            scale: baseScale,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      });
    };

    heroIntro();
    revealOnScroll("#about, #moments, #faq, #contact-us", {
      y: 28,
      stagger: 0,
      start: "top 85%"
    });

    revealOnScroll("#speakers .framer-8CuKQ", { y: 32, stagger: 0.1 });
    revealOnScroll("#partners .framer-yGQVR", { y: 24, stagger: 0.08 });
    revealOnScroll("#blog .framer-ODUSC", { y: 24, stagger: 0.08 });
    revealOnScroll("#resources .framer-IbXOz", { y: 24, stagger: 0.1 });
    revealOnScroll('#testimonials [data-framer-name="Testimonial Card"]', {
      y: 24,
      stagger: 0.12
    });

    attachHoverLift(".framer-8CuKQ", { y: -10, scale: 1.03 });
    attachHoverLift("#blog .framer-ODUSC", { y: -8, scale: 1.02 });
    attachHoverLift("#partners .framer-yGQVR", { y: -8, scale: 1.03 });
    attachHoverLift("#resources .framer-IbXOz", { y: -8, scale: 1.02 });
    attachHoverLift('#testimonials [data-framer-name="Testimonial Card"]', {
      y: -8,
      scale: 1.02
    });
    attachHoverLift('a[data-framer-name="Primary"]', {
      y: -4,
      scale: 1.01,
      shadow: "0 10px 22px rgba(0,0,0,0.2)"
    });

    attachHoverZoom(
      "#blog .framer-ODUSC",
      '[data-framer-name="Blog Cover"]'
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAnimations);
  } else {
    runAnimations();
  }
})();
