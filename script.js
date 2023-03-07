const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");
const finalValue = document.getElementById("final-value");
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.style.visibility = 'hidden';
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: '70% discount on Coral Moon Beach Resort' },
  { minDegree: 31, maxDegree: 60, value: '60% discount on Coral Moon Beach Resort' },
  { minDegree: 61, maxDegree: 90, value: '50% discount on Coral Moon Beach Resort' },
  { minDegree: 91, maxDegree: 120, value: 'the stylish TripSilo T-Shirt' },
  { minDegree: 121, maxDegree: 150, value: '50% discount on The Water Castle' },
  { minDegree: 151, maxDegree: 180, value: 'the stylish TripSilo T-Shirt' },
  { minDegree: 181, maxDegree: 210, value: '70% discount on Nilachol Eco Resort' },
  { minDegree: 211, maxDegree: 240, value: '60% discount on Nilachol Eco Resort' },
  { minDegree: 241, maxDegree: 270, value: '50% discount on Nilachol Eco Resort' },
  { minDegree: 271, maxDegree: 300, value: '70% discount on SKD Amar Bari Resort' },
  { minDegree: 301, maxDegree: 330, value: '60% discount on SKD Amar Bari Resort' },
  { minDegree: 331, maxDegree: 360, value: '50% discount on SKD Amar Bari Resort' },
  // { minDegree: 341, maxDegree: 360, value: '50% discount on SKD Amar Bari Resort' },
];
//Size of each piece
const data = [8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33, 8.33];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ['CM-50%', 'CM-60%', 'CM-70%', 'SKD-50%', 'SKD-60%', 'SKD-70%', 'NR-50%', 'NR-60%', 'NR-70%', 'T-Shirt', 'WC-50%', 'T-Shirt'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 12 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Please click the submit button</p>`;
      result.innerHTML = `<p>Congratulations!!<br> You get  ${i.value}</p>`;
      document.querySelector('#winPrize').value = i.value;
      btnSubmit.style.visibility = 'visible';
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {

if(document.getElementById("fullName").value == "" || document.getElementById("emailAddress").value == "" || document.getElementById("mobileNumber").value == ""){
  Swal.fire({
    position: 'center',
    icon: 'error',
    text: 'Please fill the information form',
    color: 'red',
    font: '1.5em',
    showConfirmButton: false,
    timer: 2000
  })
}
else{
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);

}

});

// Ajax Script
$(document).on('submit','#userForm',function(e){
  e.preventDefault();
  
  $.ajax({
  method:"POST",
  url: "php-script.php",
  data:$(this).serialize(),
  success: function(data){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: data,
      color: '#50C878',
      showConfirmButton: false,
      timer: 2000
    })
    $('#final-value').html('Click On The Spin Button To Start');
    $('#userForm').find('input').val('')
    btnSubmit.style.visibility = 'hidden';
    result.innerHTML = `<p></p>`;
}});
});
