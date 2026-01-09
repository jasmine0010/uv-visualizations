class Tooltip {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = height*0.05;
    }

    displayButton() {
        noStroke();
        fill(176, 155, 191);
        textStyle(NORMAL);
        textAlign(CENTER, CENTER);
        text('Credits', this.x, this.y);
    }

    displayTooltip() {
        rectMode(CORNER);
        fill(7, 1, 11);
        stroke(176, 155, 191);
        strokeWeight(1);
        rect(this.x, this.y, width*0.21, height*0.2);

        fill(176, 155, 191);
        noStroke();
        textAlign(LEFT, BASELINE);
        text('Coded by Jasmine \'28 for Honors CS Projects taught by Dr. Darren Kessner', this.x + width*0.013, this.y + height*0.03, width*0.19);
        textStyle(ITALIC);
        text('Data provided by Grant Witness, see grant-witness.us/nsf-data.html', this.x + width*0.013, this.y + height*0.12, width*0.19);
    }

    checkHover() {
        return dist(this.x, this.y, mouseX, mouseY) < this.r;
    }
}