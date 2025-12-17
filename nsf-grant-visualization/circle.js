class Circle {
    constructor(col, grant_id, status, termination_date, project_title, abstract, estimated_remaining, min_remaining, max_remaining, division, directorate) {
        this.col = col;

        this.id = grant_id;
        this.status = status;
        this.term_date = termination_date;
        this.title = project_title;
        this.abstract = abstract;
        this.remaining = estimated_remaining;
        this.min_remaining = min_remaining;
        this.max_remaining = max_remaining;
        this.div = division;
        this.dir = directorate;

        this.pos = createVector(random(width * 0.35, width * 0.9), random(height * 0.15, height * 0.85));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.r = map(this.remaining, min_remaining, max_remaining, 5, 60);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(0.95);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    display(isActive) {
        if (isActive) {
            stroke(255);
            fill(227, 153, 240);
        } else {
            noStroke();
            fill(this.col[0], this.col[1], this.col[2]);
        }
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
    hasKeyword(keyword) {
        return this.abstract.toLowerCase().includes(keyword);
    }
}