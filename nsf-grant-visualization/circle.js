class Circle {
    constructor(grant_id, status, termination_date, project_title, abstract, estimated_remaining, min_remaining, max_remaining, division, directorate) {
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

        this.pos = createVector(random(width), random(height));
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

    display() {
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}