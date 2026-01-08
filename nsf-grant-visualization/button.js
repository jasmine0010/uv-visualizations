class Button {
    constructor(label, keyword, pos, baseCol, hoverCol, activeCol) {
        this.label = label;
        this.keyword = keyword;
        this.pos = pos;
        this.s = height*0.017;

        this.baseCol = color(255);
        this.hoverCol = color(235);
        this.activeCol = color(235);

        this.baseCol = baseCol;
        this.hoverCol = hoverCol;
        this.activeCol = activeCol;

        this.hover = false;
        this.active = false;
    }

    display() {
        if (this.hover) {
            fill(this.hoverCol);
        } else if (this.active) {
            fill(this.activeCol);
        } else {
            fill(this.baseCol);
        }

        noStroke();
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.s, this.s, 2);
        
        textSize(p_size);
        fill(0);
        textStyle(NORMAL);

        if (this.active) {
            textAlign(LEFT, TOP);
            text('✓', this.pos.x, this.pos.y);
        }

        fill(255);
        textAlign(LEFT, BASELINE);
        text(this.label, this.pos.x + this.s + width*0.008, this.pos.y + this.s);
        
        stroke(0);
        strokeWeight(1);
    }

    update() {
        this.hover = this.has(mouseX, mouseY);
    }

    has(x, y) {
        return (
            x > this.pos.x &&
            x < this.pos.x + this.s &&
            y > this.pos.y &&
            y < this.pos.y + this.s
        );
    }
}