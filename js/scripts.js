var app = app || {};

var spBreak = 767.98;

app.init = function() {
  app.tabletViewport();
  app.fullpage();
  app.animationKv();
  app.animationProject();
  app.animationSpace();
  app.animationBlocks();
  app.animationAstronaut();
  app.animationContract();
  app.animationRoadmap();
  app.roadmap();
};

app.isMobile = function() {
  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;
};

app.tabletViewport = function() {
  var viewport = document.getElementById('viewport');

  var viewportSet = function() {
    if (screen.width >= 768 && screen.width <= 1440) {
      viewport.setAttribute('content', 'width=1600, user-scalable=0');
      $('html').addClass('is-tablet');
    } else {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0'
      );
      $('html').removeClass('is-tablet');
    }
  };

  viewportSet();

  window.onload = function() {
    viewportSet();
  };

  window.onresize = function() {
    viewportSet();
  };

  if (app.isMobile()) {
    var setFillHeight = function() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    };
    var vw = window.innerWidth;
    window.addEventListener('resize', function() {
      if (vw == window.innerWidth) {
        return;
      }
      vw = window.innerWidth;
      setFillHeight();
    });
    setFillHeight();
  }
};

app.fullpage = function() {
  if (!app.isMobile()) return;

  new fullpage('#fullpage', {
    licenseKey: '0751B3F1-66C041AD-8CBA5EEB-13391333',
    autoScrolling: true,
    scrollHorizontally: true,
    normalScrollElements: '.roadmap-timeline',
    afterLoad: function(origin, destination, direction) {
      if (destination.index == 0) {
        $('.btn-top').fadeOut();
      } else {
        $('.btn-top').fadeIn();
      }
    }
  });

  $('.btn-top').click(function() {
    console.log('ok');
    fullpage_api.moveTo(1);
    return false;
  });
};

app.animationKv = function() {
  if (app.isMobile()) return;

  var mouse = { x: 0, y: 0 };
  var forcex = 0;
  var forcey = 0;
  var magnet = 2500;
  var rtime;
  var timeout = false;
  var delta = 200;
  var kvInterval;

  $(document).bind('mousemove', function(e) {
    mouse = { x: e.pageX, y: e.pageY };
  });

  function startMoving() {
    $('.kv-decor').each(function(index, el) {
      $(this).css({
        width: $(this).width() + 'px'
      });
      $(el).data('homex', parseInt($(el).position().left));
      $(el).data('homey', parseInt($(el).position().top));
    });

    kvInterval = setInterval(function() {
      $('.kv-decor').each(function(index, el) {
        el = $(el);
        position = el.position();
        x0 = el.offset().left;
        y0 = el.offset().top;
        x1 = mouse.x;
        y1 = mouse.y;
        distancex = x1 - x0 - el.width() / 2;
        distancey = y1 - y0 - el.height() / 2;
        distance = Math.sqrt(distancex * distancex + distancey * distancey);
        powerx = x0 - ((distancex / distance) * magnet) / distance;
        powery = y0 - ((distancey / distance) * magnet) / distance;
        forcex = (forcex + (el.data('homex') - x0) / 2) / 2.1;
        forcey = (forcey + (el.data('homey') - y0) / 2) / 2.1;
        el.css('left', powerx + forcex);
        el.css('top', powery + forcey - 70);
      });
    }, 15);
  }

  startMoving();

  $(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });

  function resizeend() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      clearInterval(kvInterval);
      $('.kv-decor').removeAttr('style');
      startMoving();
    }
  }
};

app.animationProject = function() {
  $('#project-stars')
    .find('path')
    .each(function() {
      var projectStars = new TimelineMax({
        repeat: -1,
        repeatDelay: 1 + Math.floor(Math.random() * 5)
      });
      projectStars.set($(this), { opacity: 0, scale: 1.5 });
      projectStars.to(
        $(this),
        2,
        { opacity: 1 },
        1 + Math.floor(Math.random() * 5)
      );
      projectStars.to($(this), 2, { opacity: 0 }, '+=2');
    });

  if (app.isMobile()) return;
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 160,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'bubble'
        },
        onclick: {
          enable: false,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0,
          speed: 3
        },
        repulse: {
          distance: 400,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
};

