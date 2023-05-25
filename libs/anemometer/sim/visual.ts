/// <reference path="../../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../../built/common-sim.d.ts"/>
/// <reference path="../../../libs/core/dal.d.ts"/>

namespace pxsim.visuals {
  // For the intructions
  export function mkAnemometer(xy: Coord = [0, 0]): SVGElAndSize {
    let [x, y] = xy;
    let l = x;
    let t = y;
    let w = ANEMOMETER_PART_WIDTH;
    let h = ANEMOMETER_PART_HEIGHT;
    let img = <SVGGElement>svg.elt("image");
    svg.hydrate(img, {
      class: "sim-ANEMOMETER",
      x: l,
      y: t,
      width: w,
      height: h,
      href: svg.toDataUri(ANEMOMETER_PART),
    });

    return { el: img, x: l, y: t, w: w, h: h };
  }

  export class AnemometerView implements IBoardPart<AnemometerState> {
    style: string;
    element: SVGElement;
    defs: SVGElement[];
    image: SVGSVGElement;

    private text_value: SVGTextElement;
    private handle: SVGGElement;
    private ruler: SVGRectElement;

    private part: SVGElAndSize;
    private bus: EventBus;

    private state: AnemometerState;

    private is_handle_selected: boolean = false;
    private last_y: number = 0;

    private interval: NodeJS.Timer;
    private rotation: number;

    constructor() {}

    public init(
      bus: EventBus,
      state: AnemometerState,
      svgEl: SVGSVGElement,
      otherParams: Map<string>
    ): void {
      this.state = state;
      this.bus = bus;

      this.state.setRPS(0);

      this.initDom();
      this.updateState();
    }

    initDom() {
      this.element = svg.elt("g");
      this.image = new DOMParser()
        .parseFromString(ANEMOMETER_PART, "image/svg+xml")
        .querySelector("svg") as SVGSVGElement;

      svg.hydrate(this.image, {
        class: "sim-ANEMOMETER",
        width: ANEMOMETER_PART_WIDTH,
        height: ANEMOMETER_PART_HEIGHT,
      });

      this.element.appendChild(this.image);

      this.text_value = this.image.getElementById("value") as SVGTextElement;
      this.handle = this.image.getElementById("handle") as SVGGElement;
      this.ruler = this.image.getElementById("ruler") as SVGRectElement;

      // Don't really know why, but the 'text-anchor' is removed during parse/hydrate...
      this.text_value.setAttribute("text-anchor", "middle");

      this.handle.addEventListener("mousedown", () => {
        this.is_handle_selected = true;
        this.last_y = 0;
      });

      document.addEventListener("mouseup", () => {
        this.is_handle_selected = false;
        this.last_y = 0;
      });

      document.addEventListener("mousemove", (event) => this.moveHandle(event));

      this.rotation = 30;
      this.interval = setInterval(() => {
        this.rotateCups((this.state.getRPS() * 360) / 60);
      }, 17);
    }

    private rotateCups(angle: number): void {
      let transform = this.element
        .querySelector("#cups")
        .getAttribute("transform");
      transform = transform.replace(
        `rotate(${this.rotation} 46.302 46.302)`,
        `rotate(${this.rotation + angle} 46.302 46.302)`
      );
      this.rotation = this.rotation + angle;
      this.element.querySelector("#cups").setAttribute("transform", transform);
    }

    public moveToCoord(xy: Coord) {
      translateEl(this.element, [0, 590]);
    }

    public updateTheme() {}

