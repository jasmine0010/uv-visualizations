class Circle {
    constructor(grant_id, status, termination_date, project_title, estimated_remaining, max_remaining, division, directorate) {
        this.id = grant_id;
        this.status = status;
        this.term_date = termination_date;
        this.title = project_title;
        this.remaining = estimated_remaining;
        this.max_remaining = max_remaining;
        this.div = division;
        this.dir = directorate;

        this.x = random(width);
        this.y = random(height);
        this.r = map(this.remaining, 0, max_remaining, 5, 80);
    }

    display() {
        ellipse(this.x, this.y, this.r, this.r);
    }
}