app.animationSpace = function() {
  var spaceBg = new TimelineMax({ repeat: -1, repeatDelay: 0 });
  spaceBg.set('.section-space .space-overlay', { opacity: 0 });
  spaceBg.to('.section-space .space-overlay', 0.5, { opacity: 1 });
  spaceBg.to('.section-space .space-overlay', 0.5, { opacity: 0 }, '+=0.5');
};

app.animationBlocks = function() {
  var blocksSpinners = new TimelineMax({ repeat: -1, repeatDelay: 0 });
  for (i = 0; i <= 32; i++) {
    blocksSpinners.to(
      '.section-blocks .spinner img',
      0,
      { rotate: i * (360 / 32), ease: Linear.easeNone },
      '+=' + (i == 0 ? 0 : 3 / 32)
    );
  }

  if (!app.isMobile()) {
    var blocksBg = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    blocksBg.to('.section-blocks .block-sprite', 0, {
      backgroundPosition: '50% 0px'
    });
    blocksBg.to(
      '.section-blocks .block-sprite',
      0,
      { backgroundPosition: '50% -400px' },
      '+=0.5'
    );
    blocksBg.to(
      '.section-blocks .block-sprite',
      0,
      { backgroundPosition: '50% 0px' },
      '+=0.5'
    );
  } else {
    var blocksOverlay = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    blocksOverlay.to('.section-blocks .block-overlay', 0, { opacity: 0 });
    blocksOverlay.to(
      '.section-blocks .block-overlay',
      0,
      { opacity: 1 },
      '+=0.5'
    );
    blocksOverlay.to(
      '.section-blocks .block-overlay',
      0,
      { opacity: 0 },
      '+=0.5'
    );
  }
};