    public updateState() {
      this.text_value.innerHTML = this.state.getRPS().toString();
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.rotateCups((this.state.getRPS() * 360) / 60);
      }, 17);
    }

    public moveHandle(event: MouseEvent) {
      if (!this.is_handle_selected) {
        return;
      }
      let point: SVGPoint = this.image.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(this.image.getScreenCTM().inverse());
      let offset =
        point.y - this.ruler.y.baseVal.value - this.ruler.height.baseVal.value;
      offset = Math.max(-this.ruler.height.baseVal.value, Math.min(0, offset));
      this.handle.setAttribute("transform", `translate(0 ${offset})`);
      this.state.setRPS(
        Math.round(
          ((10 * (-1 * offset)) / this.ruler.height.baseVal.value) * 10
        ) / 10
      );
      this.updateState();
    }
  }

  const ANEMOMETER_PART_WIDTH = 350;
  const ANEMOMETER_PART_HEIGHT = 350;

  const ANEMOMETER_PART = `
  <svg width="350" height="350" viewBox="0 0 100 92.604" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg">
  <rect id="pinPlus" width="1" height="5" rx=".5" ry=".5" x="42.802" y="28.5" style="fill:red"/>
  <rect id="pinSignal" width="1" height="5" rx=".5" ry=".5" x="46.302" y="28.5" style="fill:#1248ef"/>
  <rect id="pinGround" width="1" height="5" rx=".5" ry=".5" x="49.802" y="28.5" style="fill:#000"/>
  <path id="pinHolder" style="fill:#b5b5b5;stroke:#000;stroke-width:.274743" d="M40.302 32h12v10h-12z"/>
  <text id="labelPlus" x="42.62" y="35" style="font-size:.15em;stroke-width:.281517;paint-order:stroke fill markers">+</text>
  <text id="labelSignal" x="46.05" y="35" style="font-size:.15em;stroke-width:.281517;paint-order:stroke fill markers">S</text>
  <text id="labelGround" x="49.95" y="35" style="font-size:.15em;stroke-width:.281517;paint-order:stroke fill markers">-</text>
  <g id="cups" transform="rotate(30 46.302 46.302)">
    <path style="fill:#1248ef;fill-opacity:1;stroke:#000;stroke-width:.25;stroke-dasharray:none;stroke-opacity:1" d="M10 44.802h35v3H10z" id="path11730"/>
    <path style="fill:#1248ef;stroke:#000;stroke-width:.328001;paint-order:stroke fill markers" id="path12278" d="M2.704 47.762a9 9 0 0 1 8.864-7.437 9 9 0 0 1 8.863 7.437z"/>
    <path style="fill:#1248ef;fill-opacity:1;stroke:#000;stroke-width:.25;stroke-dasharray:none;stroke-opacity:1" transform="rotate(120 46.302 46.302)" d="M10 44.802h35v3H10z" id="path11732"/>
    <path style="fill:#1248ef;stroke:#000;stroke-width:.328001;paint-order:stroke fill markers" d="M2.704 47.762a9 9 0 0 1 8.864-7.437 9 9 0 0 1 8.863 7.437z" transform="rotate(120 46.302 46.302)"/>
    <path style="fill:#1248ef;fill-opacity:1;stroke:#000;stroke-width:.25;stroke-dasharray:none;stroke-opacity:1" transform="rotate(240 46.302 46.302)" d="M10 44.802h35v3H10z" id="path11734"/>
    <path style="fill:#1248ef;stroke:#000;stroke-width:.328001;paint-order:stroke fill markers" d="M2.704 47.762a9 9 0 0 1 8.864-7.437 9 9 0 0 1 8.863 7.437z" transform="rotate(240 46.302 46.302)"/>
  </g>
  <circle r="10" cx="46.302" cy="46.302" style="fill:#1248ef;stroke:#000;stroke-width:.327868" id="circle11737"/>
  <circle r="2" cx="46.302" cy="46.302" style="fill:#6b8ef6;stroke:#000;stroke-width:.272727" id="circle11739"/>
  <rect x="40.052" y="49" width="12.5" height="5" rx="2.5" fill="#fff" fill-opacity=".5" style="stroke:#fff;stroke-width:.3"/>
  <text xml:space="preserve" style="font-size:.3em;line-height:1.25;font-family:&quot;DejaVu Sans Mono&quot;;-inkscape-font-specification:&quot;DejaVu Sans Mono&quot;;stroke-width:1.6854;user-select:none;alignment-baseline:middle;" x="46.302" y="52" id="value">XXX</text>
  <defs>
    <linearGradient xmlns="http://www.w3.org/2000/svg" id="rulerGradient" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#38b2ac"/>
      <stop offset="100%" stop-color="#1248ef"/>
    </linearGradient>
  </defs>
  <rect style="fill:url(#rulerGradient);fill-opacity:1;stroke:#000;stroke-width:.0974468;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="ruler" width="2" height="50" x="92" y="21.302" ry="1"/>
  <g id="handle">
    <circle style="fill:#636363;fill-opacity:1;stroke:#000;stroke-width:.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="path2812-5" cx="93" cy="70.302" r="2"/>
    <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0" width="2.5" height=".21" x="91.875" y="69.732" ry=".057" rx=".049"/>
    <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-5" width="2.5" height=".21" x="91.875" y="70.302" ry=".057" rx=".049"/>
    <rect style="fill:#fff;fill-opacity:1;stroke:none;stroke-width:.127221;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke" id="rect21476-0-9" width="2.5" height=".21" x="91.875" y="70.902" ry=".057" rx=".049"/>
  </g>
</svg>
`;
}
