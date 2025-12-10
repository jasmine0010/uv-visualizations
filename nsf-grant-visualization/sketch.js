let search_term = "";
let grants;
let circles = [];

function preload() {
    grants = loadJSON('nsf_terminations.json');
}

function setup() {
    createCanvas(1000, 600);

    rectMode(CENTER);
    textAlign(CENTER);
    
    const grantsArray = Object.values(grants);
    const estimated_remaining = grantsArray.map(g => g.estimated_remaining);
    const min_remaining = min(estimated_remaining);
    const max_remaining = max(estimated_remaining);

    for (let g of grantsArray) {
        circles.push(new Circle(
            g.grant_id,
            g.status,
            g.termination_date,
            g.project_title,
            g.abstract,
            g.estimated_remaining,
            min_remaining,
            max_remaining,
            g.division,
            g.directorate
        ))
    }
}

function draw() {
    background(0);
    fill(255);
    applyRepulsiveForce();
    for (let c of circles) {
        c.update();
        if (search_term != "") {
            if (c.abstract.includes(search_term)) {
                c.display();
            }
        } else {
            c.display();
        }
    }
    
    stroke(0);
    rect(width*0.9, height*0.9, 50, 50);
    text("button", width*0.9, height*0.9);
}

function applyRepulsiveForce() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let a = circles[i];
            let b = circles[j];

            let f = p5.Vector.sub(a.pos, b.pos);
            
            if (a.r + b.r > f.mag()) {
                f.setMag(0.2);
                a.applyForce(f);
                b.applyForce(f.copy().mult(-1));
            }
        }
    }
}

function mousePressed() {
    if (width*0.9 - 25 < mouseX && mouseX < width*0.9 + 25 &&
        height*0.9 - 25 < mouseY && mouseY < height*0.9 + 25) {
        if (search_term === "gender") {
            search_term = "";
        } else {
            search_term = "gender";
        }
    }
}