app.animationAstronaut = function() {
  var svg = document.querySelector(
    app.isMobile() ? '#astronaut-svg-sp' : '#astronaut-svg-pc'
  );
  var path = document.querySelector(
    app.isMobile() ? '#astronaut-path-sp' : '#astronaut-path-pc'
  );
  var moved = true;

  var mouse = svg.createSVGPoint();

  window.addEventListener('mousemove', onMove);
  gsap.ticker.add(update);
  update();

  gsap.set(path, {
    transformOrigin: 'center',
    xPercent: -50,
    yPercent: -50
  });

  function update() {
    if (!moved) return;
    moved = false;

    var { x, y } = mouse.matrixTransform(svg.getScreenCTM().inverse());

    gsap.to(path, {
      x,
      y,
      duration: 0.2
    });
  }

  function onMove(event) {
    moved = true;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
};

app.animationContract = function() {
  if (!app.isMobile()) {
    var contractOverlay = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    contractOverlay.to('.section-contract .contract-overlay', 0.5, {
      opacity: 1
    });
    contractOverlay.to(
      '.section-contract .contract-overlay',
      1,
      { opacity: 0 },
      '+=1.0'
    );

    var signal01 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal01.set('.section-contract .signal-01', {
      opacity: 0,
      top: 527,
      left: 1280
    });
    signal01.to('.section-contract .signal-01', 0, { opacity: 1 }, '+=0');
    signal01.to(
      '.section-contract .signal-01',
      0.55,
      { top: 547, left: 1830 },
      '+=0'
    );
    signal01.to('.section-contract .signal-01', 0, { opacity: 0 }, '+=0');

    var signal02 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal02.set('.section-contract .signal-02', {
      opacity: 0,
      top: 493,
      left: 1260
    });
    signal02.to('.section-contract .signal-02', 0, { opacity: 1 }, '+=0');
    signal02.to(
      '.section-contract .signal-02',
      0.5,
      { top: 398, left: 1780 },
      '+=0'
    );
    signal02.to('.section-contract .signal-02', 0, { opacity: 0 }, '+=0');

    var signal03 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal03.set('.section-contract .signal-03', {
      opacity: 0,
      top: 474,
      left: 1237
    });
    signal03.to('.section-contract .signal-03', 0, { opacity: 1 }, '+=0');
    signal03.to(
      '.section-contract .signal-03',
      0.4,
      { top: 297, left: 1669 },
      '+=0'
    );
    signal03.to('.section-contract .signal-03', 0, { opacity: 0 }, '+=0');

    var signal04 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal04.set('.section-contract .signal-04', {
      opacity: 0,
      top: 464,
      left: 1200
    });
    signal04.to('.section-contract .signal-04', 0, { opacity: 1 }, '+=0');
    signal04.to(
      '.section-contract .signal-04',
      0.6,
      { top: 234, left: 1527 },
      '+=0'
    );
    signal04.to('.section-contract .signal-04', 0, { opacity: 0 }, '+=0');

    var signal05 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal05.set('.section-contract .signal-05', {
      opacity: 0,
      top: 438,
      left: 1179
    });
    signal05.to('.section-contract .signal-05', 0, { opacity: 1 }, '+=0');
    signal05.to(
      '.section-contract .signal-05',
      0.4,
      { top: 193, left: 1379 },
      '+=0'
    );
    signal05.to('.section-contract .signal-05', 0, { opacity: 0 }, '+=0');

    var signal06 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal06.set('.section-contract .signal-06', {
      opacity: 0,
      top: 423,
      left: 1146
    });
    signal06.to('.section-contract .signal-06', 0, { opacity: 1 }, '+=0');
    signal06.to(
      '.section-contract .signal-06',
      0.35,
      { top: 173, left: 1210 },
      '+=0'
    );
    signal06.to('.section-contract .signal-06', 0, { opacity: 0 }, '+=0');

    var signal21 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal21.set('.section-contract .signal-21', {
      opacity: 0,
      top: 386,
      left: 340
    });
    signal21.to('.section-contract .signal-21', 0, { opacity: 1 }, '+=0');
    signal21.to(
      '.section-contract .signal-21',
      0.45,
      { top: 505, left: 900 },
      '+=0'
    );
    signal21.to('.section-contract .signal-21', 0, { opacity: 0 }, '+=0');

    var signal22 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal22.set('.section-contract .signal-22', {
      opacity: 0,
      top: 512,
      left: 300
    });
    signal22.to('.section-contract .signal-22', 0, { opacity: 1 }, '+=0');
    signal22.to(
      '.section-contract .signal-22',
      0.5,
      { top: 524, left: 880 },
      '+=0'
    );
    signal22.to('.section-contract .signal-22', 0, { opacity: 0 }, '+=0');

    var signal23 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal23.set('.section-contract .signal-23', {
      opacity: 0,
      top: 645,
      left: 330
    });
    signal23.to('.section-contract .signal-23', 0, { opacity: 1 }, '+=0');
    signal23.to(
      '.section-contract .signal-23',
      0.6,
      { top: 555, left: 890 },
      '+=0'
    );
    signal23.to('.section-contract .signal-23', 0, { opacity: 0 }, '+=0');

    var signal24 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal24.set('.section-contract .signal-24', {
      opacity: 0,
      top: 760,
      left: 442
    });
    signal24.to('.section-contract .signal-24', 0, { opacity: 1 }, '+=0');
    signal24.to(
      '.section-contract .signal-24',
      0.3,
      { top: 587, left: 902 },
      '+=0'
    );
    signal24.to('.section-contract .signal-24', 0, { opacity: 0 }, '+=0');

    var signal25 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal25.set('.section-contract .signal-25', {
      opacity: 0,
      top: 830,
      left: 600
    });
    signal25.to('.section-contract .signal-25', 0, { opacity: 1 }, '+=0');
    signal25.to(
      '.section-contract .signal-25',
      0.4,
      { top: 613, left: 954 },
      '+=0'
    );
    signal25.to('.section-contract .signal-25', 0, { opacity: 0 }, '+=0');

    var signal26 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal26.set('.section-contract .signal-26', {
      opacity: 0,
      top: 872,
      left: 773
    });
    signal26.to('.section-contract .signal-26', 0, { opacity: 1 }, '+=0');
    signal26.to(
      '.section-contract .signal-26',
      0.45,
      { top: 632, left: 993 },
      '+=0'
    );
    signal26.to('.section-contract .signal-26', 0, { opacity: 0 }, '+=0');

    var contractPaper = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    var contractPen = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    contractPaper.set('#contract-paper polygon', { opacity: 0 }, 0);
    contractPaper.set('#contract-paper path', { opacity: 0 }, 0);
    contractPen.set('.contract-paper .pen', { top: -60, left: -190 }, 0);
    $('#contract-paper')
      .find('polygon')
      .each(function(index) {
        contractPaper.to($(this), 5 / 40, { opacity: 1 }, (index * 5) / 40);
        contractPen.to(
          '.contract-paper .pen',
          5 / 40,
          {
            top:
              -60 + ($(this).offset().top - $('#contract-paper').offset().top),
            left:
              -190 +
              ($(this).offset().left - $('#contract-paper').offset().left)
          },
          (index * 5) / 40
        );
      });
    contractPaper.to('#contract-paper path', 5 / 40, { opacity: 1 }, 5);
    contractPen.to(
      '.contract-paper .pen',
      5 / 40,
      {
        top:
          -60 +
          ($('#contract-paper path').offset().top -
            $('#contract-paper').offset().top),
        left:
          -190 +
          ($('#contract-paper path').offset().left -
            $('#contract-paper').offset().left)
      },
      5
    );

    var light01 = new TimelineMax({ repeat: -1, repeatDelay: 5 });
    light01.set('.section-contract .light-01', {
      opacity: 0,
      top: 1310,
      left: 504
    });
    light01.to('.section-contract .light-01', 0.2, { opacity: 1 }, '+=0');
    light01.to(
      '.section-contract .light-01',
      0.8,
      { rotate: 120, opacity: 1, top: 2186, left: 504, ease: 'none' },
      '+=-.2'
    );
    light01.set('.section-contract .light-01', {
      rotate: 5,
      top: 2200,
      left: 534
    });
    light01.to(
      '.section-contract .light-01',
      0.3,
      { rotate: 5, top: 2087, left: 784, ease: 'none' },
      '+=0'
    );
    light01.to(
      '.section-contract .light-01',
      0,
      { opacity: 0, top: 2087, left: 784, ease: 'none' },
      '+=0'
    );
    light01.to(
      '.section-contract .light-01',
      0,
      { opacity: 0, top: 2029, left: 915, ease: 'none' },
      '+=0'
    );
    light01.to(
      '.section-contract .light-01',
      0.1,
      { opacity: 1, rotate: 5, top: 2029, left: 915, ease: 'none' },
      '+=.1'
    );
    light01.to('.section-contract .light-01', 0.2, { opacity: 0 }, '+=0');
  } else {
    var contractPaper = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    var contractPen = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    contractPaper.set('#contract-paper polygon', { opacity: 0 }, 0);
    contractPaper.set('#contract-paper path', { opacity: 0 }, 0);
    contractPen.set('.contract-paper .pen', { top: -10, left: -40 }, 0);
    contractPen.to('.contract-paper .pen', 5, { top: 20, left: -40 }, 0);
    $('#contract-paper')
      .find('polygon')
      .each(function(index) {
        contractPaper.to($(this), 5 / 40, { opacity: 1 }, (index * 5) / 40);
      });
    contractPaper.to('#contract-paper path', 5 / 40, { opacity: 1 }, 5);
    contractPen.to('.contract-paper .pen', 5 / 40, { opacity: 1 }, 5);

    var signal01 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal01.set('.section-contract .signal-01', {
      opacity: 0,
      top: '40%',
      left: '51%'
    });
    signal01.to('.section-contract .signal-01', 0, { opacity: 1 }, '+=0');
    signal01.to(
      '.section-contract .signal-01',
      0.55,
      { top: '11%', left: '83%' },
      '+=0'
    );
    signal01.to('.section-contract .signal-01', 0, { opacity: 0 }, '+=0');

    var signal02 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal02.set('.section-contract .signal-02', {
      opacity: 0,
      top: '36%',
      left: '51%'
    });
    signal02.to('.section-contract .signal-02', 0, { opacity: 1 }, '+=0');
    signal02.to(
      '.section-contract .signal-02',
      0.5,
      { top: '6%', left: '75%' },
      '+=0'
    );
    signal02.to('.section-contract .signal-02', 0, { opacity: 0 }, '+=0');

    var signal03 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal03.set('.section-contract .signal-03', {
      opacity: 0,
      top: '38%',
      left: '48%'
    });
    signal03.to('.section-contract .signal-03', 0, { opacity: 1 }, '+=0');
    signal03.to(
      '.section-contract .signal-03',
      0.4,
      { top: '2%', left: '65%' },
      '+=0'
    );
    signal03.to('.section-contract .signal-03', 0, { opacity: 0 }, '+=0');

    var signal04 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal04.set('.section-contract .signal-04', {
      opacity: 0,
      top: '30%',
      left: '46%'
    });
    signal04.to('.section-contract .signal-04', 0, { opacity: 1 }, '+=0');
    signal04.to(
      '.section-contract .signal-04',
      0.6,
      { top: '1%', left: '55%' },
      '+=0'
    );
    signal04.to('.section-contract .signal-04', 0, { opacity: 0 }, '+=0');

    var signal05 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal05.set('.section-contract .signal-05', {
      opacity: 0,
      top: '40%',
      left: '41%'
    });
    signal05.to('.section-contract .signal-05', 0, { opacity: 1 }, '+=0');
    signal05.to(
      '.section-contract .signal-05',
      0.4,
      { top: '3%', left: '44%' },
      '+=0'
    );
    signal05.to('.section-contract .signal-05', 0, { opacity: 0 }, '+=0');

    var signal06 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal06.set('.section-contract .signal-06', {
      opacity: 0,
      top: '30%',
      left: '35%'
    });
    signal06.to('.section-contract .signal-06', 0, { opacity: 1 }, '+=0');
    signal06.to(
      '.section-contract .signal-06',
      0.35,
      { top: '6%', left: '34%' },
      '+=0'
    );
    signal06.to('.section-contract .signal-06', 0, { opacity: 0 }, '+=0');

    var signal21 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal21.set('.section-contract .signal-21', {
      opacity: 0,
      top: '87%',
      left: '55%'
    });
    signal21.to('.section-contract .signal-21', 0, { opacity: 1 }, '+=0');
    signal21.to(
      '.section-contract .signal-21',
      0.45,
      { top: '52%', left: '43.5%' },
      '+=0'
    );
    signal21.to('.section-contract .signal-21', 0, { opacity: 0 }, '+=0');

    var signal22 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal22.set('.section-contract .signal-22', {
      opacity: 0,
      top: '86%',
      left: '43%'
    });
    signal22.to('.section-contract .signal-22', 0, { opacity: 1 }, '+=0');
    signal22.to(
      '.section-contract .signal-22',
      0.5,
      { top: '52%', left: '41%' },
      '+=0'
    );
    signal22.to('.section-contract .signal-22', 0, { opacity: 0 }, '+=0');

    var signal23 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal23.set('.section-contract .signal-23', {
      opacity: 0,
      top: '83%',
      left: '31%'
    });
    signal23.to('.section-contract .signal-23', 0, { opacity: 1 }, '+=0');
    signal23.to(
      '.section-contract .signal-23',
      0.6,
      { top: '51%', left: '38%' },
      '+=0'
    );
    signal23.to('.section-contract .signal-23', 0, { opacity: 0 }, '+=0');

    var signal24 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal24.set('.section-contract .signal-24', {
      opacity: 0,
      top: '78%',
      left: '21%'
    });
    signal24.to('.section-contract .signal-24', 0, { opacity: 1 }, '+=0');
    signal24.to(
      '.section-contract .signal-24',
      0.3,
      { top: '50%', left: '36%' },
      '+=0'
    );
    signal24.to('.section-contract .signal-24', 0, { opacity: 0 }, '+=0');

    var signal25 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal25.set('.section-contract .signal-25', {
      opacity: 0,
      top: '73%',
      left: '12%'
    });
    signal25.to('.section-contract .signal-25', 0, { opacity: 1 }, '+=0');
    signal25.to(
      '.section-contract .signal-25',
      0.4,
      { top: '49%', left: '34%' },
      '+=0'
    );
    signal25.to('.section-contract .signal-25', 0, { opacity: 0 }, '+=0');

    var signal26 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    signal26.set('.section-contract .signal-26', {
      opacity: 0,
      top: '68%',
      left: '5%'
    });
    signal26.to('.section-contract .signal-26', 0, { opacity: 1 }, '+=0');
    signal26.to(
      '.section-contract .signal-26',
      0.45,
      { top: '48%', left: '32%' },
      '+=0'
    );
    signal26.to('.section-contract .signal-26', 0, { opacity: 0 }, '+=0');
  }
};

app.animationRoadmap = function() {
  if (!app.isMobile()) {
    var beam01 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam01.set(
      '.section-roadmap .beam-01',
      { opacity: 0, top: -60, left: 1280 },
      0
    );
    beam01.to(
      '.section-roadmap .beam-01',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam01.to(
      '.section-roadmap .beam-01',
      0.45,
      { top: 490, left: 330, ease: Linear.easeNone },
      0
    );
    beam01.to('.section-roadmap .beam-01', 0.2, { opacity: 0 }, '-=0.2');

    var beam02 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam02.set(
      '.section-roadmap .beam-02',
      { opacity: 0, top: -30, left: 1620 },
      0
    );
    beam02.to(
      '.section-roadmap .beam-02',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam02.to(
      '.section-roadmap .beam-02',
      0.4,
      { top: 510, left: 680, ease: Linear.easeNone },
      0
    );
    beam02.to('.section-roadmap .beam-02', 0.2, { opacity: 0 }, '-=0.2');

    var beam03 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam03.set(
      '.section-roadmap .beam-03',
      { opacity: 0, top: 40, left: 2005 },
      0
    );
    beam03.to(
      '.section-roadmap .beam-03',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam03.to(
      '.section-roadmap .beam-03',
      0.8,
      { top: 950, left: 400, ease: Linear.easeNone },
      0
    );
    beam03.to('.section-roadmap .beam-03', 0.2, { opacity: 0 }, '-=0.2');

    var beam04 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam04.set(
      '.section-roadmap .beam-04',
      { opacity: 0, top: 60, left: 2160 },
      0
    );
    beam04.to(
      '.section-roadmap .beam-04',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam04.to(
      '.section-roadmap .beam-04',
      0.5,
      { top: 1090, left: 400, ease: Linear.easeNone },
      0
    );
    beam04.to('.section-roadmap .beam-04', 0.2, { opacity: 0 }, '-=0.2');

    var beam11 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam11.set(
      '.section-roadmap .beam-11',
      { opacity: 0, top: 205, left: 2130 },
      0
    );
    beam11.to(
      '.section-roadmap .beam-11',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam11.to(
      '.section-roadmap .beam-11',
      0.45,
      { top: 1210, left: 400, ease: Linear.easeNone },
      0
    );
    beam11.to('.section-roadmap .beam-11', 0.2, { opacity: 0 }, '-=0.2');

    var beam12 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam12.set(
      '.section-roadmap .beam-12',
      { opacity: 0, top: 665, left: 2240 },
      0
    );
    beam12.to(
      '.section-roadmap .beam-12',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam12.to(
      '.section-roadmap .beam-12',
      0.55,
      { top: 1210, left: 1300, ease: Linear.easeNone },
      0
    );
    beam12.to('.section-roadmap .beam-12', 0.2, { opacity: 0 }, '-=0.2');

    var beam13 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam13.set(
      '.section-roadmap .beam-13',
      { opacity: 0, top: 460, left: 2250 },
      0
    );
    beam13.to(
      '.section-roadmap .beam-13',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam13.to(
      '.section-roadmap .beam-13',
      0.65,
      { top: 1210, left: 950, ease: Linear.easeNone },
      0
    );
    beam13.to('.section-roadmap .beam-13', 0.2, { opacity: 0 }, '-=0.2');
  } else {
    var beam01 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam01.set(
      '.section-roadmap .beam-01',
      { opacity: 0, top: '-20%', left: '80%' },
      0
    );
    beam01.to(
      '.section-roadmap .beam-01',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam01.to(
      '.section-roadmap .beam-01',
      0.45,
      { top: '35%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam01.to('.section-roadmap .beam-01', 0.2, { opacity: 0 }, '-=0.2');

    var beam02 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam02.set(
      '.section-roadmap .beam-02',
      { opacity: 0, top: '-10%', left: '80%' },
      0
    );
    beam02.to(
      '.section-roadmap .beam-02',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam02.to(
      '.section-roadmap .beam-02',
      0.4,
      { top: '45%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam02.to('.section-roadmap .beam-02', 0.2, { opacity: 0 }, '-=0.2');

    var beam03 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam03.set(
      '.section-roadmap .beam-03',
      { opacity: 0, top: '-5%', left: '80%' },
      0
    );
    beam03.to(
      '.section-roadmap .beam-03',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam03.to(
      '.section-roadmap .beam-03',
      0.8,
      { top: '50%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam03.to('.section-roadmap .beam-03', 0.2, { opacity: 0 }, '-=0.2');

    var beam04 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam04.set(
      '.section-roadmap .beam-04',
      { opacity: 0, top: '15%', left: '80%' },
      0
    );
    beam04.to(
      '.section-roadmap .beam-04',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam04.to(
      '.section-roadmap .beam-04',
      0.5,
      { top: '70%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam04.to('.section-roadmap .beam-04', 0.2, { opacity: 0 }, '-=0.2');

    var beam11 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam11.set(
      '.section-roadmap .beam-11',
      { opacity: 0, top: '20%', left: '80%' },
      0
    );
    beam11.to(
      '.section-roadmap .beam-11',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam11.to(
      '.section-roadmap .beam-11',
      0.45,
      { top: '75%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam11.to('.section-roadmap .beam-11', 0.2, { opacity: 0 }, '-=0.2');

    var beam12 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam12.set(
      '.section-roadmap .beam-12',
      { opacity: 0, top: '35%', left: '80%' },
      0
    );
    beam12.to(
      '.section-roadmap .beam-12',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam12.to(
      '.section-roadmap .beam-12',
      0.55,
      { top: '90%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam12.to('.section-roadmap .beam-12', 0.2, { opacity: 0 }, '-=0.2');

    var beam13 = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    beam13.set(
      '.section-roadmap .beam-13',
      { opacity: 0, top: '50%', left: '80%' },
      0
    );
    beam13.to(
      '.section-roadmap .beam-13',
      0.2,
      { opacity: 1, ease: Linear.easeNone },
      0
    );
    beam13.to(
      '.section-roadmap .beam-13',
      0.65,
      { top: '105%', left: '-20%', ease: Linear.easeNone },
      0
    );
    beam13.to('.section-roadmap .beam-13', 0.2, { opacity: 0 }, '-=0.2');

    var roadmapOverlay = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    roadmapOverlay.to('.section-roadmap .roadmap-overlay', 0, { opacity: 0 });
    roadmapOverlay.to(
      '.section-roadmap .roadmap-overlay',
      0,
      { opacity: 1 },
      '+=0.5'
    );
    roadmapOverlay.to(
      '.section-roadmap .roadmap-overlay',
      0,
      { opacity: 0 },
      '+=0.5'
    );
  }

  if (!app.isMobile()) {
    var roadmapSprite = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    roadmapSprite.to('.section-roadmap .roadmap-sprite', 0, {
      backgroundPosition: '0 0px'
    });
    roadmapSprite.to(
      '.section-roadmap .roadmap-sprite',
      0,
      { backgroundPosition: '0 -310px' },
      '+=0.5'
    );
    roadmapSprite.to(
      '.section-roadmap .roadmap-sprite',
      0,
      { backgroundPosition: '0 0px' },
      '+=0.5'
    );
  }
};

app.roadmap = function() {
  var roadMapTL = new TimelineMax();

  if (!app.isMobile()) {
    roadMapTL.set('#point-1', { x: 410 });
    roadMapTL.set('#point-2', { x: 770 });
    roadMapTL.set('#point-3', { x: 970 });
    roadMapTL.set('#point-4', { x: 1330 });
  }

  var dragables = $('.point');
  Draggable.create('.point', {
    type: 'x',
    edgeResistance: 1,
    bounds: '.roadmap-timeline',
    inertia: false,
    onDrag: function() {
      var i = dragables.length;
      while (--i > -1) {
        if (this.hitTest(dragables[i], '20%')) {
          this.endDrag();
          roadMapTL.set(this.target, {
            x: this.endX + (this.deltaX > 0 ? -10 : +10)
          });
          if (this.hitTest(dragables[i], '20%')) {
            roadMapTL.set(this.target, {
              x: this.endX + (this.deltaX > 0 ? -80 : +80)
            });
          }
        }
      }
    }
  });
};

$(function() {
  app.init();
});
