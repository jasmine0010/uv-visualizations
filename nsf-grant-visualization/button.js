class Button {
    constructor(label, keyword, pos) {
        this.label = label;
        this.keyword = keyword;
        this.pos = pos;
        this.w = 50;
        this.h = 20;

        this.baseCol = color(255);
        this.hoverCol = color(220);
        this.activeCol = color(180);

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
        rect(this.pos.x, this.pos.y, this.w, this.h);

        textAlign(CENTER, CENTER);
        fill(0);
        textSize(10);
        text(this.label, this.pos.x, this.pos.y);
    }

    update() {
        this.hover = this.has(mouseX, mouseY);
    }

    has(x, y) {
        return (
            x > this.pos.x - this.w / 2 &&
            x < this.pos.x + this.w / 2 &&
            y > this.pos.y - this.h / 2 &&
            y < this.pos.y + this.h / 2
        );
    }
}