namespace pxsim.visuals {     
  // For the intructions
  export function mkphmeter(xy: Coord = [0, 0]): SVGElAndSize {
      let [x, y] = xy;
      let l = x;
      let t = y;
      let w = PHMETER_PART_WIDTH;
      let h = PHMETER_PART_HEIGHT;
      let img = <SVGGElement>svg.elt("image");
      svg.hydrate(img, {
          class: "sim-phmeter", x: l, y: t, width: w, height: h,
          href: svg.toDataUri(PHMETER_PART)
      });
      return { el: img, x: l, y: t, w: w, h: h };
  }

  export class phmeterView implements IBoardPart<PhmeterState> {
    style: string;
    element: SVGElement;
    defs: SVGElement[];
    image: SVGSVGElement;

    private part: SVGElAndSize;
    private bus: EventBus;

    private state: PhmeterState;
   
    private interval_btn : NodeJS.Timer;
    private interval_counter : number;

    static readonly INTERVAL_MS : number = 125;
    static readonly STEP_VALUE : number = 1;

    constructor() {
    }

    public init(bus: EventBus, state: PhmeterState, svgEl: SVGSVGElement, otherParams: Map<string>): void {
      this.state = state ;
      this.bus = bus;
       
       this.state.ph = 7; 

       this.initDom();
       this.updateState();
    }

    initDom() {
       this.element = svg.elt("g");
       this.image = new DOMParser().parseFromString(PHMETER_PART, "image/svg+xml").querySelector("svg") as SVGSVGElement;
       svg.hydrate(this.image, {
             class: "sim-phmeter", width: PHMETER_PART_WIDTH, height: PHMETER_PART_HEIGHT,
       });

       this.element.appendChild(this.image);

       let minus_btn = this.image.getElementById("minus");
       let plus_btn = this.image.getElementById("plus");

       minus_btn.addEventListener("mousedown", () => {
          this.interval_btn = setInterval(() => {
             this.intervalSetValue(-phmeterView.STEP_VALUE)
          }, phmeterView.INTERVAL_MS);

          this.safeAddValue(-phmeterView.STEP_VALUE);
          this.interval_counter = 0;
          this.updateState();
       });

       minus_btn.addEventListener("mouseup", () => {
          clearInterval(this.interval_btn);
       });

       minus_btn.addEventListener("mouseleave", () => {
          clearInterval(this.interval_btn);
       });


       plus_btn.addEventListener("mousedown", () => {
          this.interval_btn = setInterval(() => {
             this.intervalSetValue(phmeterView.STEP_VALUE)
          }, phmeterView.INTERVAL_MS);

          this.safeAddValue(phmeterView.STEP_VALUE);
          this.interval_counter = 0;
          this.updateState();
       });

       plus_btn.addEventListener("mouseup", () => {
          clearInterval(this.interval_btn);
       });

       plus_btn.addEventListener("mouseleave", () => {
          clearInterval(this.interval_btn);
       });

    }

    public moveToCoord(xy: Coord) {
       translateEl(this.element, [xy[0], xy[1]]);
    }

    public updateTheme() {
    }

    public updateState() {
      const tspanElement = document.querySelector('#tspan1');
      if (tspanElement) {
         // Update the text content of the <tspan> element
         tspanElement.textContent = this.state.ph.toString(10);
     }
    }

    private safeAddValue(amount: number){
       this.state.ph = Math.min(14, Math.max(0, this.state.ph + amount) );
    }

    private intervalSetValue(amount: number){
       this.interval_counter += 1;

       this.safeAddValue(amount);

       if( this.interval_counter > (1000 / phmeterView.INTERVAL_MS) ){
          this.safeAddValue(amount);
       }

       if( this.interval_counter > (2000 / phmeterView.INTERVAL_MS) ){
          this.safeAddValue(amount);
       }

       this.updateState();
    }
  }

  const PHMETER_PART_WIDTH = 146.517;   //97.678×1.5
  const PHMETER_PART_HEIGHT = 214.263; //142.842×1,5

