(() => {
  const root = document.documentElement;
  const preloadClass = "gsap-preload";
  const releasePreload = () => root.classList.remove(preloadClass);

  const prefersReducedMotion = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initFaq = () => {
    const items = document.querySelectorAll("#faq .framer-4qRSl");
    if (!items.length) return;

    const answers = {
      "What are the event’s main highlights?":
        "Keynotes, hands-on workshops, and live demos focused on emerging IT trends and real-world applications.",
      "Is there a dress code for the event?":
        "Business casual is recommended. Comfortable attire is encouraged for workshops and networking.",
      "Will there be on-site registration?":
        "Yes, on-site registration is available, but we recommend registering early to avoid lines.",
      "What is the cancellation policy?":
        "Tickets are refundable up to 7 days before the event. After that, transfers are allowed.",
      "Are there accommodations nearby?":
        "Yes, there are multiple partner hotels within walking distance and along the main transit lines.",
      "Are there opportunities for volunteering?":
        "Yes, a limited number of volunteer roles are available. Contact us to apply."
    };

    items.forEach((item, index) => {
      const question = item.querySelector(".framer-1m2n3p p");
      if (!question) return;

      const questionText = question.textContent.trim().replace(/\s+/g, " ");
      const answerText = answers[questionText] || "Details will be shared soon.";

      let answer = item.querySelector(".faq-answer");
      if (!answer) {
        answer = document.createElement("div");
        answer.className = "framer-9dwzyp faq-answer";
        answer.setAttribute("data-framer-name", "Answer");

        const answerTextWrap = document.createElement("div");
        answerTextWrap.className = "framer-1yqroe4";

        const answerParagraph = document.createElement("p");
        answerParagraph.className = "framer-text framer-styles-preset-1qr8uq3";
        answerParagraph.setAttribute("data-styles-preset", "FqSrgzNRt");
        answerParagraph.style.setProperty("--framer-text-alignment", "left");
        answerParagraph.style.setProperty(
          "--framer-text-color",
          "var(--token-6df0ccc7-0a3b-4fc4-b4e5-e2e38aedab96, #1f2b50)"
        );
        answerParagraph.textContent = answerText;

        answerTextWrap.appendChild(answerParagraph);
        answer.appendChild(answerTextWrap);
        item.appendChild(answer);
      }

      const answerId = `faq-answer-${index}`;
      answer.id = answerId;
      item.setAttribute("role", "button");
      item.setAttribute("aria-expanded", "false");
      item.setAttribute("aria-controls", answerId);
      item.classList.remove("is-open");
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";

      const toggle = () => {
        const isOpen = item.classList.toggle("is-open");
        item.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (isOpen) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
          answer.style.opacity = "1";
        } else {
          answer.style.maxHeight = "0px";
          answer.style.opacity = "0";
        }
      };

      item.addEventListener("click", (event) => {
        if (event.target.closest("a, button")) return;
        toggle();
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });

    window.addEventListener("resize", () => {
      items.forEach((item) => {
        if (!item.classList.contains("is-open")) return;
        const answer = item.querySelector(".faq-answer");
        if (answer) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  };

  const runAnimations = () => {
    if (!window.gsap || prefersReducedMotion()) {
      releasePreload();
      initFaq();
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
      "#hero nav a.framer-jztfi",
      '#hero nav a[data-framer-name="Nav"]',
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
      const heroLogo = hero.querySelectorAll("nav a.framer-jztfi");
      const heroNavItems = hero.querySelectorAll(
        'nav a[data-framer-name="Nav"]'
      );

      const timeline = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" }
      });

      setWillChange([
        ...heroLogo,
        ...heroNavItems,
        ...heroChips,
        ...heroHeadings,
        ...heroInfoCards
      ]);

      timeline
        .to(heroLogo, { y: 0, autoAlpha: 1, duration: 0.7 }, 0)
        .to(heroNavItems, { y: 0, autoAlpha: 1, stagger: 0.06 }, 0.05)
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

    const attachImageExpand = (wrapperSelector, config = {}) => {
      const wrappers = document.querySelectorAll(wrapperSelector);
      if (!wrappers.length) return;

      const {
        scale = 0.05,
        durationIn = 0.35,
        durationOut = 0.4
      } = config;

      const handled = new Set();

      wrappers.forEach((wrapper) => {
        const media = wrapper.querySelector("img");
        if (!media) return;
        const card = wrapper.parentElement;
        if (!card || handled.has(card)) return;
        handled.add(card);

        const baseScale = gsap.getProperty(media, "scale") || 1;
        media.style.willChange = "transform";

        const hoverIn = () =>
          gsap.to(media, {
            scale: baseScale + scale,
            duration: durationIn,
            ease: "power3.out",
            overwrite: "auto"
          });

        const hoverOut = () =>
          gsap.to(media, {
            scale: baseScale,
            duration: durationOut,
            ease: "power3.out",
            overwrite: "auto"
          });

        card.addEventListener("mouseenter", hoverIn);
        card.addEventListener("mouseleave", hoverOut);
        card.addEventListener("focus", hoverIn);
        card.addEventListener("blur", hoverOut);
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

    attachHoverLift('a[data-framer-name="Primary"]', {
      y: -4,
      scale: 1.01,
      shadow: "0 10px 22px rgba(0,0,0,0.2)"
    });

    attachImageExpand('[data-framer-background-image-wrapper="true"]', {
      scale: 0.06
    });

    initFaq();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAnimations);
  } else {
    runAnimations();
  }
})();
