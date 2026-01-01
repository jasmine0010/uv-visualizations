let grants;
let circles = [];
let buttons = [];
let activeKeywords = [];
let legendRight;

let directorates = {
    "EDU": {label: "STEM Education", color: [80, 125, 225]},
    "MPS": {label: "Mathematical and Physical Sciences", color: [220, 80, 130]},
    "ENG": {label: "Engineering", color: [220, 190, 75]},
    "SBE": {label: "Social, Behavioral and Economic Sciences", color: [120, 65, 185]},
    "BIO": {label: "Biological Sciences", color: [150, 185, 225]},
    "GEO": {label: "Geosciences", color: [30, 60, 160]},
    "TIP": {label: "Technology, Innovation and Partnerships", color: [220, 90, 45]},
    "OD": {label: "Office of the Director", color: [180, 95, 180]},
    "CISE": {label: "Computer and Information Science and Engineering", color: [220, 155, 45]}
};

function preload() {
    grants = loadJSON('nsf_terminations.json');
}

function setup() {
    createCanvas(1000, 600);

    legendRight = width*0.3;
    
    const grantsArr = Object.values(grants);
    const estimated_remaining = grantsArr.map(g => g.estimated_remaining);
    const min_remaining = min(estimated_remaining);
    const max_remaining = max(estimated_remaining);

    for (let g of grantsArr) {
        if (g.reinstated) continue;
        
        circles.push(new Circle(
            directorates[g.dir] ? directorates[g.dir].color : [220, 220, 220],
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
        new Button("Gender", "gender", createVector(width*0.1, height*0.8)),
        new Button("STEM", "stem", createVector(width*0.1, height*0.85))
    ];
}

function draw() {
    background(5, 5, 25);

    let total = 0;
    let count = 0;
    const hasActive = activeKeywords.length > 0;
    const center = createVector(width/2 + legendRight/2, height/2);
    for (let c of circles) {
        let matches = activeKeywords.some(k => c.hasKeyword(k) === true);
        
        if (!hasActive) {
            c.state = "default";
        } else if (matches) {
            c.state = "active";

            total += c.remaining;
            count++;
            
            c.applyForceTarget(center, 0.08, false);
        } else {
            c.state = "inactive";
            
            c.applyForceTarget(center, 0.05, true);
        }

        c.display();
        c.update();
    }
    
    applyRepulsiveForce();
    
    drawLegend(total, count);
}

function drawLegend(total, count) {
    textSize(15);
    
    rectMode(CORNER);
    stroke(255);
    fill(0);
    rect(0, 0, legendRight, height);
    
    noStroke();
    fill(255);
    textAlign(LEFT);
    text(`Matched Grants: ${count}\nEstimated Funds Remaining: ${total}`, width*0.03, 30);
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
            let overlap = a.r + b.r + 3 - f.mag();

            if (overlap > 0) {
                f.mult(overlap*0.015);
                a.applyForce(f);
                b.applyForce(p5.Vector.mult(f, -1));
            }
        }
    }
}

function mousePressed() {
    activeKeywords.length = 0;
    for (let b of buttons) {
        if (b.has(mouseX, mouseY)) {
            b.active = !b.active;
        }
        if (b.active) {
            activeKeywords.push(b.keyword);
        }
    }
}