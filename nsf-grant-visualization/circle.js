class Circle {
    constructor(col, grant_id, status, termination_date, project_title, abstract, org_name, estimated_remaining, min_remaining, max_remaining, division, directorate) {
        this.col = col;

        this.id = grant_id;
        this.status = status;
        this.termination_date = termination_date;
        this.project_title = project_title;
        this.abstract = abstract;
        this.org_name = org_name;
        this.estimated_remaining = estimated_remaining;
        this.min_remaining = min_remaining;
        this.max_remaining = max_remaining;
        this.division = division;
        this.directorate = directorate;

        this.pos = createVector(random(legendRight + width*0.05, width*0.95), random(height*0.05, height*0.95));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.r = map(this.estimated_remaining, min_remaining, max_remaining, 5, 60);
        
        this.state = "default";
        this.original = createVector(this.pos.x, this.pos.y);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    applyForceTarget(targ, mag, repel) {
        let f = p5.Vector.sub(targ, this.pos);
        f.setMag(mag);
        this.applyForce(repel ? p5.Vector.mult(f, -1) : f);
    }

    applyForceCenter() {
        let targ = createVector(width/2 + legendRight/2 + random(-40, 40), height/2 + random(-40, 40));
        let f = p5.Vector.sub(targ, this.pos);
        f.setMag(0.08);
        this.applyForce(f);
    }

    applyRepulsiveForceCenter() {
        let targ = createVector(width/2 + legendRight/2 + random(-40, 40), height/2 + random(-40, 40));
        let f = p5.Vector.sub(this.pos, targ);
        f.setMag(0.05);
        this.applyForce(f);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.mult(0.92);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.pos.x = constrain(this.pos.x, legendRight + this.r, width - this.r);
        this.pos.y = constrain(this.pos.y, this.r, height - this.r);

        if (this.checkHover()) {
            activeGrant = this;
        }
    }

    display() {
        noStroke();
        fill(this.col[0], this.col[1], this.col[2], this.state !== "inactive" ? 255 : 100);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
    hasKeyword(keyword) {
        return this.abstract.toLowerCase().includes(keyword);
    }

    checkHover() {
        let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        return d <= this.r;
    }
}