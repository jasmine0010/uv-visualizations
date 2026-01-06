let grants;
let circles = [];
let buttons = [];
let activeKeywords = [];
let activeGrant;
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

    legendRight = width*0.32;
    
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
            g.org_name,
            g.estimated_remaining,
            min_remaining,
            max_remaining,
            g.division,
            g.directorate
        ))
    }

    buttons = [
        new Button("STEM", "stem", createVector(width*0.02, height*0.1), color(247, 210, 87), color(232, 193, 65), color(212, 172, 42)),
        new Button("Gender", "gender", createVector(width*0.02, height*0.15), color(171, 135, 222), color(149, 107, 209), color(126, 80, 191)),
        new Button("Girls", "girls", createVector(width*0.02, height*0.2), color(240, 104, 62), color(227, 88, 45), color(214, 72, 28)),
        new Button("High school", "high school", createVector(width*0.02, height*0.25), color(63, 203, 235), color(41, 182, 214), color(28, 167, 199)),
        new Button("Underrepresented", "underrepresented", createVector(width*0.02, height*0.3), color(235, 129, 235), color(219, 99, 219), color(199, 72, 199)),
        new Button("Black", "black", createVector(width*0.02, height*0.35), color(201, 235, 91), color(186, 222, 69), color(172, 212, 44)),
        new Button("Latino", "latino", createVector(width*0.02, height*0.4), color(102, 92, 247), color(82, 72, 232), color(62, 52, 217))
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
    strokeWeight(1);
    fill(0);
    rect(0, 0, legendRight, height);
    line(0, height*0.45, legendRight, height*0.45);
    line(0, height*0.56, legendRight, height*0.56);

    for (let b of buttons) {
        b.display();
        b.update();
    }
    
    noStroke();
    fill(255);
    textAlign(LEFT);
    textSize(15);
    text(`Matched Grants: ${count}\nEstimated Funds Remaining: ${int(total)}`, width*0.02, height*0.5);

    if (activeGrant != null) {

        text(`Project Title: ${activeGrant.project_title}`, width*0.02, height*0.59, legendRight*0.9, height*0.1);
        text(`Organization: ${activeGrant.org_name}`, width*0.02, height*0.7, legendRight*0.9, height*0.08);
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