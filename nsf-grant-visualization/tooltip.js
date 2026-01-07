class Tooltip {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = height*0.025;
    }

    displayButton() {
        stroke(176, 155, 191);
        strokeWeight(1);
        noFill();
        ellipse(this.x, this.y, this.r, this.r);
        noStroke();
        fill(176, 155, 191);
        textStyle(NORMAL);
        textAlign(CENTER, CENTER);
        text('i', this.x, this.y);
    }

    displayTooltip() {
        rectMode(CORNER);
        fill(7, 1, 11);
        stroke(176, 155, 191);
        strokeWeight(1);
        rect(this.x, this.y, width*0.2, height*0.23);

        fill(176, 155, 191);
        noStroke();
        textAlign(LEFT, BASELINE);
        text('Honors Computer Science Projects', this.x + width*0.013, this.y + height*0.05);
        text('Dr. Kessner', this.x + width*0.013, this.y + height*0.08);
        text('Mr. Vega', this.x + width*0.013, this.y + height*0.11);
        textStyle(ITALIC);
        text('Data provided by Grant Witness, see grant-witness.us/nsf-data.html', this.x + width*0.013, this.y + height*0.15, width*0.19);
    }

    checkHover() {
        return dist(this.x, this.y, mouseX, mouseY) < this.r;
    }
}