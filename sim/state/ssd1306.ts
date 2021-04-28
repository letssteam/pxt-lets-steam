declare const enum PixelColor {
    Black = 0,
    White = 1
}

namespace pxsim.screen{

    const BLACK_COLOR_SVG = "#00435E";
    const WHITE_COLOR_SVG = "#FFFFFF";

    export function printString(str: string, color: PixelColor, x: number, y: number): void{

        let state = ssd1306State();
        let elem = new SSD1306DrawElement();

        elem.x = x;
        elem.y = y + 8; // On SSD1306 ref point is on top left corner (SVG is on bottom left corner)
        elem.svgObject = svg.elt("text", { "fill" : getSVGColor(state, color) }) as SVGRectElement;
        elem.svgObject.textContent = str;

        state.drawingList.push(elem);

        runtime.queueDisplayUpdate();
    }

    export function fillRect(x: number,y: number, width: number, height: number, color: PixelColor): void {
        let state = ssd1306State();
        let elem = new SSD1306DrawElement();

        elem.width = width;
        elem.height = height;
        elem.x = x;
        elem.y = y;
        elem.svgObject = svg.elt("rect", { "fill" : getSVGColor(state, color) }) as SVGRectElement;

        state.drawingList.push(elem);

        runtime.queueDisplayUpdate();
    }

    export function fillScreen(color: PixelColor): void{
        let state = ssd1306State();
        state.drawingList = [];
        fillRect(0, 0, state.getWidth(), state.getHeight(), color);
    }

    export function clearScreen(): void{
        let state = ssd1306State();

        state.isInvert = false;
        fillScreen(PixelColor.Black);
    }

    export function setPixel(x: number, y: number, color: PixelColor): void{        
        fillRect(x, y, 1, 1, color);
    }

    export function invertScreen(invert: boolean): void{

        let state = ssd1306State();

        if( state.isInvert != invert ){
            
            state.drawingList.forEach( (elem : SSD1306DrawElement) => {
                let color = elem.svgObject.getAttribute("fill");

                if( color == BLACK_COLOR_SVG ) { color = WHITE_COLOR_SVG; }
                else                           { color = BLACK_COLOR_SVG; }

                elem.svgObject.setAttribute("fill", color);
            });

        }

        state.isInvert = invert;
    }

    function getSVGColor( state : SSD1306State, color : PixelColor) : string {

        if( color == PixelColor.Black ){
            return state.isInvert ? WHITE_COLOR_SVG : BLACK_COLOR_SVG;
        }
        else{
            return state.isInvert ? BLACK_COLOR_SVG : WHITE_COLOR_SVG;
        }

    }
}
