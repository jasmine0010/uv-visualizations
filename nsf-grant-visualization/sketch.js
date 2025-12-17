let grants;
let circles = [];
let buttons = [];
let curKeyword = "";

let directorates = {
    "EDU": {label: "STEM Education", color: [89, 143, 255]},
    "MPS": {label: "Mathematical and Physical Sciences", color: [255, 90, 150]},
    "ENG": {label: "Engineering", color: [255, 220, 85]},
    "SBE": {label: "Social, Behavioral and Economic Sciences", color: [140, 75, 210]},
    "BIO": {label: "Biological Sciences", color: [171, 214, 255]},
    "GEO": {label: "Geosciences", color: [30, 60, 160]},
    "TIP": {label: "Technology, Innovation and Partnerships", color: [255, 105, 50]},
    "OD": {label: "Office of the Director", color: [180, 95, 180]},
    "CISE": {label: "Computer and Information Science and Engineering", color: [255, 180, 50]}
};

function preload() {
    grants = loadJSON('nsf_terminations.json');
}

function setup() {
    createCanvas(1000, 600);
    
    const grantsArr = Object.values(grants);
    const estimated_remaining = grantsArr.map(g => g.estimated_remaining);
    const min_remaining = min(estimated_remaining);
    const max_remaining = max(estimated_remaining);

    for (let g of grantsArr) {
        if (g.reinstated) continue;
        
        circles.push(new Circle(
            directorates[g.dir] ? directorates[g.dir].color : [255, 255, 255],
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

    buttons = [
        new Button("Gender", "gender", createVector(width * 0.1, height * 0.8)),
        new Button("STEM", "stem", createVector(width * 0.1, height * 0.85))
    ];
}

function draw() {
    background(0);
    
    applyRepulsiveForce();

    let activeKeywords = [];
    for (let b of buttons) {
        if (b.active) {
            activeKeywords.push(b.keyword);
        }
    }

    let total = 0;
    let count = 0;
    for (let c of circles) {
        let active = activeKeywords.some(k => c.hasKeyword(k) === true);
        c.display(active);
        c.update();
        
        if (active) {
            total += c.remaining;
            count++;
        }
    }
    
    drawOverview(total, count);
    drawLegend();
}

function drawOverview(total, count) {
    fill(255);
    textSize(18);
    text(`Matched Grants: ${count}\nEstimated Funds Remaining: ${total}`, width/2, 30);
}

function drawLegend() {
    rectMode(CORNER);
    stroke(255);
    fill(0);
    rect(0, 0, width*0.25, height);
    drawButtons();
}

function drawButtons() {
    rectMode(CENTER);
    for (let b of buttons) {
        b.display();
        b.update();
    }
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
                b.applyForce(f.mult(-1));
            }
        }
    }
}

function mousePressed() {
    for (let b of buttons) {
        if (b.has(mouseX, mouseY)) {
            b.active = !b.active;
        }
    }
}