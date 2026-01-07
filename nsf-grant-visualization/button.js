class Button {
    constructor(label, keyword, pos, baseCol, hoverCol, activeCol) {
        this.label = label;
        this.keyword = keyword;
        this.pos = pos;
        this.s = height*0.017;
        
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
        
        textAlign(LEFT, BASELINE);
        noStroke();
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.s, this.s, 2);

        fill(255);
        textStyle(NORMAL);
        textSize(p_size);
        text(this.label, this.pos.x + this.s + width*0.008, this.pos.y + this.s);
        
        stroke(0);
        strokeWeight(1);
        if (this.active) {
            line(this.pos.x, this.pos.y, this.pos.x + this.s, this.pos.y + this.s);
            line(this.pos.x + this.s, this.pos.y, this.pos.x, this.pos.y + this.s);
        }
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