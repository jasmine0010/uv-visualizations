let grants;
let circles = [];

function preload() {
    grants = loadJSON('nsf_terminations.json');
}

function setup() {
    createCanvas(1000, 600);
    
    const grantsArray = Object.values(grants);
    const estimated_remaining = grantsArray.map(g => g.estimated_remaining);
    const max_remaining = max(estimated_remaining);

    for (let g of grantsArray) {
        circles.push(new Circle(
            g.grant_id,
            g.status,
            g.termination_date,
            g.project_title,
            g.estimated_remaining,
            max_remaining,
            g.division,
            g.directorate
        ))
    }
}

function draw() {
    fill(255);
    textSize(30);
    text('hi', width/2, height/2);

    for (let c of circles) {
        c.display();
    }
}