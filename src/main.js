import {
  Application,
  Container,
  Graphics,
  Text,
  HTMLText,
  Assets,
  Sprite,
  BlurFilter,
} from "pixi.js";
import {
  FancyButton,
  Button,
  Slider,
  Input,
  ScrollBox,
  ProgressBar,
  ButtonContainer,
} from "@pixi/ui";
import {
  GlowFilter,
  DropShadowFilter,
  BackdropBlurFilter,
  GodrayFilter,
  AsciiFilter,
  ShockwaveFilter,
} from "pixi-filters";
import gsap from "gsap";

let colorMap = {
  background: "#0B0F19",
  secondBG: "#151C2C",
  thirdBG: "#252f45",
  primaryColor: "#8B9FFF",
  secondColor: "#B8F28B",
  textColor: "#F4F7FF",
};

function createRect(x, y, w, h, radius, color) {
  const rect = new Graphics().roundRect(0, 0, w, h, radius).fill(color);

  rect.position.set(x, y);

  return rect;
}

async function main() {
  const app = new Application();

  await app.init({
    resizeTo: document.getElementById("app"),
    background: colorMap.background,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    hello: true,
  });

  document.querySelector("#app").appendChild(app.canvas);

  const navBar = createRect(
    20,
    window.innerHeight - 80,
    app.canvas.offsetWidth - 40,
    60,
    15,
    colorMap.thirdBG,
  );

  const navBar_Selected = new Graphics();

  navBar_Selected.moveTo(15, 15);
  navBar_Selected.lineTo(75, 15);
  navBar_Selected.lineTo(75, 45);
  navBar_Selected.lineTo(15, 45);
  navBar_Selected.closePath();
  navBar_Selected.fill(colorMap.background);

  const selected_positions = {
    l: 15,
    r: 75,
  };

  function update_Selected() {
    navBar_Selected.clear();

    navBar_Selected.moveTo(selected_positions.l, 10);
    navBar_Selected.lineTo(selected_positions.r, 10);
    navBar_Selected.lineTo(selected_positions.r, 50);
    navBar_Selected.lineTo(selected_positions.l, 50);
    navBar_Selected.closePath();
    navBar_Selected.fill(colorMap.primaryColor);
  }

  navBar_Selected.filters = [
    new BlurFilter({
      strength: 20,
      quality: 10,
      legacy: true,
    }),
  ];

  navBar.addChild(navBar_Selected);

  window.addEventListener("resize", () => {
    setTimeout(() => {
      navBar.position.set(20, app.canvas.offsetHeight - 80);

      navBar
        .clear()
        .roundRect(0, 0, app.canvas.offsetWidth - 40, 60, 15)
        .fill(colorMap.thirdBG);
    }, 50);
  });

  app.stage.addChild(navBar);

  const f = new GlowFilter({
    color: "#ffffff",
    distance: 15,
    innerStrength: 1,
    outerStrength: 2,
  });

  //navBar.filters = [f];

  const nBStartpage = {
    container: new ButtonContainer(
      new Graphics().rect(-45, -30, navBar.width / 4, 60).fill("#00000000"),
    ),
    sprite: new Sprite(await Assets.load("/images/today.png")),
    text: new Text({
      text: "start",
      style: {
        fill: colorMap.textColor,
        fontSize: 13,
        fontFamily: "Arial",
      },
      anchor: 0.5,
    }),
  };

  nBStartpage.sprite.anchor.set(0.5);
  nBStartpage.sprite.scale.set(0.5);
  nBStartpage.sprite.position.y = -12;

  nBStartpage.text.position.y = 14;

  nBStartpage.container.addChild(nBStartpage.sprite, nBStartpage.text);

  nBStartpage.container.position.set(navBar.width / 8, 30);

  navBar.addChild(nBStartpage.container);

  nBStartpage.container.onUp.connect(() => {
    changePage(0);
    if (selected_positions.r - 30 < nBStartpage.container.position.x) {
      gsap.to(selected_positions, {
        r: nBStartpage.container.position.x + 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          l: nBStartpage.container.position.x - 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    } else if (selected_positions.r - 30 > nBStartpage.container.position.x) {
      gsap.to(selected_positions, {
        l: nBStartpage.container.position.x - 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          r: nBStartpage.container.position.x + 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    }
  });

  const nBCalendar = {
    container: new ButtonContainer(
      new Graphics().rect(-45, -30, navBar.width / 4, 60).fill("#00000000"),
    ),
    sprite: new Sprite(await Assets.load("/images/calendar.png")),
    text: new Text({
      text: "kalender",
      style: {
        fill: colorMap.textColor,
        fontSize: 13,
        fontFamily: "Arial",
      },
      anchor: 0.5,
    }),
  };

  nBCalendar.sprite.anchor.set(0.5);
  nBCalendar.sprite.scale.set(0.5);
  nBCalendar.sprite.position.y = -12;

  nBCalendar.text.position.y = 14;

  nBCalendar.container.addChild(nBCalendar.sprite, nBCalendar.text);

  nBCalendar.container.position.set(navBar.width / 8 + navBar.width / 4, 30);

  navBar.addChild(nBCalendar.container);

  nBCalendar.container.onDown.connect(() => {});

  nBCalendar.container.onUp.connect(() => {
    changePage(1);
    if (selected_positions.r - 30 < nBCalendar.container.position.x) {
      gsap.to(selected_positions, {
        r: nBCalendar.container.position.x + 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          l: nBCalendar.container.position.x - 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    } else if (selected_positions.r - 30 > nBCalendar.container.position.x) {
      gsap.to(selected_positions, {
        l: nBCalendar.container.position.x - 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          r: nBCalendar.container.position.x + 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    }
  });

  const nBNotes = {
    container: new ButtonContainer(
      new Graphics().rect(-45, -30, navBar.width / 4, 60).fill("#00000000"),
    ),
    sprite: new Sprite(await Assets.load("/images/notes.png")),
    text: new Text({
      text: "notizen",
      style: {
        fill: colorMap.textColor,
        fontSize: 13,
        fontFamily: "Arial",
      },
      anchor: 0.5,
    }),
  };

  nBNotes.sprite.anchor.set(0.5);
  nBNotes.sprite.scale.set(0.5);
  nBNotes.sprite.position.y = -12;

  nBNotes.text.position.y = 14;

  nBNotes.container.addChild(nBNotes.sprite, nBNotes.text);

  nBNotes.container.position.set(navBar.width / 8 + navBar.width / 2, 30);

  navBar.addChild(nBNotes.container);

  nBNotes.container.onUp.connect(() => {
    changePage(2);
    if (selected_positions.r - 30 < nBNotes.container.position.x) {
      gsap.to(selected_positions, {
        r: nBNotes.container.position.x + 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          l: nBNotes.container.position.x - 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    } else if (selected_positions.r - 30 > nBNotes.container.position.x) {
      gsap.to(selected_positions, {
        l: nBNotes.container.position.x - 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          r: nBNotes.container.position.x + 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    }
  });

  const nBReminder = {
    container: new ButtonContainer(
      new Graphics().rect(-45, -30, navBar.width / 4, 60).fill("#00000000"),
    ),
    sprite: new Sprite(await Assets.load("/images/reminder.png")),
    text: new Text({
      text: "erinnerungen",
      style: {
        fill: colorMap.textColor,
        fontSize: 13,
        fontFamily: "Arial",
      },
      anchor: 0.5,
    }),
  };

  nBReminder.sprite.anchor.set(0.5);
  nBReminder.sprite.scale.set(0.5);
  nBReminder.sprite.position.y = -12;

  nBReminder.text.position.y = 14;

  nBReminder.container.addChild(nBReminder.sprite, nBReminder.text);

  nBReminder.container.position.set(navBar.width - navBar.width / 8, 30);

  navBar.addChild(nBReminder.container);

  nBReminder.container.onUp.connect(() => {
    changePage(3);
    if (selected_positions.r - 30 < nBReminder.container.position.x) {
      gsap.to(selected_positions, {
        r: nBReminder.container.position.x + 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          l: nBReminder.container.position.x - 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    } else if (selected_positions.r - 30 > nBReminder.container.position.x) {
      gsap.to(selected_positions, {
        l: nBReminder.container.position.x - 30,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setTimeout(() => {
        gsap.to(selected_positions, {
          r: nBReminder.container.position.x + 30,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }, 100);
    }
  });

  selected_positions.l = navBar.width / 8 - 30;
  selected_positions.r = navBar.width / 8 + 30;

  let activeTab = "startpage";

  function changeTab(tabName) {
    if (tabName == activeTab) return;
  }

  let activePage = 0;

  const pages = [
    new Container(),
    new Container(),
    new Container(),
    new Container(),
  ];

  const stext = new Text({
    text: "startseite",
    style: {
      fontSize: 24,
      fill: "#ffffff",
      fontFamily: "Arial",
    },
  });

  const ctext = new Text({
    text: "kalender",
    style: {
      fontSize: 24,
      fill: "#ffffff",
      fontFamily: "Arial",
    },
  });

  const ntext = new Text({
    text: "notizen",
    style: {
      fontSize: 24,
      fill: "#ffffff",
      fontFamily: "Arial",
    },
  });

  const rtext = new Text({
    text: "erinnerungen",
    style: {
      fontSize: 24,
      fill: "#ffffff",
      fontFamily: "Arial",
    },
  });

  pages[0].addChild(stext);
  pages[1].addChild(ctext);
  pages[2].addChild(ntext);
  pages[3].addChild(rtext);

  pages.forEach((page) => {
    page.visible = false;
    app.stage.addChild(page);
  });
  pages[activePage].visible = true;

  function changePage(page) {
    pages[activePage].visible = false;
    pages[page].visible = true;
    activePage = page;
  }

  //update
  let last_pos = { ...selected_positions };
  app.ticker.add((ticker) => {
    if (last_pos !== selected_positions) {
      update_Selected();
    }
    last_pos = { ...selected_positions };
  });
}

main().catch(console.error);
