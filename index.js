let padding = {top: 0, right: 0, bottom: 0, left: 0},
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();

let data = [];

let isAllChecked = false;
let isPurpleChecked = false;
let isWorkflowChecked = false;

let teamMemberList = [
    {name: 'Thierry', role: 'Boss', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Céline', role: 'Developer', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Claire M', role: 'Developer', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Frédéric', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Pierre-Olivier', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Hamza', role: 'Developer', avatar: 'assets/img/avatar-hamza.jpg'},
    {name: 'Mehdi L', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Yassine', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Othmane', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Jacques', role: 'Developer', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Nada', role: 'QA', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Fatima', role: 'QA', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Abdouraman', role: 'QA', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Mehdi H', role: 'QA', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Ahmed', role: 'QA', avatar: 'assets/img/avatar-male.svg'},
    {name: 'Claire P', role: 'PO', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Pauline', role: 'PO', avatar: 'assets/img/avatar-female.svg'},
    {name: 'Kai-Lin', role: 'PO', avatar: 'assets/img/avatar-female.svg'}
]

let svg = d3.select('#chart').append("svg")
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

let container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");

let vis = container.append("g");

let pie = d3.layout.pie().sort(null).value(function (d) {
    return 1;
});

let arc = d3.svg.arc().outerRadius(r);

function renderChart() {
    vis.selectAll("*").remove();

    let arcs = vis.selectAll("g.slice")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "slice");

    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

    arcs.append("text").attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
    }).attr("text-anchor", "end")
        .text(function (d, i) {
            return data[i].label;
        });

    container.on("click", spin);
}

function updateData() {
    let selectedOptions = [];
    document.querySelectorAll('#options input[type=checkbox]:checked').forEach(checkbox => {
        selectedOptions.push({"label": checkbox.value, "value": parseInt(checkbox.value)});
    });
    data = selectedOptions;
    oldpick = [];
    renderChart();
}

function selectAll() {
    let selectedOptions = [];

    let checkboxList = document.querySelectorAll('#options input[type=checkbox]')
    let checkboxListLength = checkboxList.length;
    let index = 0;
    checkboxList.forEach(checkbox => {
        if (this.isAllChecked)
            checkbox.checked = false;
        else {
            checkbox.checked = true;
            selectedOptions.push({"label": checkbox.value, "value": parseInt(checkbox.value)});
        }
        if (index === checkboxListLength - 1)
            this.isAllChecked = !this.isAllChecked;

        index ++;
    });
    data = selectedOptions;
    oldpick = [];
    renderChart();
}

function selectPurpleTeam() {
    let selectedOptions = [];

    let checkboxList = document.querySelectorAll('#options input[type=checkbox]')
    let checkboxListLength = document.querySelectorAll('#options input[type=checkbox]').length;
    let index = 0;
    checkboxList.forEach(checkbox => {
        if (checkbox.className.includes("purple-team")) {
            if (this.isPurpleChecked) {
                checkbox.checked = false
            } else {
                checkbox.checked = true;
                selectedOptions.push({"label": checkbox.value, "value": parseInt(checkbox.value)});
            }
        } else {
            checkbox.checked = false
        }

        if (index === checkboxListLength - 1) {
            this.isPurpleChecked = !this.isPurpleChecked;
        }

        index ++;
    });
    data = selectedOptions;
    oldpick = [];
    renderChart();
}

function selectWorkflowTeam() {
    let selectedOptions = [];

    let checkboxList = document.querySelectorAll('#options input[type=checkbox]')
    let checkboxListLength = document.querySelectorAll('#options input[type=checkbox]').length;
    let index = 0;
    checkboxList.forEach(checkbox => {
        if (checkbox.className.includes("workflow-team")) {
            if (this.isWorkflowChecked) {
                checkbox.checked = false
            } else {
                checkbox.checked = true;
                selectedOptions.push({"label": checkbox.value, "value": parseInt(checkbox.value)});
            }
        } else {
            checkbox.checked = false
        }

        if (index === checkboxListLength - 1) {
            this.isWorkflowChecked = !this.isWorkflowChecked;
        }

        index ++;
    });
    data = selectedOptions;
    oldpick = [];
    renderChart();
}

document.querySelectorAll('#options input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', updateData);
});

function spin(d) {
    // Prevent spin if data is empty
    if (!data || data.length === 0) {
        var modal = document.getElementById("modal");
        var span = document.getElementsByClassName("close")[0];
        let resultDiv = document.getElementById('result');
        span.onclick = function() {
            resultDiv.style.display = 'none';
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                resultDiv.style.display = 'none';
                modal.style.display = "none";
            }
        }

        modal.style.display = "flex";
        return;
    }

    container.on("click", null);

    let ps = 360 / data.length,
        rng = Math.floor(Math.random() * 1440 + 360);

    rotation = Math.round(rng / ps) * ps;
    picked = Math.round(data.length - rotation % 360 / ps);
    picked = picked >= data.length ? picked % data.length : picked;

    oldpick.push(picked);

    rotation += 90 - Math.round(ps / 2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function () {
            let selectedOption = data[picked];
            let selectedLabel = selectedOption.label;

            data = data.filter(option => option !== selectedOption);
            let resultDiv = document.getElementById('result');
            resultDiv.style.display = 'flex';

            let selectedCheckbox = document.querySelector(`#options input[type=checkbox][value="${selectedLabel}"]`);
            if (selectedCheckbox) {
                selectedCheckbox.checked = false;
            }

            let member = teamMemberList.find(member => member.name === selectedLabel);
            document.getElementById("avatar").src = member.avatar;
            d3.select("#result div h1").text(selectedLabel);
            d3.select("#result div h2").text(member.role);
            renderChart();

            let audio1 = document.getElementById('myAudio1');
            audio1.play();

            let audio2 = document.getElementById('myAudio2');
            audio2.play();

            confetti({
                particleCount: 300,
                spread: 180,
                origin: {y: 0.6}
            })

            oldrotation = rotation;
            container.on("click", spin);
        });
}

svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + (h / 2 + padding.top) + ")")
    .append("path")
    .attr("d", "M-" + r * .15 + ",0L0," + r * .05 + "L0,-" + r * .05 + "Z")
    .style({"fill": "red"});

container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 70).style({"fill": "white", "cursor": "pointer", "background": "#CCEAF1"});

container.append("text")
    .attr("x", 0)
    .attr("y", 8)
    .attr("text-anchor", "middle")
    .text("Lancer")
    .style({"font-weight": "bold", "font-size": "22px"});

function rotTween(to) {
    let i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}

renderChart();