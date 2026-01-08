let grants;
let circles = [];
let buttons = [];
let activeKeywords = [];
let activeGrant;
let tooltip;

let legendRight;
let p_size;
let h_size;

let keywordInput;

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
    createCanvas(1200, 600);

    legendRight = width*0.32;
    p_size = height*0.021;
    h_size = height*0.04;

    keywordInput = createInput('');
    keywordInput.size(width*0.13, height*0.027);
    keywordInput.attribute('placeholder', 'Enter custom keyword');
    
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
            g.directorate,
            g.div,
            g.dir
        ))
    }

    buttons = [
        new Button("STEM", "stem", createVector(width*0.02, height*0.12), color(247, 210, 87), color(232, 193, 65), color(212, 172, 42)),
        new Button("Gender", "gender", createVector(width*0.02, height*0.17), color(171, 135, 222), color(149, 107, 209), color(126, 80, 191)),
        new Button("Women", "women", createVector(width*0.02, height*0.22), color(240, 104, 62), color(227, 88, 45), color(214, 72, 28)),
        new Button("Girls", "girls", createVector(width*0.02, height*0.27), color(80, 125, 225), color(53, 100, 204), color(27, 74, 179)),
        new Button("Student", "student", createVector(width*0.02, height*0.32), color(220, 80, 130), color(207, 60, 112), color(186, 39, 91)),
        new Button("Underrepresented", "underrepresented", createVector(width*0.15, height*0.12), color(235, 129, 235), color(219, 99, 219), color(199, 72, 199)),
        new Button("Black", "black", createVector(width*0.15, height*0.17), color(201, 235, 91), color(186, 222, 69), color(172, 212, 44)),
        new Button("Hispanic", "hispanic", createVector(width*0.15, height*0.22), color(102, 92, 247), color(82, 72, 232), color(62, 52, 217)),
        new Button("Native American", "native american", createVector(width*0.15, height*0.27), color(63, 203, 235), color(41, 182, 214), color(28, 167, 199))
    ];

    tooltip = new Tooltip(legendRight - width*0.025, height*0.06);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(5, 5, 25);

    let total = 0;
    let count = 0;
    const hasActive = activeKeywords.length > 0;
    const center = createVector(width/2 + legendRight/2, height/2);
    for (let c of circles) {
        let matches = true;
        for (let k of activeKeywords) {
            if (!c.hasKeyword(k)) matches = false;
        }
        
        if (!hasActive) {
            c.state = "default";
        } else if (matches) {
            c.state = "active";

            total += c.estimated_remaining;
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
    rectMode(CORNER);
    fill(0);
    rect(0, 0, legendRight, height);

    stroke(176, 155, 191);
    strokeWeight(1);
    line(legendRight, 0, legendRight, height);
    line(0, height*0.42, legendRight, height*0.42);
    line(0, height*0.53, legendRight, height*0.53);

    fill(136, 81, 204);
    textAlign(LEFT, CENTER);
    textSize(h_size);
    textStyle(BOLD);
    noStroke();
    text('NSF Grant Terminations', width*0.018, height*0.06);

    keywordInput.position(width*0.15, height*0.315);
    keywordInput.input(redoKeywords);

    for (let b of buttons) {
        b.display();
        b.update();
    }
    
    textSize(p_size);
    fill(176, 155, 191);
    noStroke();
    textAlign(LEFT, BASELINE);
    textStyle(ITALIC);
    text('Hover to view grant details. Click keywords to filter.', width*0.02, height*0.4);
    
    noStroke();
    fill(255);
    textAlign(LEFT, BASELINE);
    textStyle(NORMAL);
    text(`M                           ${count}`, width*0.02, height*0.46);
    text(`E                                                 $${nfc(int(total))}`, width*0.02, height*0.5);
    textStyle(BOLD);
    fill(247, 211, 32);
    text(`Matched Grants:`, width*0.02, height*0.46);
    fill(247, 132, 32);
    text(`Estimated Disrupted Funds:`, width*0.02, height*0.5);

    if (activeGrant != null) {
        textStyle(NORMAL);
        fill(255);
        text(`P                     ${activeGrant.project_title}`, width*0.02, height*0.56, legendRight*0.9, height*0.1);
        text(`O                      ${activeGrant.org_name}`, width*0.02, height*0.68, legendRight*0.9);
        text(`D                             ${activeGrant.estimated_remaining == null ? 'N/A' : '$' + nfc(int(activeGrant.estimated_remaining))}`, width*0.02, height*0.74, legendRight*0.9);
        text(`D              ${activeGrant.division}`, width*0.02, height*0.8, legendRight*0.9);
        text(`D                   ${activeGrant.directorate}`, width*0.02, height*0.86, legendRight*0.9);
        text(`T                              ${activeGrant.termination_date}`, width*0.02, height*0.92, legendRight*0.9);

        textStyle(BOLD);
        fill(235, 129, 235);
        text('Project Title: ', width*0.02, height*0.56, legendRight*0.9, height*0.1);
        fill(63, 203, 235);
        text(`Organization:`, width*0.02, height*0.68, legendRight*0.9, height*0.08);
        fill(150, 185, 225);
        text(`Disrupted Funds:`, width*0.02, height*0.74, legendRight*0.9);
        fill(80, 125, 225);
        text(`Division:`, width*0.02, height*0.8, legendRight*0.9);
        fill(120, 65, 185);
        text(`Directorate:`, width*0.02, height*0.86, legendRight*0.9);
        fill(220, 80, 130);
        text(`Termination Date:`, width*0.02, height*0.92, legendRight*0.9);
    }

    tooltip.displayButton();
    if (tooltip.checkHover()) {
        tooltip.displayTooltip();
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
    for (let b of buttons) {
        if (b.has(mouseX, mouseY)) {
            b.active = !b.active;
        }
    }
    redoKeywords();
}

function redoKeywords() {
    activeKeywords.length = 0;
    for (let b of buttons) {
        if (b.active) {
            activeKeywords.push(b.keyword);
        }
    }
    if (keywordInput.value() != '' && keywordInput.value() != 'Enter custom keyword') {
        activeKeywords.push(keywordInput.value());
    }
}