  const PHMETER_PART = `
  <svg width="369.177" height="539.874" viewBox="0 0 97.678 142.842" version="1.1" id="svg1" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <defs id="defs1">
    <path id="rect10" d="M160.855 360.567h116.67v125.286h-116.67z"/>
  </defs>
  <g id="layer1">
    <path style="display:inline;opacity:1;fill:#cff;fill-opacity:1;stroke-width:.13429" d="m48.81 86.54 11.656-.103.217 24.756-.965.009.009 1.029-.997.009.01 1.147-1.637.014.01 1.08-4.58.04-.01-1.096-1.923.017-.01-1.06-.814.007-.01-1.045-.74.007-.218-24.81z" id="path1" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#1db5be;fill-opacity:1;stroke-width:.13429" d="m51.863 86.427 2.19-.041-.453-52.504-2.097.041z" id="path5" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#1db5be;fill-opacity:1;stroke-width:.13429" d="m55.81 86.344 2.153-.006-.474-52.445-1.943-.019z" id="path6" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#04efff;fill-opacity:1;stroke-width:.13429" d="m54.15 86.335 1.57-.023-.191-52.476-1.94.014z" id="path7" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#000;fill-opacity:1;stroke-width:.13429" d="m47.86 31.672.03 2.379 13.585-.203-.011-2.312z" id="path8" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#04efff;fill-opacity:1;stroke-width:.13429" d="M53.439 12.67h1.933l.127 18.864h-1.904z" id="path11" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#1db5be;fill-opacity:1;stroke-width:.13429" d="m55.375 12.582.9-.019.008.296.38-.01v.192l.243.02-.005.243.214-.033-.022.3.258.04-.042.72.219.006-.016 17.158-1.975.016z" id="path10" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#1db5be;fill-opacity:1;stroke-width:.13429" d="m53.412 12.656-.788.009-.002.23-.326.003v.175l-.196.02-.017.229-.193-.029.022.18-.21-.024-.01.334-.255-.01.063 17.774 2.08-.029z" id="path9" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#cff;fill-opacity:1;stroke-width:.13429" d="m51.353 31.556-3.435.006.269-24.33 13.337-.081-.132 24.273-3.721.054-.05-17.087-.012-.132-.224.007-.011-.653-.22-.008.003-.344-.218-.003.007-.238-.27.012.013-.216-.345-.029-.01-.285-3.663.043.019.26-.467.006.003.253-.201-.01.01.243-.217-.006.016.21-.233-.009.002.294-.227.006z" id="path12" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.289216" d="m117.066 138.656-22.811.016-.096-12.732-3.764.084.296-25.078 30.51.015-.245 24.707-3.763-.037z" id="path14" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#00f;fill-opacity:1;stroke-width:.33508" d="m88.29 123.1-9.003-.115.006-19.744 9.13-.09z" id="path16" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" d="m84.899 99.052-3.88.115.006 3.727 4.018-.162z" id="path17" transform="translate(-47.633 -5.604)"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect17" transform="rotate(-90 -26.618 21.015)" d="M-83.505 87.152h1.317v3.356h-1.317z"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect18" transform="rotate(-90 -26.618 21.015)" d="M-83.072 118.033h1.473v2.932h-1.473z"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect19" transform="rotate(-90 -26.618 21.015)" d="M-102.47 131.042h4.097v5.512h-4.097z"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect20" transform="rotate(-90 -26.618 21.015)" d="M-124.027 130.716h3.963v5.913h-3.963z"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect21" transform="rotate(-90 -26.618 21.015)" d="M-50.103 118.028h1.501v3.227h-1.501z"/>
    <path style="display:inline;opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect22" transform="rotate(-90 -26.618 21.015)" d="M-49.947 88.107h1.561v3.065h-1.561z"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.33508" id="rect156" transform="rotate(-90 -26.618 21.015)" d="M-134.409 75.706H-5.604v63.317h-128.805z"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.33508" id="rect157" transform="rotate(-90 -26.618 21.015)" d="M-123.613 66.665h107.76v18.046h-107.76z"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.33508" id="rect158" transform="rotate(-90 -26.618 21.015)" d="M-124.506 137.196h111.923v7.873h-111.923z"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.377459" id="path158" d="M-112.2 75.17a11.091 8.45 0 0 1-11.036 8.449 11.091 8.45 0 0 1-11.147-8.365 11.091 8.45 0 0 1 10.925-8.534A11.091 8.45 0 0 1-112.203 75" transform="rotate(-90 -26.618 21.015)"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.310964" id="path158-2" d="M-112.853 139.303a10.764 5.91 0 0 1-10.71 5.91 10.764 5.91 0 0 1-10.817-5.851 10.764 5.91 0 0 1 10.602-5.968 10.764 5.91 0 0 1 10.923 5.791" transform="rotate(-90 -26.618 21.015)"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.375509" id="path158-3" d="M-5.66 75.076a11.091 8.363 0 0 1-11.036 8.362 11.091 8.363 0 0 1-11.147-8.279 11.091 8.363 0 0 1 10.925-8.445A11.091 8.363 0 0 1-5.662 74.91" transform="rotate(-90 -26.618 21.015)"/>
    <path style="display:inline;opacity:1;fill:#1a1a1a;fill-opacity:1;stroke-width:.33433" id="path158-3-2" d="M-5.63 137.584a9.514 7.728 0 0 1-9.467 7.727 9.514 7.728 0 0 1-9.561-7.65 9.514 7.728 0 0 1 9.37-7.805 9.514 7.728 0 0 1 9.656 7.573" transform="rotate(-90 -26.618 21.015)"/>
    <path style="display:inline;opacity:1;fill:#000;fill-opacity:1;stroke-width:.13429" id="rect24" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M47.852-33.843h13.482v2.377H47.852z"/>
    <path style="display:inline;opacity:1;fill:#aad6d6;fill-opacity:1;stroke-width:.13429" id="rect25" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M47.633-31.44h13.845v24.379H47.633z"/>
    <path style="display:inline;opacity:1;fill:#0ff;fill-opacity:1;stroke-width:.13429" id="rect26" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M53.533-31.423h2.166v18.961h-2.166z"/>
    <path style="display:inline;opacity:1;fill:teal;fill-opacity:1;stroke-width:.13429" id="rect27" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M51.351-31.448h2.374v18.951h-2.374z"/>
    <path style="opacity:1;fill:teal;fill-opacity:1;stroke-width:.13429" id="rect28" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M55.519-31.521h2.054v19.019h-2.054z"/>
    <path style="display:inline;opacity:1;fill:#000;fill-opacity:1;stroke-width:.13429" id="rect30" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M54.388-121.928h1.431v4.49h-1.431z"/>
    <path style="display:inline;opacity:1;fill:#000;fill-opacity:1;stroke-width:.13429" id="rect29" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M53.885-117.991h2.641v6.074h-2.641z"/>
    <path style="opacity:1;fill:#000;fill-opacity:1;stroke-width:.112999" id="rect32" transform="translate(-47.633 -5.604)" d="M54.463 55.069h1.409v92.025h-1.409z"/>
    <path style="opacity:1;fill:#000;fill-opacity:1;stroke-width:.254532" id="rect33" transform="translate(-47.633 -5.604)" d="M54.457 146.451h38.837v.992H54.457z"/>
    <path style="opacity:1;fill:#000;fill-opacity:1;stroke-width:.258341" id="rect34" transform="translate(-47.633 -5.604)" d="M93.236 146.059h11.02v1.697h-11.02z"/>
    <path style="opacity:1;fill:#000;fill-opacity:1;stroke-width:.0920282" id="rect35" transform="rotate(-90 -26.618 21.015)" d="M-148.445 103.734h2.896v3.425h-2.896z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.0816042" id="rect36" transform="rotate(-90 -26.618 21.015)" d="M-145.559 102.656h2.176v5.643h-2.176z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.130873" id="rect37" transform="rotate(-90 -26.618 21.015)" d="M-143.969 101.891h2.172v7.554h-2.172z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.0938157" id="rect38" transform="rotate(-90 -26.618 21.015)" d="M-141.832 102.837h.774v5.42h-.774z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.10903" id="rect41" transform="rotate(-90 -26.618 21.015)" d="M-141.582 102.2h7.66v6.526h-7.66z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.157908" id="rect42" transform="rotate(-90 -26.618 21.015)" d="M-138.067 94.178h3.881v23.029h-3.881z"/>
    <path style="display:inline;opacity:1;fill:#0ff;fill-opacity:1;stroke-width:.326626" id="rect23-6-2" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M53.349-86.591h2.669v53.02h-2.669z"/>
    <path style="display:inline;opacity:1;fill:teal;fill-opacity:1;stroke-width:.286522" id="rect23-6" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M55.746-86.598h2.062v52.82h-2.062z"/>
    <path style="display:inline;opacity:1;fill:teal;fill-opacity:1;stroke-width:.286522" id="rect23" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M51.525-86.627h2.062v52.82h-2.062z"/>
    <path style="opacity:1;fill:#a9ffff;fill-opacity:1;stroke-width:.13429" id="rect69" transform="matrix(1 0 0 -1 -47.633 -5.604)" d="M49.013-114.604h11.459v28.171H49.013z"/>
    <path style="opacity:1;fill:navy;fill-opacity:1;stroke-width:.33508" id="rect70" transform="rotate(-90 -26.618 21.015)" d="M-122.915 79.275h20.731v8.942h-20.731z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect71" transform="rotate(-90 -26.618 21.015)" d="M-102.175 80.857h3.282v3.714h-3.282z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect72" transform="rotate(-90 -26.618 21.015)" d="M-123.916 130.873h4.21v5.507h-4.21z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect73" transform="rotate(-90 -26.618 21.015)" d="M-102.525 130.712h4.355v5.7h-4.355z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect74" transform="rotate(-90 -26.618 21.015)" d="M-82.958 117.86h1.466v3.245h-1.466z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect75" transform="rotate(-90 -26.618 21.015)" d="M-49.991 117.93h1.403v2.856h-1.403z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect76" transform="rotate(-90 -26.618 21.015)" d="M-83.562 87.208h1.362v2.888h-1.362z"/>
    <path style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="rect77" transform="rotate(-90 -26.618 21.015)" d="M-50.11 88.038h1.599v2.993h-1.599z"/>
    <path style="opacity:1;fill:#0f0;fill-opacity:1;stroke-width:.33508" id="rect78" transform="rotate(-90 -26.618 21.015)" d="M-49.933 75.466h2.421v1.518h-2.421z"/>
    <ellipse style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="path78" cx="-15.261" cy="77.922" rx="5.036" ry="4.912" transform="rotate(-90 -26.618 21.015)"/>
    <ellipse style="opacity:1;fill:#fc0;fill-opacity:1;stroke-width:.33508" id="path79" cx="-16.011" cy="133.756" rx="5.006" ry="5.046" transform="rotate(-90 -26.618 21.015)"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="path80" d="M-12.603 77.993a2.542 2.448 0 0 1-2.53 2.448 2.542 2.448 0 0 1-2.554-2.424 2.542 2.448 0 0 1 2.504-2.472 2.542 2.448 0 0 1 2.58 2.399" transform="rotate(-90 -26.618 21.015)"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="path81" d="M-13.434 133.604a2.29 2.373 0 0 1-2.278 2.373 2.29 2.373 0 0 1-2.3-2.35 2.29 2.373 0 0 1 2.254-2.395 2.29 2.373 0 0 1 2.323 2.325" transform="rotate(-90 -26.618 21.015)"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect81" transform="rotate(-90 -26.618 21.015)" d="M-41.707 75.067h4.878v2.204h-4.878z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect82" transform="rotate(-90 -26.618 21.015)" d="M-55.602 86.849h1.917v4.026h-1.917z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect83" transform="rotate(-90 -26.618 21.015)" d="M-57.114 99.937h4.059v1.65h-4.059z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect84" transform="rotate(-90 -26.618 21.015)" d="M-77.921 86.909h2.015v4.009h-2.015z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect85" transform="rotate(-90 -26.618 21.015)" d="M-85.051 99.756h3.76v1.826h-3.76z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect86" transform="rotate(-90 -26.618 21.015)" d="M-77.715 116.825h1.885v4.255h-1.885z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect87" transform="rotate(-90 -26.618 21.015)" d="M-55.52 116.805h1.849v4.18h-1.849z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect88" transform="rotate(-90 -26.618 21.015)" d="M-108.755 129.589h2.578v1.357h-2.578z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect89" transform="rotate(-90 -26.618 21.015)" d="M-108.474 131.555h2.401v1.236h-2.401z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect90" transform="rotate(-90 -26.618 21.015)" d="M-108.471 133.439h2.435v.983h-2.435z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect91" transform="rotate(-90 -26.618 21.015)" d="M-108.564 135.116h2.32v1.096h-2.32z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect92" transform="rotate(-90 -26.618 21.015)" d="M-116.313 129.721h2.134v1.02h-2.134z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect93" transform="rotate(-90 -26.618 21.015)" d="M-116.514 131.593h2.522v.973h-2.522z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect94" transform="rotate(-90 -26.618 21.015)" d="M-116.383 133.442h2.287v.962h-2.287z"/>
    <path style="opacity:1;fill:#fff;fill-opacity:1;stroke-width:.33508" id="rect95" transform="rotate(-90 -26.618 21.015)" d="M-116.353 135.506h2.611v.818h-2.611z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect96" transform="rotate(-90 -26.618 21.015)" d="M-114.596 128.968h6.39v8.454h-6.39z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect97" transform="rotate(-90 -26.618 21.015)" d="M-71.303 114.372h2.426v1.281h-2.426z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect98" transform="rotate(-90 -26.618 21.015)" d="M-71.313 116.265h2.49v1.157h-2.49z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect99" transform="rotate(-90 -26.618 21.015)" d="M-71.238 118.174h2.408v1.083h-2.408z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect100" transform="rotate(-90 -26.618 21.015)" d="M-71.182 120.152h2.233v1.084h-2.233z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect101" transform="rotate(-90 -26.618 21.015)" d="M-63.573 114.534h2.424v1.105h-2.424z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect102" transform="rotate(-90 -26.618 21.015)" d="M-63.408 116.342h2.316v.979h-2.316z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect103" transform="rotate(-90 -26.618 21.015)" d="M-63.476 118.149h2.483v1.125h-2.483z"/>
    <path style="opacity:1;fill:#ececec;fill-opacity:1;stroke-width:.33508" id="rect104" transform="rotate(-90 -26.618 21.015)" d="M-63.358 119.887h2.469v1.22h-2.469z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect105" transform="rotate(-90 -26.618 21.015)" d="M-69.098 113.782h5.994v8.451h-5.994z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect106" transform="rotate(-90 -26.618 21.015)" d="M-72.781 107.535h5.571v2.094h-5.571z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect107" transform="rotate(-90 -26.618 21.015)" d="M-58.175 107.642h5.043v1.851h-5.043z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect108" transform="rotate(-90 -26.618 21.015)" d="M-85.466 107.386h5.005v1.789h-5.005z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect109" transform="rotate(-90 -26.618 21.015)" d="M-71.746 99.757h5.432v2.092h-5.432z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect110" transform="rotate(-90 -26.618 21.015)" d="M-43.457 99.891h5.042v2.102h-5.042z"/>
    <path style="opacity:1;fill:#999;fill-opacity:1;stroke-width:.33508" id="rect111" transform="rotate(-90 -26.618 21.015)" d="M-43.485 107.26h5.352v2.43h-5.352z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect112" transform="rotate(-90 -26.618 21.015)" d="M-71.405 84.787h2.664v1.061h-2.664z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect113" transform="rotate(-90 -26.618 21.015)" d="M-71.258 86.709h2.681v.931h-2.681z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect114" transform="rotate(-90 -26.618 21.015)" d="M-71.297 88.64h2.744v.959h-2.744z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect115" transform="rotate(-90 -26.618 21.015)" d="M-71.264 90.352h2.536v1.094h-2.536z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect116" transform="rotate(-90 -26.618 21.015)" d="M-64.242 84.884h3.117v1.146h-3.117z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect117" transform="rotate(-90 -26.618 21.015)" d="M-63.718 86.812h2.708v1.013h-2.708z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect118" transform="rotate(-90 -26.618 21.015)" d="M-63.703 88.658h2.717v1.072h-2.717z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect119" transform="rotate(-90 -26.618 21.015)" d="M-63.491 90.452h2.445v1.137h-2.445z"/>
    <path style="opacity:1;fill:gray;fill-opacity:1;stroke-width:.33508" id="rect120" transform="rotate(-90 -26.618 21.015)" d="M-69.414 84.076h6.467v8.239h-6.467z"/>
    <path style="opacity:1;fill:#ccc;fill-opacity:1;stroke-width:.33508" id="rect146" transform="rotate(-90 -26.618 21.015)" d="M-80.328 130.403h9.878v11.224h-9.878z"/>
    <path style="opacity:1;fill:#ccc;fill-opacity:1;stroke-width:.33508" id="rect147" transform="rotate(-90 -26.618 21.015)" d="M-21.971 90.543h8.981v7.291h-8.981z"/>
    <path style="opacity:1;fill:#ccc;fill-opacity:1;stroke-width:.33508" id="rect148" transform="rotate(-90 -26.618 21.015)" d="M-21.403 102.813h4.424v1.451h-4.424z"/>
    <path style="opacity:1;fill:#ccc;fill-opacity:1;stroke-width:.33508" id="rect149" transform="rotate(-90 -26.618 21.015)" d="M-21.226 106.421h4.487v1.385h-4.487z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect150" transform="rotate(-90 -26.618 21.015)" d="M-20.977 109.986h4.131v1.516h-4.131z"/>
    <path style="opacity:1;fill:#fea;fill-opacity:1;stroke-width:.33508" id="rect151" transform="rotate(-90 -26.618 21.015)" d="M-17.462 99.296h11.747v16.014h-11.747z"/>
    <path style="opacity:1;fill:#fea;fill-opacity:1;stroke-width:.33508" id="rect152" transform="rotate(-90 -26.618 21.015)" d="M-20.247 99.322h4.178v1.795h-4.178z"/>
    <path style="opacity:1;fill:#fea;fill-opacity:1;stroke-width:.33508" id="rect153" transform="rotate(-90 -26.618 21.015)" d="M-19.806 113.739h4.084v1.593h-4.084z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect154" transform="rotate(-90 -26.618 21.015)" d="M-14.267 102.803h4.822v1.539h-4.822z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="rect155" transform="rotate(-90 -26.618 21.015)" d="M-14.173 109.037h5.12v2.027h-5.12z"/>
    <path style="opacity:1;fill:maroon;stroke-width:.264583" id="minus" d="M88.983 113.487A10.167 10.415 0 0 1 78.867 123.9a10.167 10.415 0 0 1-10.217-10.31 10.167 10.415 0 0 1 10.014-10.518A10.167 10.415 0 0 1 88.98 113.28" transform="translate(-47.633 -5.604)"/>
    <path style="opacity:1;fill:green;stroke-width:.264583" id="plus" d="M143.12 112.515a10.167 10.415 0 0 1-10.115 10.414 10.167 10.415 0 0 1-10.217-10.31 10.167 10.415 0 0 1 10.014-10.518 10.167 10.415 0 0 1 10.316 10.206" transform="translate(-47.633 -5.604)"/>
    <path style="opacity:1;fill:#000;stroke-width:.264583" id="rect4" transform="translate(-47.633 -5.604)" d="M131.991 105.725h1.734v14.741h-1.734z"/>
    <path style="opacity:1;fill:#000;stroke-width:.264583" id="rect5" transform="translate(-47.633 -5.604)" d="M125.507 111.435h15.165v2.092h-15.165z"/>
    <path style="opacity:1;fill:#000;stroke-width:.264583" id="rect6" transform="translate(-47.633 -5.604)" d="M71.099 111.642h14.582v3.064H71.099z"/>
    <path style="opacity:1;fill:#e6e6e6;fill-opacity:1;stroke-width:.33508" id="text-anchor" transform="rotate(-90 -26.618 21.015)" d="M-134.243 90.459h33.383v30.66h-33.383z"/>
    <text xml:space="preserve" id="value" style="font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:85.3333px;font-family:Monospace;-inkscape-font-specification:Monospace;text-align:center;white-space:pre;display:inline;opacity:1;fill:#000" transform="scale(.26458)"><tspan x="167.815" y="436.066" id="tspan1">7</tspan></text>
    </g>
</svg>

`;

}
